import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X } from 'lucide-react';
import worldMapGlobe from '@/assets/world-map-globe.png';

/**
 * SphereImageGrid - Interactive 3D Image Sphere Component
 *
 * A React TypeScript component that displays images arranged in a 3D sphere layout.
 * Images are distributed using Fibonacci sphere distribution for optimal coverage.
 * Supports drag-to-rotate, momentum physics, auto-rotation, and modal image viewing.
 *
 * Features:
 * - 3D sphere layout with Fibonacci distribution for even image placement
 * - Smooth drag-to-rotate interaction with momentum physics
 * - Auto-rotation capability with configurable speed
 * - Dynamic scaling based on position and visibility
 * - Collision detection to prevent image overlap
 * - Modal view for enlarged image display
 * - Touch support for mobile devices
 * - Customizable appearance and behavior
 * - Performance optimized with proper z-indexing and visibility culling
 *
 * Usage:
 * ```tsx
 * <SphereImageGrid
 *   images={imageArray}
 *   containerSize={600}
 *   sphereRadius={200}
 *   autoRotate={true}
 *   dragSensitivity={0.8}
 * />
 * ```
 */

// ==========================================
// TYPES & INTERFACES
// ==========================================

export interface Position3D {
  x: number;
  y: number;
  z: number;
}

export interface SphericalPosition {
  theta: number;  // Azimuth angle in degrees
  phi: number;    // Polar angle in degrees
  radius: number; // Distance from center
}

export interface WorldPosition extends Position3D {
  scale: number;
  zIndex: number;
  isVisible: boolean;
  fadeOpacity: number;
  originalIndex: number;
}

export interface ImageData {
  id: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

export interface SphereImageGridProps {
  images?: ImageData[];
  containerSize?: number;
  sphereRadius?: number;
  dragSensitivity?: number;
  momentumDecay?: number;
  maxRotationSpeed?: number;
  baseImageScale?: number;
  hoverScale?: number;
  perspective?: number;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  className?: string;
}

interface RotationState {
  x: number;
  y: number;
  z: number;
}

interface VelocityState {
  x: number;
  y: number;
}

interface MousePosition {
  x: number;
  y: number;
}

// ==========================================
// CONSTANTS & CONFIGURATION
// ==========================================

const SPHERE_MATH = {
  degreesToRadians: (degrees: number): number => degrees * (Math.PI / 180),
  radiansToDegrees: (radians: number): number => radians * (180 / Math.PI),

  sphericalToCartesian: (radius: number, theta: number, phi: number): Position3D => ({
    x: radius * Math.sin(phi) * Math.cos(theta),
    y: radius * Math.cos(phi),
    z: radius * Math.sin(phi) * Math.sin(theta)
  }),

  calculateDistance: (pos: Position3D, center: Position3D = { x: 0, y: 0, z: 0 }): number => {
    const dx = pos.x - center.x;
    const dy = pos.y - center.y;
    const dz = pos.z - center.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  },

  normalizeAngle: (angle: number): number => {
    while (angle > 180) angle -= 360;
    while (angle < -180) angle += 360;
    return angle;
  }
};

// ==========================================
// MAIN COMPONENT
// ==========================================

const SphereImageGrid: React.FC<SphereImageGridProps> = ({
  images = [],
  containerSize = 400,
  sphereRadius = 200,
  dragSensitivity = 0.5,
  momentumDecay = 0.95,
  maxRotationSpeed = 5,
  baseImageScale = 0.12,
  hoverScale = 1.2,
  perspective = 1000,
  autoRotate = false,
  autoRotateSpeed = 0.3,
  className = ''
}) => {

  // ==========================================
  // STATE & REFS
  // ==========================================

  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [rotation, setRotation] = useState<RotationState>({ x: 15, y: 15, z: 0 });
  const [velocity, setVelocity] = useState<VelocityState>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [imagePositions, setImagePositions] = useState<SphericalPosition[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const lastMousePos = useRef<MousePosition>({ x: 0, y: 0 });
  const animationFrame = useRef<number | null>(null);

  // ==========================================
  // COMPUTED VALUES
  // ==========================================

  const actualSphereRadius = sphereRadius || containerSize * 0.5;
  const baseImageSize = containerSize * baseImageScale;

  // ==========================================
  // UTILITY FUNCTIONS
  // ==========================================

  const generateSpherePositions = useCallback((): SphericalPosition[] => {
    const positions: SphericalPosition[] = [];
    const imageCount = images.length;

    // Use Fibonacci sphere distribution for even coverage
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const angleIncrement = 2 * Math.PI / goldenRatio;

    for (let i = 0; i < imageCount; i++) {
      // Fibonacci sphere distribution
      const t = i / imageCount;
      const inclination = Math.acos(1 - 2 * t);
      const azimuth = angleIncrement * i;

      // Convert to degrees and focus on front hemisphere
      let phi = inclination * (180 / Math.PI);
      let theta = (azimuth * (180 / Math.PI)) % 360;

      // Better pole coverage - reach poles but avoid extreme mathematical issues
      const poleBonus = Math.pow(Math.abs(phi - 90) / 90, 0.6) * 35; // Moderate boost toward poles
      if (phi < 90) {
        phi = Math.max(5, phi - poleBonus); // Reach closer to top pole (15° minimum)
      } else {
        phi = Math.min(175, phi + poleBonus); // Reach closer to bottom pole (165° maximum)
      }

      // Map to fuller vertical range - covers poles but avoids extremes
      phi = 15 + (phi / 180) * 150; // Map to 15-165 degrees for pole coverage with stability

      // Add slight randomization to prevent perfect patterns
      const randomOffset = (Math.random() - 0.5) * 20;
      theta = (theta + randomOffset) % 360;
      phi = Math.max(0, Math.min(180, phi + (Math.random() - 0.5) * 10));

      positions.push({
        theta: theta,
        phi: phi,
        radius: actualSphereRadius
      });
    }

    return positions;
  }, [images.length, actualSphereRadius]);

  const calculateWorldPositions = useCallback((): WorldPosition[] => {
    const positions = imagePositions.map((pos, index) => {
      // Apply rotation using proper 3D rotation matrices
      const thetaRad = SPHERE_MATH.degreesToRadians(pos.theta);
      const phiRad = SPHERE_MATH.degreesToRadians(pos.phi);
      const rotXRad = SPHERE_MATH.degreesToRadians(rotation.x);
      const rotYRad = SPHERE_MATH.degreesToRadians(rotation.y);

      // Initial position on sphere
      let x = pos.radius * Math.sin(phiRad) * Math.cos(thetaRad);
      let y = pos.radius * Math.cos(phiRad);
      let z = pos.radius * Math.sin(phiRad) * Math.sin(thetaRad);

      // Apply Y-axis rotation (horizontal drag)
      const x1 = x * Math.cos(rotYRad) + z * Math.sin(rotYRad);
      const z1 = -x * Math.sin(rotYRad) + z * Math.cos(rotYRad);
      x = x1;
      z = z1;

      // Apply X-axis rotation (vertical drag)
      const y2 = y * Math.cos(rotXRad) - z * Math.sin(rotXRad);
      const z2 = y * Math.sin(rotXRad) + z * Math.cos(rotXRad);
      y = y2;
      z = z2;

      const worldPos: Position3D = { x, y, z };

      // Calculate visibility with smooth fade zones
      const fadeZoneStart = -10;  // Start fading out
      const fadeZoneEnd = -30;    // Completely hidden
      const isVisible = worldPos.z > fadeZoneEnd;

      // Calculate fade opacity based on Z position
      let fadeOpacity = 1;
      if (worldPos.z <= fadeZoneStart) {
        // Linear fade from 1 to 0 as Z goes from fadeZoneStart to fadeZoneEnd
        fadeOpacity = Math.max(0, (worldPos.z - fadeZoneEnd) / (fadeZoneStart - fadeZoneEnd));
      }

      // Check if this image originated from a pole position
      const isPoleImage = pos.phi < 30 || pos.phi > 150; // Images from extreme angles

      // Calculate distance from center for scaling (in 2D screen space)
      const distanceFromCenter = Math.sqrt(worldPos.x * worldPos.x + worldPos.y * worldPos.y);
      const maxDistance = actualSphereRadius;
      const distanceRatio = Math.min(distanceFromCenter / maxDistance, 1);

      // Scale based on distance from center - be more forgiving for pole images
      const distancePenalty = isPoleImage ? 0.4 : 0.7; // Less penalty for pole images
      const centerScale = Math.max(0.3, 1 - distanceRatio * distancePenalty);

      // Also consider Z-depth for additional scaling
      const depthScale = (worldPos.z + actualSphereRadius) / (2 * actualSphereRadius);
      const scale = centerScale * Math.max(0.5, 0.8 + depthScale * 0.3);

      return {
        ...worldPos,
        scale,
        zIndex: Math.round(1000 + worldPos.z),
        isVisible,
        fadeOpacity,
        originalIndex: index
      };
    });

    // Apply collision detection to prevent overlaps
    const adjustedPositions = [...positions];

    for (let i = 0; i < adjustedPositions.length; i++) {
      const pos = adjustedPositions[i];
      if (!pos.isVisible) continue;

      let adjustedScale = pos.scale;
      const imageSize = baseImageSize * adjustedScale;

      // Check for overlaps with other visible images
      for (let j = 0; j < adjustedPositions.length; j++) {
        if (i === j) continue;

        const other = adjustedPositions[j];
        if (!other.isVisible) continue;

        const otherSize = baseImageSize * other.scale;

        // Calculate 2D distance between images on screen
        const dx = pos.x - other.x;
        const dy = pos.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Minimum distance to prevent overlap (with more generous padding)
        const minDistance = (imageSize + otherSize) / 2 + 25;

        if (distance < minDistance && distance > 0) {
          // More aggressive scale reduction to prevent overlap
          const overlap = minDistance - distance;
          const reductionFactor = Math.max(0.4, 1 - (overlap / minDistance) * 0.6);
          adjustedScale = Math.min(adjustedScale, adjustedScale * reductionFactor);
        }
      }

      adjustedPositions[i] = {
        ...pos,
        scale: Math.max(0.25, adjustedScale) // Ensure minimum scale
      };
    }

    return adjustedPositions;
  }, [imagePositions, rotation, actualSphereRadius, baseImageSize]);

  const clampRotationSpeed = useCallback((speed: number): number => {
    return Math.max(-maxRotationSpeed, Math.min(maxRotationSpeed, speed));
  }, [maxRotationSpeed]);

  // ==========================================
  // PHYSICS & MOMENTUM
  // ==========================================

  const updateMomentum = useCallback(() => {
    if (isDragging) return;

    setVelocity(prev => {
      const newVelocity = {
        x: prev.x * momentumDecay,
        y: prev.y * momentumDecay
      };

      // Stop animation if velocity is too low and auto-rotate is off
      if (!autoRotate && Math.abs(newVelocity.x) < 0.01 && Math.abs(newVelocity.y) < 0.01) {
        return { x: 0, y: 0 };
      }

      return newVelocity;
    });

    setRotation(prev => {
      let newY = prev.y;

      // Add auto-rotation to Y axis (horizontal rotation)
      if (autoRotate) {
        newY += autoRotateSpeed;
      }

      // Add momentum-based rotation
      newY += clampRotationSpeed(velocity.y);

      return {
        x: SPHERE_MATH.normalizeAngle(prev.x + clampRotationSpeed(velocity.x)),
        y: SPHERE_MATH.normalizeAngle(newY),
        z: prev.z
      };
    });
  }, [isDragging, momentumDecay, velocity, clampRotationSpeed, autoRotate, autoRotateSpeed]);

  // ==========================================
  // EVENT HANDLERS
  // ==========================================

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setVelocity({ x: 0, y: 0 });
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - lastMousePos.current.x;
    const deltaY = e.clientY - lastMousePos.current.y;

    const rotationDelta = {
      x: -deltaY * dragSensitivity,
      y: deltaX * dragSensitivity
    };

    setRotation(prev => ({
      x: SPHERE_MATH.normalizeAngle(prev.x + clampRotationSpeed(rotationDelta.x)),
      y: SPHERE_MATH.normalizeAngle(prev.y + clampRotationSpeed(rotationDelta.y)),
      z: prev.z
    }));

    // Update velocity for momentum
    setVelocity({
      x: clampRotationSpeed(rotationDelta.x),
      y: clampRotationSpeed(rotationDelta.y)
    });

    lastMousePos.current = { x: e.clientX, y: e.clientY };
  }, [isDragging, dragSensitivity, clampRotationSpeed]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    setIsDragging(true);
    setVelocity({ x: 0, y: 0 });
    lastMousePos.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();

    const touch = e.touches[0];
    const deltaX = touch.clientX - lastMousePos.current.x;
    const deltaY = touch.clientY - lastMousePos.current.y;

    const rotationDelta = {
      x: -deltaY * dragSensitivity,
      y: deltaX * dragSensitivity
    };

    setRotation(prev => ({
      x: SPHERE_MATH.normalizeAngle(prev.x + clampRotationSpeed(rotationDelta.x)),
      y: SPHERE_MATH.normalizeAngle(prev.y + clampRotationSpeed(rotationDelta.y)),
      z: prev.z
    }));

    setVelocity({
      x: clampRotationSpeed(rotationDelta.x),
      y: clampRotationSpeed(rotationDelta.y)
    });

    lastMousePos.current = { x: touch.clientX, y: touch.clientY };
  }, [isDragging, dragSensitivity, clampRotationSpeed]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // ==========================================
  // EFFECTS & LIFECYCLE
  // ==========================================

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setImagePositions(generateSpherePositions());
  }, [generateSpherePositions]);

  useEffect(() => {
    const animate = () => {
      updateMomentum();
      animationFrame.current = requestAnimationFrame(animate);
    };

    if (isMounted) {
      animationFrame.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [isMounted, updateMomentum]);

  useEffect(() => {
    if (!isMounted) return;

    const container = containerRef.current;
    if (!container) return;

    // Mouse events
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    // Touch events
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isMounted, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  // ==========================================
  // RENDER HELPERS
  // ==========================================

  // Calculate world positions once per render
  const worldPositions = calculateWorldPositions();

  // Calculate connections between nearby nodes - creating a network
  const calculateConnections = useCallback(() => {
    const connections: Array<{ from: number; to: number; distance: number }> = [];
    const maxConnectionDistance = actualSphereRadius * 0.7; // Reduced for cleaner look
    const maxConnectionsPerNode = 1; // Minimal connections for clean network
    
    for (let i = 0; i < worldPositions.length; i++) {
      const pos1 = worldPositions[i];
      if (!pos1.isVisible) continue;
      
      let nodeConnections = 0;
      
      for (let j = i + 1; j < worldPositions.length; j++) {
        if (nodeConnections >= maxConnectionsPerNode) break;
        
        const pos2 = worldPositions[j];
        if (!pos2.isVisible) continue;
        
        // Calculate 3D distance
        const dx = pos1.x - pos2.x;
        const dy = pos1.y - pos2.y;
        const dz = pos1.z - pos2.z;
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
        
        if (distance < maxConnectionDistance) {
          connections.push({ from: i, to: j, distance });
          nodeConnections++;
        }
      }
    }
    
    return connections;
  }, [worldPositions, actualSphereRadius]);

  const connections = calculateConnections();

  const renderConnectionLines = useCallback(() => {
    return (
      <svg
        className="absolute inset-0 pointer-events-none"
        width={containerSize}
        height={containerSize}
        style={{ zIndex: 5 }}
      >
        <defs>
          <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'hsl(160, 25%, 72%)', stopOpacity: 0.9 }} />
            <stop offset="100%" style={{ stopColor: 'hsl(160, 25%, 80%)', stopOpacity: 1 }} />
          </linearGradient>
          <radialGradient id="nodeGlow">
            <stop offset="0%" style={{ stopColor: 'hsl(160, 25%, 72%)', stopOpacity: 0.9 }} />
            <stop offset="100%" style={{ stopColor: 'hsl(160, 25%, 72%)', stopOpacity: 0 }} />
          </radialGradient>
          <filter id="greenGlow">
            <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
            <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="hsl(160, 25%, 72%)"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        {connections.map((connection, idx) => {
          const from = worldPositions[connection.from];
          const to = worldPositions[connection.to];
          
          if (!from || !to || !from.isVisible || !to.isVisible) return null;
          
          const x1 = containerSize / 2 + from.x;
          const y1 = containerSize / 2 + from.y;
          const x2 = containerSize / 2 + to.x;
          const y2 = containerSize / 2 + to.y;
          
          // Calculate opacity based on fade - visible network effect
          const opacity = Math.min(from.fadeOpacity, to.fadeOpacity) * 0.35;
          
          // Calculate gradient for depth effect
          const midOpacity = opacity * 0.6;
          
          return (
            <React.Fragment key={`connection-${idx}`}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
              stroke="url(#greenGradient)"
              strokeWidth="4"
                opacity={opacity * 2.5}
                style={{
                  filter: 'drop-shadow(0 0 12px hsla(160, 25%, 72%, 1)) drop-shadow(0 0 20px hsla(160, 25%, 72%, 0.6))'
                }}
              />
            </React.Fragment>
          );
        })}
      </svg>
    );
  }, [connections, worldPositions, containerSize]);

  const renderImageNode = useCallback((image: ImageData, index: number) => {
    const position = worldPositions[index];

    if (!position || !position.isVisible) return null;

    // Add size variation: create different diameters for each ball
    // Use index-based pseudo-random to keep sizes consistent
    const sizeVariationSeed = (index * 7 + 13) % 100;
    const sizeVariation = 0.7 + (sizeVariationSeed / 100) * 0.6; // Range: 0.7 to 1.3
    
    const imageSize = baseImageSize * position.scale * sizeVariation;
    const isHovered = hoveredIndex === index;
    const finalScale = isHovered ? Math.min(1.2, 1.2 / position.scale) : 1;

    return (
      <div
        key={image.id}
        className="absolute cursor-pointer select-none transition-transform duration-200 ease-out"
        style={{
          width: `${imageSize}px`,
          height: `${imageSize}px`,
          left: `${containerSize/2 + position.x}px`,
          top: `${containerSize/2 + position.y}px`,
          opacity: position.fadeOpacity,
          transform: `translate(-50%, -50%) scale(${finalScale})`,
          zIndex: position.zIndex
        }}
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
        onClick={() => setSelectedImage(image)}
      >
        <div className="relative w-full h-full rounded-full overflow-hidden shadow-lg border-2" style={{
          borderColor: 'rgba(168, 197, 184, 0.4)',
          boxShadow: isHovered 
            ? '0 8px 32px rgba(168, 197, 184, 0.4), 0 0 20px rgba(168, 197, 184, 0.6)' 
            : '0 4px 12px rgba(168, 197, 184, 0.2), 0 0 8px rgba(168, 197, 184, 0.15)'
        }}>
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover"
            draggable={false}
            loading={index < 3 ? 'eager' : 'lazy'}
            style={{
              filter: isHovered 
                ? 'brightness(1.1) contrast(1.05)' 
                : 'brightness(1) contrast(1.05)'
            }}
          />
        </div>
      </div>
    );
  }, [worldPositions, baseImageSize, containerSize, hoveredIndex]);

  const renderSpotlightModal = () => {
    if (!selectedImage) return null;

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30"
        onClick={() => setSelectedImage(null)}
        style={{
          animation: 'fadeIn 0.3s ease-out'
        }}
      >
        <div
          className="bg-white rounded-xl max-w-md w-full overflow-hidden"
          onClick={(e) => e.stopPropagation()}
          style={{
            animation: 'scaleIn 0.3s ease-out'
          }}
        >
          <div className="relative aspect-square">
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 w-8 h-8 bg-black bg-opacity-50 rounded-full text-white flex items-center justify-center hover:bg-opacity-70 transition-all cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {(selectedImage.title || selectedImage.description) && (
            <div className="p-6">
              {selectedImage.title && (
                <h3 className="text-xl font-bold mb-2">{selectedImage.title}</h3>
              )}
              {selectedImage.description && (
                <p className="text-gray-600">{selectedImage.description}</p>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  // ==========================================
  // EARLY RETURNS
  // ==========================================

  if (!isMounted) {
    return (
      <div
        className="bg-gray-100 rounded-lg animate-pulse flex items-center justify-center"
        style={{ width: containerSize, height: containerSize }}
      >
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!images.length) {
    return (
      <div
        className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center"
        style={{ width: containerSize, height: containerSize }}
      >
        <div className="text-gray-400 text-center">
          <p>No images provided</p>
          <p className="text-sm">Add images to the images prop</p>
        </div>
      </div>
    );
  }

  // ==========================================
  // MAIN RENDER
  // ==========================================

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes dashAnimation {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -1000; }
        }
        @keyframes rotateGlobe {
          from {
            background-position: center center, 0% center, center center;
          }
          to {
            background-position: center center, 100% center, center center;
          }
        }
      `}</style>

      <div
        ref={containerRef}
        className={`relative select-none cursor-grab active:cursor-grabbing rounded-full ${className}`}
        style={{
          width: containerSize,
          height: containerSize,
          perspective: `${perspective}px`,
          backgroundImage: `
            radial-gradient(ellipse at 35% 35%, rgba(168, 197, 184, 0.4) 0%, transparent 50%),
            url(${worldMapGlobe}),
            radial-gradient(ellipse at 30% 30%, rgba(168, 197, 184, 0.95) 0%, rgba(150, 181, 173, 1) 40%, rgba(130, 165, 160, 1) 80%, rgba(110, 150, 145, 1) 100%)
          `,
          backgroundPosition: 'center center, center center, center center',
          backgroundSize: 'cover, cover, cover',
          backgroundRepeat: 'no-repeat',
          animation: 'rotateGlobe 120s linear infinite',
          border: '4px solid rgba(168, 197, 184, 0.6)',
          boxShadow: `
            0 0 80px rgba(168, 197, 184, 0.6),
            0 0 120px rgba(168, 197, 184, 0.4),
            inset 0 0 100px rgba(130, 165, 160, 0.4)
          `,
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Green overlay to enhance the world map visibility */}
        <div 
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 35% 35%, rgba(110, 150, 145, 0.15) 0%, rgba(130, 165, 160, 0.3) 50%, rgba(110, 150, 145, 0.5) 100%)`,
            zIndex: 1,
            mixBlendMode: 'multiply'
          }}
        />
        
        {renderConnectionLines()}
        <div className="relative w-full h-full" style={{ zIndex: 10 }}>
          {images.map((image, index) => renderImageNode(image, index))}
        </div>
      </div>

      {renderSpotlightModal()}
    </>
  );
};

export default SphereImageGrid;

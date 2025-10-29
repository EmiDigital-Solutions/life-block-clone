import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface SmallSphereProps {
  position: [number, number, number];
  index: number;
  size: number;
  baseColor: THREE.Color;
  emissiveIntensity: number;
  mousePosition: THREE.Vector3;
}

const SmallSphere = ({ position, index, size, baseColor, emissiveIntensity, mousePosition }: SmallSphereProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const lastMousePosition = useRef(new THREE.Vector3(999, 999, 999));
  
  // Store original position and color
  const originalPosition = useMemo(() => new THREE.Vector3(...position), [position]);
  const originalColor = useMemo(() => baseColor.clone(), [baseColor]);

  useFrame(() => {
    if (meshRef.current) {
      // Calculate distance to mouse position
      const worldPosition = new THREE.Vector3();
      meshRef.current.getWorldPosition(worldPosition);
      const distanceToMouse = worldPosition.distanceTo(mousePosition);
      
      // Calculate mouse movement direction
      const mouseMovement = mousePosition.clone().sub(lastMousePosition.current);
      const movementStrength = mouseMovement.length();
      
      // Interaction radius
      const interactionRadius = 1.5;
      
      if (distanceToMouse < interactionRadius && movementStrength > 0.01) {
        // Follow mouse movement direction
        const intensity = 1 - (distanceToMouse / interactionRadius);
        const moveDirection = mouseMovement.clone().normalize();
        const moveAmount = intensity * movementStrength * 2.0;
        
        const newPosition = originalPosition.clone().add(
          moveDirection.multiplyScalar(moveAmount)
        );
        meshRef.current.position.lerp(newPosition, 0.15);
      } else {
        // Return to original position
        meshRef.current.position.lerp(originalPosition, 0.08);
      }
      
      // Update last mouse position
      lastMousePosition.current.copy(mousePosition);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial
        color={baseColor}
        emissive={baseColor}
        emissiveIntensity={emissiveIntensity * 0.2}
        metalness={0.1}
        roughness={0.6}
        toneMapped={false}
      />
    </mesh>
  );
};

const SphereGroup = () => {
  const groupRef = useRef<THREE.Group>(null);
  const { camera, size } = useThree();
  
  // Track mouse position in 3D space
  const mousePosition = useRef(new THREE.Vector3(999, 999, 999)); // Far away initially
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const mouse = useRef(new THREE.Vector2());
  
  // Generate spheres with positions, sizes, and colors
  const sphereData = useMemo(() => {
    const data: Array<{
      position: [number, number, number];
      size: number;
      color: THREE.Color;
      emissiveIntensity: number;
    }> = [];
    
    const radius = 2.5;
    const count = 200; // Dense uniform packing
    
    // Very dark colors from auditor cards - no bright colors
    const colors = [
      { color: new THREE.Color(0.176, 0.216, 0.282), weight: 0.3 },  // #2D3748 dark slate
      { color: new THREE.Color(0.118, 0.227, 0.373), weight: 0.25 }, // #1E3A5F dark blue
      { color: new THREE.Color(0.067, 0.369, 0.349), weight: 0.25 }, // #115E59 dark teal
      { color: new THREE.Color(0.290, 0.337, 0.408), weight: 0.2 },  // #4A5568 dark gray
    ];
    
    // Fibonacci sphere distribution
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    
    for (let i = 0; i < count; i++) {
      const theta = 2 * Math.PI * i / goldenRatio;
      const phi = Math.acos(1 - 2 * (i + 0.5) / count);
      
      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);
      
      // UNIFORM SIZE - all spheres same size, tightly packed
      const size = 0.12;
      
      // Pick color based on weights
      const colorRand = Math.random();
      let selectedColor = colors[0].color;
      let cumulativeWeight = 0;
      for (const colorData of colors) {
        cumulativeWeight += colorData.weight;
        if (colorRand <= cumulativeWeight) {
          selectedColor = colorData.color;
          break;
        }
      }
      
      // Calculate depth-based emissive intensity (lower for professional look)
      const normalizedZ = (z + radius) / (2 * radius); // 0 to 1, where 1 is front
      const emissiveIntensity = 0.3 + normalizedZ * 0.7; // 0.3 to 1.0 (reduced from 0.5-2.0)
      
      data.push({
        position: [x, y, z],
        size,
        color: selectedColor.clone(),
        emissiveIntensity,
      });
    }
    
    return data;
  }, []);

  // Rotation and mouse tracking
  useFrame((state) => {
    if (groupRef.current) {
      // Smooth rotation
      groupRef.current.rotation.y += 0.001;
      
      // Update raycaster with mouse position
      raycaster.setFromCamera(mouse.current, camera);
      
      // Project mouse to 3D space
      const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
      const intersection = new THREE.Vector3();
      raycaster.ray.intersectPlane(plane, intersection);
      
      if (intersection) {
        mousePosition.current.copy(intersection);
      }
    }
  });

  // Mouse move handler
  const handlePointerMove = (event: PointerEvent) => {
    mouse.current.x = (event.clientX / size.width) * 2 - 1;
    mouse.current.y = -(event.clientY / size.height) * 2 + 1;
  };

  // Add event listener
  useMemo(() => {
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [size]);

  return (
    <group ref={groupRef}>
      {sphereData.map((data, index) => (
        <SmallSphere
          key={index}
          position={data.position}
          index={index}
          size={data.size}
          baseColor={data.color}
          emissiveIntensity={data.emissiveIntensity}
          mousePosition={mousePosition.current}
        />
      ))}
    </group>
  );
};

const InteractiveSphere = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={containerRef}
      className="w-full h-[400px] md:h-[600px] lg:h-[700px] overflow-hidden animate-in slide-in-from-bottom-8 slide-in-from-right-8 duration-1000 ease-out"
    >
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        style={{ background: "transparent" }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        {/* Professional 3D lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 8, 6]} intensity={1.0} color="#ffffff" />
        <directionalLight position={[-5, -3, -2]} intensity={0.4} color="#4A90E2" />
        <pointLight position={[6, 6, 6]} intensity={0.8} color="#ffffff" />
        
        {/* Sphere Group */}
        <SphereGroup />
        
        {/* Camera Controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
};

export default InteractiveSphere;

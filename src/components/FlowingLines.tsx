import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface LineTrailProps {
  index: number;
}

const LineTrail = ({ index }: LineTrailProps) => {
  const lineRef = useRef<THREE.Line | null>(null);
  
  // Create curved path for each line
  const { points, speed, offset, color, geometry, material } = useMemo(() => {
    const angle = (index / 12) * Math.PI * 2;
    const radius = 2 + Math.random() * 1.5;
    const height = 3;
    const numPoints = 50;
    const pts: THREE.Vector3[] = [];
    
    // Create flowing spiral path
    for (let i = 0; i < numPoints; i++) {
      const t = i / (numPoints - 1);
      const spiralAngle = angle + t * Math.PI * 4;
      const spiralRadius = radius * (1 - t * 0.3);
      
      const x = Math.cos(spiralAngle) * spiralRadius;
      const y = (t - 0.5) * height;
      const z = Math.sin(spiralAngle) * spiralRadius;
      
      pts.push(new THREE.Vector3(x, y, z));
    }
    
    // Green color variations
    const greenShades = [
      new THREE.Color(0.0, 0.8, 0.5),   // bright green
      new THREE.Color(0.0, 0.6, 0.4),   // medium green
      new THREE.Color(0.0, 0.4, 0.3),   // dark green
      new THREE.Color(0.067, 0.369, 0.349), // auditor green
    ];
    
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(pts.length * 3);
    
    pts.forEach((point, i) => {
      positions[i * 3] = point.x;
      positions[i * 3 + 1] = point.y;
      positions[i * 3 + 2] = point.z;
    });
    
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const mat = new THREE.LineBasicMaterial({
      color: greenShades[index % greenShades.length],
      transparent: true,
      opacity: 0.8,
      linewidth: 2
    });
    
    return {
      points: pts,
      speed: 0.3 + Math.random() * 0.5,
      offset: Math.random() * Math.PI * 2,
      color: greenShades[index % greenShades.length],
      geometry: geo,
      material: mat
    };
  }, [index]);

  // Create line object once
  useEffect(() => {
    if (!lineRef.current) {
      lineRef.current = new THREE.Line(geometry, material);
    }
  }, [geometry, material]);

  useFrame((state) => {
    if (lineRef.current) {
      const time = state.clock.getElapsedTime();
      
      // Animate line flow
      const positions = lineRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < points.length; i++) {
        const t = i / (points.length - 1);
        const flowOffset = Math.sin(time * speed + offset + t * Math.PI * 2) * 0.3;
        
        positions[i * 3] = points[i].x + flowOffset * Math.cos(time * 0.5);
        positions[i * 3 + 1] = points[i].y;
        positions[i * 3 + 2] = points[i].z + flowOffset * Math.sin(time * 0.5);
      }
      
      lineRef.current.geometry.attributes.position.needsUpdate = true;
      
      // Rotate entire line slowly
      lineRef.current.rotation.y = time * 0.1 + offset;
    }
  });

  return lineRef.current ? <primitive object={lineRef.current} /> : null;
};

const FlowingLines = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Create multiple flowing lines
  const lineIndices = useMemo(() => Array.from({ length: 12 }, (_, i) => i), []);

  return (
    <div 
      ref={containerRef}
      className="w-full h-[400px] md:h-[600px] lg:h-[700px] animate-in slide-in-from-bottom-8 slide-in-from-right-8 duration-1000 ease-out"
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        style={{ background: "transparent" }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Ambient green glow lighting */}
        <ambientLight intensity={0.3} color="#003d33" />
        <pointLight position={[0, 0, 5]} intensity={1.5} color="#00ff99" />
        <pointLight position={[3, 3, 3]} intensity={1.0} color="#00ddaa" />
        <pointLight position={[-3, -3, 3]} intensity={0.8} color="#00aa77" />
        
        {/* Flowing line trails */}
        {lineIndices.map((i) => (
          <LineTrail key={i} index={i} />
        ))}
      </Canvas>
    </div>
  );
};

export default FlowingLines;

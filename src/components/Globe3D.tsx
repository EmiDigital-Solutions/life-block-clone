import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Html } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";

interface Pin {
  id: number;
  position: [number, number, number];
  appearing: boolean;
  opacity: number;
}

const Globe = () => {
  const globeRef = useRef<THREE.Mesh>(null);
  const [pins, setPins] = useState<Pin[]>([]);

  // Globe rotation animation
  useFrame((state) => {
    if (globeRef.current) {
      // Continuous slow rotation
      globeRef.current.rotation.y += 0.0015;
      // Gentle floating motion
      globeRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  // Generate random positions on sphere surface
  const getRandomSpherePoint = (): [number, number, number] => {
    const radius = 2;
    const phi = Math.random() * Math.PI * 2;
    const theta = Math.acos(2 * Math.random() - 1);
    
    return [
      radius * Math.sin(theta) * Math.cos(phi),
      radius * Math.sin(theta) * Math.sin(phi),
      radius * Math.cos(theta),
    ];
  };

  // Manage pin appearances
  useEffect(() => {
    const addPin = () => {
      const newPin: Pin = {
        id: Date.now(),
        position: getRandomSpherePoint(),
        appearing: true,
        opacity: 0,
      };

      setPins((prev) => {
        // Keep only 3 pins max
        if (prev.length >= 3) {
          return [...prev.slice(1), newPin];
        }
        return [...prev, newPin];
      });

      // Fade in the pin
      setTimeout(() => {
        setPins((prev) =>
          prev.map((p) => (p.id === newPin.id ? { ...p, opacity: 1 } : p))
        );
      }, 50);

      // Start fading out after 2.5 seconds
      setTimeout(() => {
        setPins((prev) =>
          prev.map((p) => (p.id === newPin.id ? { ...p, appearing: false } : p))
        );
      }, 2500);

      // Remove after fade out
      setTimeout(() => {
        setPins((prev) => prev.filter((p) => p.id !== newPin.id));
      }, 3000);
    };

    // Add first pin immediately
    addPin();

    // Add new pins every 1.5 seconds
    const interval = setInterval(addPin, 1500);

    return () => clearInterval(interval);
  }, []);

  // Create continent geometry for the globe
  const continentGeometry = useMemo(() => {
    const geometry = new THREE.SphereGeometry(2, 64, 64);
    return geometry;
  }, []);

  return (
    <group>
      {/* Main Globe */}
      <Sphere ref={globeRef} args={[2, 64, 64]} geometry={continentGeometry}>
        <meshPhongMaterial
          color="#1a2332"
          emissive="#0a0f1a"
          emissiveIntensity={0.2}
          shininess={10}
          specular="#00d9ff"
          transparent
          opacity={0.95}
        />
      </Sphere>

      {/* Globe rim light */}
      <Sphere args={[2.05, 64, 64]}>
        <meshBasicMaterial
          color="#00d9ff"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Animated Pins */}
      {pins.map((pin) => (
        <Pin3D
          key={pin.id}
          position={pin.position}
          opacity={pin.appearing ? pin.opacity : 1 - pin.opacity}
        />
      ))}

      {/* Lights */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
      <pointLight position={[-5, 5, -5]} intensity={0.5} color="#00d9ff" />
    </group>
  );
};

interface Pin3DProps {
  position: [number, number, number];
  opacity: number;
}

const Pin3D = ({ position, opacity }: Pin3DProps) => {
  const pinRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (pinRef.current) {
      // Gentle pulse animation
      const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.1;
      pinRef.current.scale.setScalar(scale);
    }
  });

  // Calculate direction from globe center to pin position for proper orientation
  const direction = new THREE.Vector3(...position).normalize();
  const quaternion = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    direction
  );

  return (
    <group ref={pinRef} position={position} quaternion={quaternion}>
      {/* Pin marker - simple cone */}
      <mesh position={[0, 0.3, 0]}>
        <coneGeometry args={[0.08, 0.3, 8]} />
        <meshPhongMaterial
          color="#00d9ff"
          emissive="#00d9ff"
          emissiveIntensity={0.5}
          transparent
          opacity={opacity}
        />
      </mesh>

      {/* Pin base - circle */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.12, 16]} />
        <meshBasicMaterial
          color="#00d9ff"
          transparent
          opacity={opacity * 0.6}
        />
      </mesh>

      {/* Glow effect */}
      <mesh>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial
          color="#00d9ff"
          transparent
          opacity={opacity * 0.3}
        />
      </mesh>
    </group>
  );
};

const Globe3D = () => {
  return (
    <div className="relative w-full h-[500px] md:h-[600px]">
      {/* Atmospheric glow background */}
      <div className="absolute inset-0 blur-3xl bg-cyan-400/10 scale-150 -z-10" />
      
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <Globe />
      </Canvas>

      {/* Shadow beneath globe */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-96 h-8 bg-black/20 blur-2xl rounded-full" />
    </div>
  );
};

export default Globe3D;


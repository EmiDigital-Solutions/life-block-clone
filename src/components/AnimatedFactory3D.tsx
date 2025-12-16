import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, Suspense } from 'react';
import { Group, Mesh } from 'three';
import { Environment, Float } from '@react-three/drei';

// Wireframe building block
function WireframeBox({ 
  position, 
  size, 
  color = "#6EA996" 
}: { 
  position: [number, number, number]; 
  size: [number, number, number]; 
  color?: string;
}) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} wireframe transparent opacity={0.85} />
    </mesh>
  );
}

// Solid accent element
function SolidBox({ 
  position, 
  size, 
  color = "#0A7FA5" 
}: { 
  position: [number, number, number]; 
  size: [number, number, number]; 
  color?: string;
}) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} roughness={0.3} metalness={0.5} transparent opacity={0.9} />
    </mesh>
  );
}

// Rotating gear/wheel
function RotatingGear({ position, size = 0.3, speed = 1, color = "#0A7FA5" }: { 
  position: [number, number, number]; 
  size?: number; 
  speed?: number;
  color?: string;
}) {
  const gearRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (gearRef.current) {
      gearRef.current.rotation.z = state.clock.elapsedTime * speed;
    }
  });

  return (
    <mesh ref={gearRef} position={position} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[size, size * 0.25, 8, 12]} />
      <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
    </mesh>
  );
}

// Conveyor belt with moving boxes
function ConveyorBelt({ position }: { position: [number, number, number] }) {
  const boxesRef = useRef<Group>(null);
  
  useFrame((state) => {
    if (boxesRef.current) {
      boxesRef.current.children.forEach((box, i) => {
        const offset = (state.clock.elapsedTime * 0.3 + i * 0.5) % 2;
        box.position.x = -0.8 + offset;
      });
    }
  });

  return (
    <group position={position}>
      {/* Belt base */}
      <mesh>
        <boxGeometry args={[2, 0.08, 0.4]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Belt legs */}
      <mesh position={[-0.7, -0.2, 0]}>
        <boxGeometry args={[0.08, 0.3, 0.08]} />
        <meshStandardMaterial color="#6EA996" wireframe />
      </mesh>
      <mesh position={[0.7, -0.2, 0]}>
        <boxGeometry args={[0.08, 0.3, 0.08]} />
        <meshStandardMaterial color="#6EA996" wireframe />
      </mesh>
      {/* Moving boxes on belt */}
      <group ref={boxesRef}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} position={[-0.5 + i * 0.5, 0.12, 0]}>
            <boxGeometry args={[0.2, 0.15, 0.2]} />
            <meshStandardMaterial color="#0A7FA5" transparent opacity={0.8} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// Worker/person silhouette
function Worker({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      {/* Head */}
      <mesh position={[0, 0.35, 0]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial color="#0A7FA5" />
      </mesh>
      {/* Body */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.06, 0.1, 0.35, 8]} />
        <meshStandardMaterial color="#6EA996" />
      </mesh>
      {/* Legs */}
      <mesh position={[-0.04, -0.15, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.2, 6]} />
        <meshStandardMaterial color="#0A7FA5" />
      </mesh>
      <mesh position={[0.04, -0.15, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.2, 6]} />
        <meshStandardMaterial color="#0A7FA5" />
      </mesh>
    </group>
  );
}

// Industrial machine
function Machine({ position, type = 'press' }: { position: [number, number, number]; type?: string }) {
  const armRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (armRef.current && type === 'press') {
      armRef.current.position.y = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.15;
    }
  });

  return (
    <group position={position}>
      {/* Machine base */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.5, 0.3, 0.4]} />
        <meshStandardMaterial color="#6EA996" wireframe />
      </mesh>
      {/* Machine frame */}
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[0.4, 0.4, 0.35]} />
        <meshStandardMaterial color="#6EA996" wireframe transparent opacity={0.7} />
      </mesh>
      {/* Moving press arm */}
      <mesh ref={armRef} position={[0, 0.3, 0]}>
        <boxGeometry args={[0.25, 0.1, 0.25]} />
        <meshStandardMaterial color="#0A7FA5" metalness={0.6} roughness={0.3} />
      </mesh>
    </group>
  );
}

// Robotic arm
function RoboticArm({ position }: { position: [number, number, number] }) {
  const armRef = useRef<Group>(null);
  
  useFrame((state) => {
    if (armRef.current) {
      armRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.8;
    }
  });

  return (
    <group position={position}>
      {/* Base */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.2, 0.15, 12]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Rotating arm assembly */}
      <group ref={armRef}>
        {/* Arm segment 1 */}
        <mesh position={[0, 0.2, 0]} rotation={[0, 0, Math.PI / 6]}>
          <boxGeometry args={[0.08, 0.35, 0.08]} />
          <meshStandardMaterial color="#0A7FA5" metalness={0.6} roughness={0.3} />
        </mesh>
        {/* Arm segment 2 */}
        <mesh position={[0.15, 0.4, 0]}>
          <boxGeometry args={[0.3, 0.06, 0.06]} />
          <meshStandardMaterial color="#6EA996" metalness={0.5} roughness={0.4} />
        </mesh>
        {/* Gripper */}
        <mesh position={[0.3, 0.4, 0]}>
          <coneGeometry args={[0.06, 0.1, 6]} />
          <meshStandardMaterial color="#0A7FA5" />
        </mesh>
      </group>
    </group>
  );
}

// Forklift
function Forklift({ position }: { position: [number, number, number] }) {
  const forkliftRef = useRef<Group>(null);
  
  useFrame((state) => {
    if (forkliftRef.current) {
      forkliftRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.5;
    }
  });

  return (
    <group ref={forkliftRef} position={position}>
      {/* Body */}
      <mesh position={[0, 0.12, 0]}>
        <boxGeometry args={[0.3, 0.2, 0.2]} />
        <meshStandardMaterial color="#0A7FA5" />
      </mesh>
      {/* Fork */}
      <mesh position={[0.2, 0, 0]}>
        <boxGeometry args={[0.25, 0.03, 0.15]} />
        <meshStandardMaterial color="#6EA996" metalness={0.7} />
      </mesh>
      {/* Wheels */}
      {[[-0.1, -0.05, 0.1], [-0.1, -0.05, -0.1], [0.1, -0.05, 0.1], [0.1, -0.05, -0.1]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.03, 12]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      ))}
    </group>
  );
}

// Scanning line effect
function ScanLine() {
  const lineRef = useRef<Group>(null);
  
  useFrame((state) => {
    if (lineRef.current) {
      lineRef.current.position.y = Math.sin(state.clock.elapsedTime) * 1.5;
    }
  });

  return (
    <group ref={lineRef}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8, 0.03]} />
        <meshBasicMaterial color="#0A7FA5" transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

// Main factory structure
function Factory() {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.06;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.2}>
      <group ref={groupRef} scale={1}>
        {/* Main factory building */}
        <WireframeBox position={[0, 0.2, 0]} size={[3, 2, 2.5]} color="#6EA996" />
        
        {/* Warehouse section */}
        <WireframeBox position={[-2, 0.5, 0]} size={[1.5, 2.8, 2.2]} color="#6EA996" />
        
        {/* Office wing */}
        <WireframeBox position={[2.2, 0.3, 0]} size={[1.3, 2.4, 1.8]} color="#6EA996" />
        
        {/* Smokestacks */}
        <SolidBox position={[-2.5, 2, 0.6]} size={[0.25, 1.4, 0.25]} color="#0A7FA5" />
        <SolidBox position={[-2.5, 2, -0.3]} size={[0.2, 1, 0.2]} color="#0A7FA5" />
        
        {/* Loading dock */}
        <SolidBox position={[0.3, -0.65, 1.5]} size={[2, 0.35, 0.5]} color="#0A7FA5" />
        
        {/* Entrance */}
        <SolidBox position={[2.2, -0.2, 1.1]} size={[0.5, 1.4, 0.12]} color="#0A7FA5" />
        
        {/* Roof accents */}
        <WireframeBox position={[0, 1.4, 0]} size={[3.2, 0.12, 2.7]} color="#0A7FA5" />
        
        {/* === INTERIOR DETAILS === */}
        
        {/* Conveyor belts */}
        <ConveyorBelt position={[-0.5, -0.4, 0.3]} />
        <ConveyorBelt position={[0.8, -0.4, -0.5]} />
        
        {/* Machines */}
        <Machine position={[-1, -0.4, -0.6]} type="press" />
        <Machine position={[0.2, -0.4, -0.8]} type="press" />
        <Machine position={[1.2, -0.4, 0.6]} type="press" />
        
        {/* Robotic arms */}
        <RoboticArm position={[-0.8, -0.55, 0.8]} />
        <RoboticArm position={[0.5, -0.55, -0.2]} />
        
        {/* Workers */}
        <Worker position={[-0.3, -0.4, 0.6]} scale={0.8} />
        <Worker position={[0.6, -0.4, 0.2]} scale={0.8} />
        <Worker position={[-1.5, -0.4, 0.2]} scale={0.8} />
        <Worker position={[1.5, -0.4, -0.4]} scale={0.8} />
        
        {/* Forklift */}
        <Forklift position={[-1.8, -0.55, 0.8]} />
        
        {/* Rotating gears on machines */}
        <RotatingGear position={[-1.3, 0, -0.6]} size={0.2} speed={2} />
        <RotatingGear position={[0.5, 0.1, -0.8]} size={0.15} speed={-1.5} />
        <RotatingGear position={[1.5, 0, 0.6]} size={0.18} speed={1.8} />
        
        {/* Storage shelves in warehouse */}
        {[-1.8, -2, -2.2].map((x, i) => (
          <group key={i} position={[x, 0, -0.5]}>
            <WireframeBox position={[0, 0, 0]} size={[0.3, 1.5, 0.8]} color="#6EA996" />
            {/* Boxes on shelves */}
            <SolidBox position={[0, 0.3, 0]} size={[0.2, 0.2, 0.3]} color="#0A7FA5" />
            <SolidBox position={[0, -0.2, 0]} size={[0.2, 0.2, 0.3]} color="#0A7FA5" />
          </group>
        ))}
        
        {/* Ground grid */}
        <mesh position={[0, -0.85, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[8, 8, 20, 20]} />
          <meshBasicMaterial color="#6EA996" wireframe transparent opacity={0.15} />
        </mesh>
        
        {/* Scanning effect */}
        <ScanLine />
        
        {/* Audit checkpoint markers */}
        {[
          [-3, -0.8, 1.5],
          [3, -0.8, 1.5],
          [-3, -0.8, -1.5],
          [3, -0.8, -1.5],
        ].map((pos, i) => (
          <mesh key={i} position={pos as [number, number, number]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial color="#0A7FA5" emissive="#0A7FA5" emissiveIntensity={0.8} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

export function AnimatedFactory3D() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [5, 3.5, 5], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.55} />
          <directionalLight position={[8, 10, 5]} intensity={1.3} />
          <directionalLight position={[-6, 4, -6]} intensity={0.5} />
          <pointLight position={[0, 5, 0]} intensity={0.4} color="#ffffff" />
          
          {/* Environment */}
          <Environment preset="city" />
          
          {/* The Factory */}
          <Factory />
        </Suspense>
      </Canvas>
    </div>
  );
}

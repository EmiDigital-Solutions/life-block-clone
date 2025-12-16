import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, Suspense, useMemo } from 'react';
import { Group, Mesh, Vector3 } from 'three';
import { Environment, Float, Line, Text } from '@react-three/drei';

// CAD-style dimension line
function DimensionLine({ 
  start, 
  end, 
  offset = 0.3,
  color = "#0A7FA5" 
}: { 
  start: [number, number, number]; 
  end: [number, number, number];
  offset?: number;
  color?: string;
}) {
  const midPoint: [number, number, number] = [
    (start[0] + end[0]) / 2,
    start[1] + offset,
    (start[2] + end[2]) / 2
  ];
  
  return (
    <group>
      <Line
        points={[
          [start[0], start[1] + offset, start[2]],
          [end[0], end[1] + offset, end[2]]
        ]}
        color={color}
        lineWidth={1}
        transparent
        opacity={0.6}
      />
      {/* End markers */}
      <mesh position={[start[0], start[1] + offset, start[2]]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.05, 0.05, 0.01]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} />
      </mesh>
      <mesh position={[end[0], end[1] + offset, end[2]]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.05, 0.05, 0.01]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

// Realistic CNC Machine
function CNCMachine({ position }: { position: [number, number, number] }) {
  const spindleRef = useRef<Mesh>(null);
  const toolRef = useRef<Group>(null);
  
  useFrame((state) => {
    if (spindleRef.current) {
      spindleRef.current.rotation.y = state.clock.elapsedTime * 8;
    }
    if (toolRef.current) {
      toolRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
      toolRef.current.position.z = Math.cos(state.clock.elapsedTime * 0.6) * 0.1;
    }
  });

  return (
    <group position={position}>
      {/* Machine enclosure */}
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[0.8, 0.7, 0.7]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.9} roughness={0.2} transparent opacity={0.3} />
      </mesh>
      {/* Frame structure */}
      {[[-0.35, 0, -0.3], [-0.35, 0, 0.3], [0.35, 0, -0.3], [0.35, 0, 0.3]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <boxGeometry args={[0.05, 0.7, 0.05]} />
          <meshStandardMaterial color="#6EA996" metalness={0.7} roughness={0.3} />
        </mesh>
      ))}
      {/* Work table */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[0.5, 0.08, 0.45]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.95} roughness={0.1} />
      </mesh>
      {/* T-slot details */}
      {[-0.15, 0, 0.15].map((z, i) => (
        <mesh key={i} position={[0, 0.095, z]}>
          <boxGeometry args={[0.48, 0.01, 0.03]} />
          <meshStandardMaterial color="#333" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}
      {/* Spindle assembly */}
      <group ref={toolRef} position={[0, 0.45, 0]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.2, 0.15, 0.2]} />
          <meshStandardMaterial color="#0A7FA5" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh ref={spindleRef} position={[0, -0.12, 0]}>
          <cylinderGeometry args={[0.04, 0.02, 0.15, 16]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.95} roughness={0.1} />
        </mesh>
      </group>
      {/* Control panel */}
      <mesh position={[0.42, 0.4, 0]}>
        <boxGeometry args={[0.08, 0.25, 0.3]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[0.47, 0.42, 0]}>
        <planeGeometry args={[0.01, 0.18, 0.2]} />
        <meshStandardMaterial color="#0A7FA5" emissive="#0A7FA5" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}

// Quality Inspection Station
function InspectionStation({ position }: { position: [number, number, number] }) {
  const gaugeRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (gaugeRef.current) {
      gaugeRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.3;
    }
  });

  return (
    <group position={position}>
      {/* Inspection table */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[0.6, 0.1, 0.5]} />
        <meshStandardMaterial color="#e8e8e8" metalness={0.3} roughness={0.4} />
      </mesh>
      {/* Table legs */}
      {[[-0.25, -0.25, -0.2], [-0.25, -0.25, 0.2], [0.25, -0.25, -0.2], [0.25, -0.25, 0.2]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
          <meshStandardMaterial color="#6EA996" metalness={0.6} roughness={0.3} />
        </mesh>
      ))}
      {/* Measuring equipment - Caliper */}
      <group position={[0.1, 0.05, 0]} rotation={[0, 0.3, 0]}>
        <mesh>
          <boxGeometry args={[0.25, 0.02, 0.06]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0.08, 0.02, 0]}>
          <boxGeometry args={[0.08, 0.04, 0.04]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
      {/* Height gauge */}
      <group position={[-0.15, 0.15, 0.1]}>
        <mesh>
          <boxGeometry args={[0.08, 0.02, 0.08]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        <mesh position={[0, 0.12, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.22, 12]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh ref={gaugeRef} position={[0.04, 0.1, 0]}>
          <boxGeometry args={[0.08, 0.015, 0.03]} />
          <meshStandardMaterial color="#0A7FA5" />
        </mesh>
      </group>
      {/* Part being inspected */}
      <mesh position={[0.05, 0.08, -0.1]} rotation={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.04, 24]} />
        <meshStandardMaterial color="#b0b0b0" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Magnifying lamp */}
      <group position={[0.2, 0.3, -0.15]}>
        <mesh position={[0, -0.1, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 0.2, 8]} />
          <meshStandardMaterial color="#333" />
        </mesh>
        <mesh>
          <torusGeometry args={[0.06, 0.015, 8, 24]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        <mesh position={[0, 0, 0.01]}>
          <circleGeometry args={[0.05, 24]} />
          <meshStandardMaterial color="#fff" transparent opacity={0.3} />
        </mesh>
      </group>
    </group>
  );
}

// Realistic Assembly Line with detailed conveyor
function AssemblyLine({ position }: { position: [number, number, number] }) {
  const partsRef = useRef<Group>(null);
  const rollerRefs = useRef<(Mesh | null)[]>([]);
  
  useFrame((state) => {
    if (partsRef.current) {
      partsRef.current.children.forEach((part, i) => {
        const offset = (state.clock.elapsedTime * 0.25 + i * 0.4) % 2.4;
        part.position.x = -1 + offset;
      });
    }
    rollerRefs.current.forEach((roller) => {
      if (roller) {
        roller.rotation.z = state.clock.elapsedTime * 3;
      }
    });
  });

  return (
    <group position={position}>
      {/* Main conveyor frame */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.5, 0.06, 0.5]} />
        <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Side rails */}
      <mesh position={[0, 0.05, 0.23]}>
        <boxGeometry args={[2.5, 0.04, 0.04]} />
        <meshStandardMaterial color="#6EA996" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.05, -0.23]}>
        <boxGeometry args={[2.5, 0.04, 0.04]} />
        <meshStandardMaterial color="#6EA996" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Rollers */}
      {Array.from({ length: 12 }).map((_, i) => (
        <mesh 
          key={i} 
          ref={(el) => { if (el) rollerRefs.current[i] = el; }}
          position={[-1.1 + i * 0.2, -0.01, 0]} 
          rotation={[Math.PI / 2, 0, 0]}
        >
          <cylinderGeometry args={[0.025, 0.025, 0.42, 12]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}
      {/* Support legs */}
      {[-0.9, -0.3, 0.3, 0.9].map((x, i) => (
        <group key={i}>
          <mesh position={[x, -0.2, 0.2]}>
            <boxGeometry args={[0.04, 0.35, 0.04]} />
            <meshStandardMaterial color="#6EA996" metalness={0.6} roughness={0.3} />
          </mesh>
          <mesh position={[x, -0.2, -0.2]}>
            <boxGeometry args={[0.04, 0.35, 0.04]} />
            <meshStandardMaterial color="#6EA996" metalness={0.6} roughness={0.3} />
          </mesh>
        </group>
      ))}
      {/* Moving parts on conveyor */}
      <group ref={partsRef}>
        {[0, 1, 2, 3, 4].map((i) => (
          <group key={i} position={[-0.8 + i * 0.4, 0.08, 0]}>
            {/* Engine block style part */}
            <mesh>
              <boxGeometry args={[0.15, 0.08, 0.12]} />
              <meshStandardMaterial color="#808080" metalness={0.85} roughness={0.15} />
            </mesh>
            {/* Detail features */}
            <mesh position={[0, 0.05, 0]}>
              <cylinderGeometry args={[0.02, 0.02, 0.04, 8]} />
              <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

// Industrial Robot Arm with realistic joints
function IndustrialRobot({ position, baseColor = "#0A7FA5" }: { position: [number, number, number]; baseColor?: string }) {
  const joint1Ref = useRef<Group>(null);
  const joint2Ref = useRef<Group>(null);
  const joint3Ref = useRef<Group>(null);
  
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (joint1Ref.current) {
      joint1Ref.current.rotation.y = Math.sin(t * 0.4) * 0.6;
    }
    if (joint2Ref.current) {
      joint2Ref.current.rotation.z = -0.3 + Math.sin(t * 0.5 + 1) * 0.3;
    }
    if (joint3Ref.current) {
      joint3Ref.current.rotation.z = Math.sin(t * 0.6 + 2) * 0.4;
    }
  });

  return (
    <group position={position}>
      {/* Heavy base */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.2, 0.25, 0.1, 24]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Base mounting plate */}
      <mesh position={[0, 0.11, 0]}>
        <cylinderGeometry args={[0.15, 0.18, 0.02, 24]} />
        <meshStandardMaterial color={baseColor} metalness={0.7} roughness={0.2} />
      </mesh>
      
      {/* J1 - Base rotation */}
      <group ref={joint1Ref} position={[0, 0.12, 0]}>
        {/* Lower arm housing */}
        <mesh position={[0, 0.15, 0]}>
          <boxGeometry args={[0.12, 0.25, 0.12]} />
          <meshStandardMaterial color={baseColor} metalness={0.7} roughness={0.2} />
        </mesh>
        
        {/* J2 - Shoulder */}
        <group ref={joint2Ref} position={[0, 0.28, 0]}>
          {/* Joint cover */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 0.14, 16]} />
            <meshStandardMaterial color="#333" metalness={0.85} roughness={0.15} />
          </mesh>
          {/* Upper arm */}
          <mesh position={[0, 0.18, 0]}>
            <boxGeometry args={[0.08, 0.3, 0.08]} />
            <meshStandardMaterial color={baseColor} metalness={0.7} roughness={0.2} />
          </mesh>
          
          {/* J3 - Elbow */}
          <group ref={joint3Ref} position={[0, 0.35, 0]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.04, 0.04, 0.1, 16]} />
              <meshStandardMaterial color="#333" metalness={0.85} roughness={0.15} />
            </mesh>
            {/* Forearm */}
            <mesh position={[0, 0.12, 0]}>
              <boxGeometry args={[0.06, 0.2, 0.06]} />
              <meshStandardMaterial color={baseColor} metalness={0.7} roughness={0.2} />
            </mesh>
            {/* End effector / Gripper */}
            <group position={[0, 0.24, 0]}>
              <mesh>
                <cylinderGeometry args={[0.03, 0.04, 0.05, 12]} />
                <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
              </mesh>
              {/* Gripper fingers */}
              <mesh position={[0.025, -0.04, 0]}>
                <boxGeometry args={[0.015, 0.06, 0.02]} />
                <meshStandardMaterial color="#6EA996" metalness={0.8} roughness={0.2} />
              </mesh>
              <mesh position={[-0.025, -0.04, 0]}>
                <boxGeometry args={[0.015, 0.06, 0.02]} />
                <meshStandardMaterial color="#6EA996" metalness={0.8} roughness={0.2} />
              </mesh>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

// Detailed Worker with safety equipment
function DetailedWorker({ position, rotation = 0 }: { position: [number, number, number]; rotation?: number }) {
  const clipboardRef = useRef<Group>(null);
  
  useFrame((state) => {
    if (clipboardRef.current) {
      clipboardRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Hard hat */}
      <mesh position={[0, 0.42, 0]}>
        <sphereGeometry args={[0.065, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#f5a623" metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.39, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.02, 16]} />
        <meshStandardMaterial color="#f5a623" metalness={0.3} roughness={0.4} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.35, 0]}>
        <sphereGeometry args={[0.055, 12, 12]} />
        <meshStandardMaterial color="#d4a574" />
      </mesh>
      {/* Safety vest body */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.05, 0.07, 0.25, 8]} />
        <meshStandardMaterial color="#ff6b00" />
      </mesh>
      {/* Vest stripes */}
      <mesh position={[0, 0.18, 0.052]}>
        <boxGeometry args={[0.06, 0.02, 0.01]} />
        <meshStandardMaterial color="#c0c0c0" emissive="#c0c0c0" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, 0.12, 0.052]}>
        <boxGeometry args={[0.06, 0.02, 0.01]} />
        <meshStandardMaterial color="#c0c0c0" emissive="#c0c0c0" emissiveIntensity={0.3} />
      </mesh>
      {/* Arms */}
      <mesh position={[-0.08, 0.15, 0]} rotation={[0, 0, 0.3]}>
        <cylinderGeometry args={[0.02, 0.02, 0.15, 6]} />
        <meshStandardMaterial color="#0A7FA5" />
      </mesh>
      <mesh position={[0.08, 0.12, 0.03]} rotation={[0.5, 0, -0.3]}>
        <cylinderGeometry args={[0.02, 0.02, 0.15, 6]} />
        <meshStandardMaterial color="#0A7FA5" />
      </mesh>
      {/* Legs */}
      <mesh position={[-0.03, -0.08, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.2, 6]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[0.03, -0.08, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.2, 6]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* Safety boots */}
      <mesh position={[-0.03, -0.19, 0.015]}>
        <boxGeometry args={[0.04, 0.04, 0.07]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[0.03, -0.19, 0.015]}>
        <boxGeometry args={[0.04, 0.04, 0.07]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      {/* Clipboard */}
      <group ref={clipboardRef} position={[0.12, 0.08, 0.06]} rotation={[0.8, 0, 0.2]}>
        <mesh>
          <boxGeometry args={[0.08, 0.1, 0.01]} />
          <meshStandardMaterial color="#8b4513" />
        </mesh>
        <mesh position={[0, 0, 0.006]}>
          <planeGeometry args={[0.07, 0.09]} />
          <meshStandardMaterial color="#fff" />
        </mesh>
      </group>
    </group>
  );
}

// Pipe system with valves
function PipeSystem({ position }: { position: [number, number, number] }) {
  const valveRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (valveRef.current) {
      valveRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <group position={position}>
      {/* Main horizontal pipe */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.04, 1.5, 16]} />
        <meshStandardMaterial color="#808080" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Vertical section */}
      <mesh position={[0.5, -0.25, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.5, 16]} />
        <meshStandardMaterial color="#808080" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Elbow fitting */}
      <mesh position={[0.5, 0, 0]}>
        <torusGeometry args={[0.08, 0.04, 8, 12, Math.PI / 2]} />
        <meshStandardMaterial color="#808080" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Valve */}
      <group position={[-0.2, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[0.06, 0.06, 0.08, 12]} />
          <meshStandardMaterial color="#6EA996" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh ref={valveRef} position={[0, 0.06, 0]}>
          <cylinderGeometry args={[0.015, 0.02, 0.1, 8]} />
          <meshStandardMaterial color="#0A7FA5" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.12, 0]}>
          <torusGeometry args={[0.03, 0.008, 8, 16]} />
          <meshStandardMaterial color="#0A7FA5" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
      {/* Pressure gauge */}
      <group position={[0.2, 0.06, 0]} rotation={[0, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[0.035, 0.035, 0.02, 16]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        <mesh position={[0, 0.011, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.03, 24]} />
          <meshStandardMaterial color="#fff" />
        </mesh>
      </group>
    </group>
  );
}

// Control cabinet
function ControlCabinet({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Cabinet body */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[0.4, 0.8, 0.25]} />
        <meshStandardMaterial color="#e8e8e8" metalness={0.5} roughness={0.3} />
      </mesh>
      {/* Door panel */}
      <mesh position={[0, 0.4, 0.126]}>
        <boxGeometry args={[0.36, 0.76, 0.01]} />
        <meshStandardMaterial color="#d0d0d0" metalness={0.6} roughness={0.2} />
      </mesh>
      {/* Handle */}
      <mesh position={[0.14, 0.4, 0.14]}>
        <boxGeometry args={[0.02, 0.1, 0.02]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Status lights */}
      {[0.65, 0.55, 0.45].map((y, i) => (
        <mesh key={i} position={[-0.12, y, 0.135]}>
          <sphereGeometry args={[0.015, 12, 12]} />
          <meshStandardMaterial 
            color={i === 0 ? "#4ade80" : i === 1 ? "#fbbf24" : "#ef4444"} 
            emissive={i === 0 ? "#4ade80" : i === 1 ? "#fbbf24" : "#ef4444"} 
            emissiveIntensity={i === 0 ? 0.8 : 0.3}
          />
        </mesh>
      ))}
      {/* Warning label */}
      <mesh position={[0, 0.15, 0.135]}>
        <planeGeometry args={[0.15, 0.08]} />
        <meshStandardMaterial color="#fbbf24" />
      </mesh>
    </group>
  );
}

// Scanning laser effect
function LaserScanner({ position }: { position: [number, number, number] }) {
  const laserRef = useRef<Group>(null);
  
  useFrame((state) => {
    if (laserRef.current) {
      laserRef.current.rotation.y = state.clock.elapsedTime * 2;
    }
  });

  return (
    <group position={position}>
      {/* Scanner housing */}
      <mesh>
        <cylinderGeometry args={[0.06, 0.08, 0.1, 16]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Laser beam */}
      <group ref={laserRef}>
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.003, 0.003, 0.9, 8]} />
          <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={2} transparent opacity={0.8} />
        </mesh>
      </group>
    </group>
  );
}

// Main factory structure - CAD style
function Factory() {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.04;
    }
  });

  return (
    <Float speed={0.8} rotationIntensity={0.03} floatIntensity={0.15}>
      <group ref={groupRef} scale={1}>
        
        {/* === FLOOR GRID - CAD STYLE === */}
        <mesh position={[0, -0.55, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[6, 6, 30, 30]} />
          <meshBasicMaterial color="#6EA996" wireframe transparent opacity={0.12} />
        </mesh>
        
        {/* === MAIN PRODUCTION FLOOR === */}
        <mesh position={[0, -0.52, 0]}>
          <boxGeometry args={[5, 0.05, 4]} />
          <meshStandardMaterial color="#e0e0e0" metalness={0.2} roughness={0.6} />
        </mesh>
        
        {/* Floor markings - safety zones */}
        <mesh position={[-1.5, -0.49, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.8, 3]} />
          <meshStandardMaterial color="#fbbf24" transparent opacity={0.4} />
        </mesh>
        
        {/* === CNC MACHINES === */}
        <CNCMachine position={[-1.5, -0.5, -1]} />
        <CNCMachine position={[-1.5, -0.5, 0.5]} />
        
        {/* === ASSEMBLY LINE === */}
        <AssemblyLine position={[0.5, -0.15, 0]} />
        
        {/* === INDUSTRIAL ROBOTS === */}
        <IndustrialRobot position={[0, -0.5, -1.2]} baseColor="#0A7FA5" />
        <IndustrialRobot position={[1.2, -0.5, -1.2]} baseColor="#6EA996" />
        
        {/* === QUALITY INSPECTION === */}
        <InspectionStation position={[1.8, -0.4, 0.8]} />
        
        {/* === WORKERS === */}
        <DetailedWorker position={[-0.5, -0.25, 0.8]} rotation={-0.5} />
        <DetailedWorker position={[1.5, -0.25, 0.3]} rotation={2.5} />
        <DetailedWorker position={[-1.8, -0.25, 0]} rotation={1} />
        <DetailedWorker position={[0.8, -0.25, -0.8]} rotation={-1.5} />
        
        {/* === PIPE SYSTEMS === */}
        <PipeSystem position={[-2, 0.5, -0.5]} />
        <PipeSystem position={[2, 0.3, 0]} />
        
        {/* === CONTROL CABINETS === */}
        <ControlCabinet position={[-2.2, -0.5, 1.2]} />
        <ControlCabinet position={[2.2, -0.5, -1.2]} />
        
        {/* === OVERHEAD CRANE === */}
        <group position={[0, 1.5, 0]}>
          {/* Rails */}
          <mesh position={[0, 0, -1.5]}>
            <boxGeometry args={[5, 0.08, 0.1]} />
            <meshStandardMaterial color="#6EA996" metalness={0.7} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0, 1.5]}>
            <boxGeometry args={[5, 0.08, 0.1]} />
            <meshStandardMaterial color="#6EA996" metalness={0.7} roughness={0.3} />
          </mesh>
          {/* Bridge */}
          <mesh position={[0, -0.05, 0]}>
            <boxGeometry args={[0.15, 0.15, 3]} />
            <meshStandardMaterial color="#f5a623" />
          </mesh>
          {/* Hoist */}
          <mesh position={[0, -0.2, 0]}>
            <boxGeometry args={[0.2, 0.15, 0.2]} />
            <meshStandardMaterial color="#f5a623" />
          </mesh>
          {/* Cable */}
          <mesh position={[0, -0.6, 0]}>
            <cylinderGeometry args={[0.008, 0.008, 0.7, 8]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>
          {/* Hook */}
          <mesh position={[0, -0.98, 0]}>
            <torusGeometry args={[0.04, 0.01, 8, 16, Math.PI * 1.5]} />
            <meshStandardMaterial color="#0A7FA5" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
        
        {/* === LASER SCANNER - QC === */}
        <LaserScanner position={[1.5, 0.8, 0.8]} />
        
        {/* === DIMENSION LINES - CAD STYLE === */}
        <DimensionLine start={[-2.5, -0.5, 2]} end={[2.5, -0.5, 2]} offset={0.2} />
        <DimensionLine start={[-2.5, -0.5, -2]} end={[-2.5, -0.5, 2]} offset={0.2} />
        
        {/* === AUDIT CHECKPOINT MARKERS === */}
        {[
          [-2.3, -0.5, 1.8],
          [2.3, -0.5, 1.8],
          [-2.3, -0.5, -1.8],
          [2.3, -0.5, -1.8],
          [0, -0.5, 1.8],
        ].map((pos, i) => (
          <group key={i} position={pos as [number, number, number]}>
            <mesh>
              <cylinderGeometry args={[0.06, 0.06, 0.02, 24]} />
              <meshStandardMaterial color="#0A7FA5" metalness={0.7} roughness={0.3} />
            </mesh>
            <mesh position={[0, 0.02, 0]}>
              <sphereGeometry args={[0.035, 16, 16]} />
              <meshStandardMaterial color="#0A7FA5" emissive="#0A7FA5" emissiveIntensity={0.6} />
            </mesh>
          </group>
        ))}
        
        {/* === STORAGE/MATERIAL AREA === */}
        <group position={[2, -0.5, 0.5]}>
          {/* Pallet with parts */}
          <mesh position={[0, 0.02, 0]}>
            <boxGeometry args={[0.4, 0.04, 0.4]} />
            <meshStandardMaterial color="#8b4513" />
          </mesh>
          {/* Stacked boxes */}
          {[[0, 0.12, 0], [0, 0.24, 0], [-0.08, 0.12, 0.08]].map((pos, i) => (
            <mesh key={i} position={pos as [number, number, number]}>
              <boxGeometry args={[0.15, 0.1, 0.15]} />
              <meshStandardMaterial color={i % 2 === 0 ? "#6EA996" : "#0A7FA5"} transparent opacity={0.9} />
            </mesh>
          ))}
        </group>
        
      </group>
    </Float>
  );
}

export function AnimatedFactory3D() {
  return (
    <div className="absolute inset-0 z-[2] pointer-events-none" style={{ opacity: 0.65 }}>
      <Canvas
        camera={{ position: [6, 4, 6], fov: 35 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          {/* Lighting setup for CAD-style clarity */}
          <ambientLight intensity={0.7} />
          <directionalLight position={[10, 12, 8]} intensity={1.5} castShadow />
          <directionalLight position={[-8, 6, -8]} intensity={0.5} />
          <pointLight position={[0, 4, 0]} intensity={0.4} color="#ffffff" />
          <spotLight position={[0, 5, 0]} angle={0.4} penumbra={0.5} intensity={0.6} />
          
          {/* Environment for realistic reflections */}
          <Environment preset="city" />
          
          {/* The Factory */}
          <Factory />
        </Suspense>
      </Canvas>
    </div>
  );
}

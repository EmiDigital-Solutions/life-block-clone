import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, Suspense } from 'react';
import { Group, Mesh } from 'three';
import { Environment, Float, Line } from '@react-three/drei';

// Brand colors
const COLORS = {
  primary: "#0A7FA5",      // CTA Blue-Teal
  secondary: "#6EA996",    // Hero Green
  dark: "#1A1A1A",         // Charcoal
  light: "#ACC5D9",        // BlueGrey Light
  wireframe: "#C0C0C0",    // Grey Mid
  accent: "#B2CDBC",       // Mint Light
};

// CAD-style dimension line
function DimensionLine({ 
  start, 
  end, 
  offset = 0.3,
}: { 
  start: [number, number, number]; 
  end: [number, number, number];
  offset?: number;
}) {
  return (
    <group>
      <Line
        points={[
          [start[0], start[1] + offset, start[2]],
          [end[0], end[1] + offset, end[2]]
        ]}
        color={COLORS.primary}
        lineWidth={1}
        transparent
        opacity={0.4}
      />
      <mesh position={[start[0], start[1] + offset, start[2]]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.04, 0.04, 0.01]} />
        <meshBasicMaterial color={COLORS.primary} transparent opacity={0.4} />
      </mesh>
      <mesh position={[end[0], end[1] + offset, end[2]]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.04, 0.04, 0.01]} />
        <meshBasicMaterial color={COLORS.primary} transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

// Wireframe CNC Machine - Blueprint style
function CNCMachine({ position }: { position: [number, number, number] }) {
  const spindleRef = useRef<Mesh>(null);
  const toolRef = useRef<Group>(null);
  
  useFrame((state) => {
    if (spindleRef.current) {
      spindleRef.current.rotation.y = state.clock.elapsedTime * 6;
    }
    if (toolRef.current) {
      toolRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.8) * 0.12;
      toolRef.current.position.z = Math.cos(state.clock.elapsedTime * 0.6) * 0.08;
    }
  });

  return (
    <group position={position}>
      {/* Machine frame - wireframe */}
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[0.7, 0.65, 0.6]} />
        <meshStandardMaterial color={COLORS.wireframe} wireframe transparent opacity={0.5} />
      </mesh>
      {/* Frame pillars */}
      {[[-0.3, 0, -0.25], [-0.3, 0, 0.25], [0.3, 0, -0.25], [0.3, 0, 0.25]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <boxGeometry args={[0.04, 0.65, 0.04]} />
          <meshStandardMaterial color={COLORS.secondary} metalness={0.6} roughness={0.4} />
        </mesh>
      ))}
      {/* Work table */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[0.45, 0.06, 0.4]} />
        <meshStandardMaterial color={COLORS.dark} metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Spindle assembly */}
      <group ref={toolRef} position={[0, 0.45, 0]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.15, 0.12, 0.15]} />
          <meshStandardMaterial color={COLORS.primary} metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh ref={spindleRef} position={[0, -0.1, 0]}>
          <cylinderGeometry args={[0.03, 0.015, 0.12, 12]} />
          <meshStandardMaterial color={COLORS.light} metalness={0.95} roughness={0.1} />
        </mesh>
      </group>
      {/* Control panel */}
      <mesh position={[0.38, 0.35, 0]}>
        <boxGeometry args={[0.06, 0.2, 0.25]} />
        <meshStandardMaterial color={COLORS.dark} />
      </mesh>
      <mesh position={[0.42, 0.37, 0]}>
        <planeGeometry args={[0.01, 0.12, 0.15]} />
        <meshStandardMaterial color={COLORS.primary} emissive={COLORS.primary} emissiveIntensity={0.2} />
      </mesh>
    </group>
  );
}

// Quality Inspection Station - Technical style
function InspectionStation({ position }: { position: [number, number, number] }) {
  const gaugeRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (gaugeRef.current) {
      gaugeRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.5) * 0.25;
    }
  });

  return (
    <group position={position}>
      {/* Inspection table - wireframe */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[0.55, 0.08, 0.45]} />
        <meshStandardMaterial color={COLORS.wireframe} wireframe transparent opacity={0.6} />
      </mesh>
      {/* Table surface */}
      <mesh position={[0, -0.02, 0]}>
        <boxGeometry args={[0.5, 0.02, 0.4]} />
        <meshStandardMaterial color={COLORS.light} metalness={0.4} roughness={0.5} />
      </mesh>
      {/* Table legs */}
      {[[-0.22, -0.22, -0.18], [-0.22, -0.22, 0.18], [0.22, -0.22, -0.18], [0.22, -0.22, 0.18]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <cylinderGeometry args={[0.015, 0.015, 0.28, 8]} />
          <meshStandardMaterial color={COLORS.secondary} metalness={0.5} roughness={0.4} />
        </mesh>
      ))}
      {/* Measuring tool */}
      <group position={[0.08, 0.03, 0]} rotation={[0, 0.3, 0]}>
        <mesh>
          <boxGeometry args={[0.2, 0.015, 0.05]} />
          <meshStandardMaterial color={COLORS.wireframe} metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
      {/* Height gauge */}
      <group position={[-0.12, 0.12, 0.08]}>
        <mesh>
          <boxGeometry args={[0.06, 0.015, 0.06]} />
          <meshStandardMaterial color={COLORS.dark} />
        </mesh>
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.18, 10]} />
          <meshStandardMaterial color={COLORS.wireframe} metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh ref={gaugeRef} position={[0.035, 0.08, 0]}>
          <boxGeometry args={[0.06, 0.012, 0.025]} />
          <meshStandardMaterial color={COLORS.primary} />
        </mesh>
      </group>
      {/* Part being inspected */}
      <mesh position={[0.04, 0.06, -0.08]} rotation={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.035, 20]} />
        <meshStandardMaterial color={COLORS.wireframe} metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  );
}

// Assembly Line - Technical wireframe style
function AssemblyLine({ position }: { position: [number, number, number] }) {
  const partsRef = useRef<Group>(null);
  const rollerRefs = useRef<(Mesh | null)[]>([]);
  
  useFrame((state) => {
    if (partsRef.current) {
      partsRef.current.children.forEach((part, i) => {
        const offset = (state.clock.elapsedTime * 0.2 + i * 0.35) % 2.2;
        part.position.x = -0.9 + offset;
      });
    }
    rollerRefs.current.forEach((roller) => {
      if (roller) {
        roller.rotation.z = state.clock.elapsedTime * 2.5;
      }
    });
  });

  return (
    <group position={position}>
      {/* Main conveyor frame - wireframe */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.2, 0.05, 0.45]} />
        <meshStandardMaterial color={COLORS.wireframe} wireframe transparent opacity={0.5} />
      </mesh>
      {/* Side rails */}
      <mesh position={[0, 0.04, 0.2]}>
        <boxGeometry args={[2.2, 0.03, 0.03]} />
        <meshStandardMaterial color={COLORS.secondary} metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.04, -0.2]}>
        <boxGeometry args={[2.2, 0.03, 0.03]} />
        <meshStandardMaterial color={COLORS.secondary} metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Rollers */}
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh 
          key={i} 
          ref={(el) => { if (el) rollerRefs.current[i] = el; }}
          position={[-0.95 + i * 0.2, -0.01, 0]} 
          rotation={[Math.PI / 2, 0, 0]}
        >
          <cylinderGeometry args={[0.02, 0.02, 0.36, 10]} />
          <meshStandardMaterial color={COLORS.dark} metalness={0.85} roughness={0.15} />
        </mesh>
      ))}
      {/* Support legs - wireframe */}
      {[-0.8, -0.2, 0.4, 0.8].map((x, i) => (
        <group key={i}>
          <mesh position={[x, -0.18, 0.18]}>
            <boxGeometry args={[0.03, 0.3, 0.03]} />
            <meshStandardMaterial color={COLORS.secondary} wireframe transparent opacity={0.7} />
          </mesh>
          <mesh position={[x, -0.18, -0.18]}>
            <boxGeometry args={[0.03, 0.3, 0.03]} />
            <meshStandardMaterial color={COLORS.secondary} wireframe transparent opacity={0.7} />
          </mesh>
        </group>
      ))}
      {/* Moving parts - wireframe blocks */}
      <group ref={partsRef}>
        {[0, 1, 2, 3, 4].map((i) => (
          <group key={i} position={[-0.7 + i * 0.35, 0.06, 0]}>
            <mesh>
              <boxGeometry args={[0.12, 0.06, 0.1]} />
              <meshStandardMaterial color={COLORS.primary} transparent opacity={0.7} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

// Industrial Robot - Technical style
function IndustrialRobot({ position }: { position: [number, number, number] }) {
  const joint1Ref = useRef<Group>(null);
  const joint2Ref = useRef<Group>(null);
  const joint3Ref = useRef<Group>(null);
  
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (joint1Ref.current) {
      joint1Ref.current.rotation.y = Math.sin(t * 0.35) * 0.5;
    }
    if (joint2Ref.current) {
      joint2Ref.current.rotation.z = -0.25 + Math.sin(t * 0.45 + 1) * 0.25;
    }
    if (joint3Ref.current) {
      joint3Ref.current.rotation.z = Math.sin(t * 0.55 + 2) * 0.35;
    }
  });

  return (
    <group position={position}>
      {/* Base - wireframe */}
      <mesh position={[0, 0.04, 0]}>
        <cylinderGeometry args={[0.15, 0.18, 0.08, 20]} />
        <meshStandardMaterial color={COLORS.wireframe} wireframe transparent opacity={0.6} />
      </mesh>
      <mesh position={[0, 0.09, 0]}>
        <cylinderGeometry args={[0.12, 0.14, 0.02, 20]} />
        <meshStandardMaterial color={COLORS.secondary} metalness={0.6} roughness={0.3} />
      </mesh>
      
      {/* J1 - Base rotation */}
      <group ref={joint1Ref} position={[0, 0.1, 0]}>
        <mesh position={[0, 0.12, 0]}>
          <boxGeometry args={[0.1, 0.2, 0.1]} />
          <meshStandardMaterial color={COLORS.secondary} wireframe transparent opacity={0.7} />
        </mesh>
        
        {/* J2 - Shoulder */}
        <group ref={joint2Ref} position={[0, 0.23, 0]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.045, 0.045, 0.1, 14]} />
            <meshStandardMaterial color={COLORS.dark} metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.15, 0]}>
            <boxGeometry args={[0.06, 0.25, 0.06]} />
            <meshStandardMaterial color={COLORS.primary} wireframe transparent opacity={0.8} />
          </mesh>
          
          {/* J3 - Elbow */}
          <group ref={joint3Ref} position={[0, 0.28, 0]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.03, 0.03, 0.08, 12]} />
              <meshStandardMaterial color={COLORS.dark} metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[0, 0.1, 0]}>
              <boxGeometry args={[0.05, 0.16, 0.05]} />
              <meshStandardMaterial color={COLORS.primary} wireframe transparent opacity={0.8} />
            </mesh>
            {/* End effector */}
            <group position={[0, 0.2, 0]}>
              <mesh>
                <cylinderGeometry args={[0.025, 0.03, 0.04, 10]} />
                <meshStandardMaterial color={COLORS.dark} metalness={0.85} roughness={0.15} />
              </mesh>
              <mesh position={[0.02, -0.03, 0]}>
                <boxGeometry args={[0.012, 0.05, 0.015]} />
                <meshStandardMaterial color={COLORS.secondary} metalness={0.7} roughness={0.3} />
              </mesh>
              <mesh position={[-0.02, -0.03, 0]}>
                <boxGeometry args={[0.012, 0.05, 0.015]} />
                <meshStandardMaterial color={COLORS.secondary} metalness={0.7} roughness={0.3} />
              </mesh>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

// Technical Worker Silhouette - Blueprint style
function TechnicalWorker({ position, rotation = 0 }: { position: [number, number, number]; rotation?: number }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Head - simple sphere */}
      <mesh position={[0, 0.38, 0]}>
        <sphereGeometry args={[0.045, 10, 10]} />
        <meshStandardMaterial color={COLORS.primary} transparent opacity={0.8} />
      </mesh>
      {/* Hard hat brim */}
      <mesh position={[0, 0.41, 0]}>
        <cylinderGeometry args={[0.055, 0.055, 0.015, 12]} />
        <meshStandardMaterial color={COLORS.secondary} />
      </mesh>
      {/* Body - wireframe */}
      <mesh position={[0, 0.18, 0]}>
        <cylinderGeometry args={[0.04, 0.055, 0.22, 8]} />
        <meshStandardMaterial color={COLORS.secondary} wireframe transparent opacity={0.7} />
      </mesh>
      {/* Legs - wireframe */}
      <mesh position={[-0.025, -0.05, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.18, 6]} />
        <meshStandardMaterial color={COLORS.wireframe} wireframe transparent opacity={0.6} />
      </mesh>
      <mesh position={[0.025, -0.05, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.18, 6]} />
        <meshStandardMaterial color={COLORS.wireframe} wireframe transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

// Pipe system - Technical blueprint style
function PipeSystem({ position }: { position: [number, number, number] }) {
  const valveRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (valveRef.current) {
      valveRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.15;
    }
  });

  return (
    <group position={position}>
      {/* Main pipe - wireframe */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.03, 0.03, 1.2, 14]} />
        <meshStandardMaterial color={COLORS.wireframe} wireframe transparent opacity={0.5} />
      </mesh>
      {/* Vertical section */}
      <mesh position={[0.4, -0.2, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.4, 14]} />
        <meshStandardMaterial color={COLORS.wireframe} wireframe transparent opacity={0.5} />
      </mesh>
      {/* Elbow */}
      <mesh position={[0.4, 0, 0]}>
        <torusGeometry args={[0.06, 0.03, 8, 10, Math.PI / 2]} />
        <meshStandardMaterial color={COLORS.wireframe} wireframe transparent opacity={0.5} />
      </mesh>
      {/* Valve */}
      <group position={[-0.15, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[0.045, 0.045, 0.06, 10]} />
          <meshStandardMaterial color={COLORS.secondary} metalness={0.6} roughness={0.4} />
        </mesh>
        <mesh ref={valveRef} position={[0, 0.05, 0]}>
          <cylinderGeometry args={[0.012, 0.015, 0.08, 8]} />
          <meshStandardMaterial color={COLORS.primary} metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.1, 0]}>
          <torusGeometry args={[0.025, 0.006, 8, 14]} />
          <meshStandardMaterial color={COLORS.primary} metalness={0.7} roughness={0.3} />
        </mesh>
      </group>
    </group>
  );
}

// Control Cabinet - Technical style
function ControlCabinet({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Cabinet body - wireframe */}
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[0.35, 0.7, 0.22]} />
        <meshStandardMaterial color={COLORS.wireframe} wireframe transparent opacity={0.5} />
      </mesh>
      {/* Door panel */}
      <mesh position={[0, 0.35, 0.112]}>
        <boxGeometry args={[0.32, 0.66, 0.01]} />
        <meshStandardMaterial color={COLORS.light} metalness={0.5} roughness={0.3} transparent opacity={0.6} />
      </mesh>
      {/* Status indicators */}
      {[0.55, 0.45, 0.35].map((y, i) => (
        <mesh key={i} position={[-0.1, y, 0.12]}>
          <sphereGeometry args={[0.012, 10, 10]} />
          <meshStandardMaterial 
            color={i === 0 ? COLORS.secondary : COLORS.primary} 
            emissive={i === 0 ? COLORS.secondary : COLORS.primary} 
            emissiveIntensity={i === 0 ? 0.5 : 0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

// Scanning effect - Technical laser
function ScanningLaser({ position }: { position: [number, number, number] }) {
  const laserRef = useRef<Group>(null);
  
  useFrame((state) => {
    if (laserRef.current) {
      laserRef.current.rotation.y = state.clock.elapsedTime * 1.5;
    }
  });

  return (
    <group position={position}>
      <mesh>
        <cylinderGeometry args={[0.05, 0.06, 0.08, 14]} />
        <meshStandardMaterial color={COLORS.dark} metalness={0.8} roughness={0.2} />
      </mesh>
      <group ref={laserRef}>
        <mesh position={[0, -0.4, 0]}>
          <cylinderGeometry args={[0.002, 0.002, 0.75, 6]} />
          <meshStandardMaterial color={COLORS.primary} emissive={COLORS.primary} emissiveIntensity={1.5} transparent opacity={0.7} />
        </mesh>
      </group>
    </group>
  );
}

// Main factory - Blueprint/CAD aesthetic
function Factory() {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.035;
    }
  });

  return (
    <Float speed={0.6} rotationIntensity={0.02} floatIntensity={0.1}>
      <group ref={groupRef} scale={1}>
        
        {/* === FLOOR GRID - Blueprint style === */}
        <mesh position={[0, -0.52, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[5.5, 5.5, 28, 28]} />
          <meshBasicMaterial color={COLORS.secondary} wireframe transparent opacity={0.15} />
        </mesh>
        
        {/* === PRODUCTION FLOOR - Wireframe base === */}
        <mesh position={[0, -0.5, 0]}>
          <boxGeometry args={[4.5, 0.04, 3.5]} />
          <meshStandardMaterial color={COLORS.wireframe} wireframe transparent opacity={0.3} />
        </mesh>
        
        {/* === CNC MACHINES === */}
        <CNCMachine position={[-1.4, -0.48, -0.9]} />
        <CNCMachine position={[-1.4, -0.48, 0.4]} />
        
        {/* === ASSEMBLY LINE === */}
        <AssemblyLine position={[0.4, -0.15, 0]} />
        
        {/* === INDUSTRIAL ROBOTS === */}
        <IndustrialRobot position={[0, -0.48, -1.1]} />
        <IndustrialRobot position={[1.1, -0.48, -1.1]} />
        
        {/* === QUALITY INSPECTION === */}
        <InspectionStation position={[1.6, -0.38, 0.7]} />
        
        {/* === WORKERS - Technical silhouettes === */}
        <TechnicalWorker position={[-0.4, -0.25, 0.7]} rotation={-0.4} />
        <TechnicalWorker position={[1.3, -0.25, 0.25]} rotation={2.3} />
        <TechnicalWorker position={[-1.6, -0.25, -0.1]} rotation={0.8} />
        <TechnicalWorker position={[0.6, -0.25, -0.7]} rotation={-1.2} />
        
        {/* === PIPE SYSTEMS === */}
        <PipeSystem position={[-1.8, 0.4, -0.4]} />
        <PipeSystem position={[1.8, 0.25, -0.1]} />
        
        {/* === CONTROL CABINETS === */}
        <ControlCabinet position={[-2, -0.48, 1]} />
        <ControlCabinet position={[2, -0.48, -1.1]} />
        
        {/* === OVERHEAD STRUCTURE - Wireframe crane === */}
        <group position={[0, 1.3, 0]}>
          {/* Rails */}
          <mesh position={[0, 0, -1.3]}>
            <boxGeometry args={[4.2, 0.06, 0.08]} />
            <meshStandardMaterial color={COLORS.secondary} wireframe transparent opacity={0.6} />
          </mesh>
          <mesh position={[0, 0, 1.3]}>
            <boxGeometry args={[4.2, 0.06, 0.08]} />
            <meshStandardMaterial color={COLORS.secondary} wireframe transparent opacity={0.6} />
          </mesh>
          {/* Bridge */}
          <mesh position={[0, -0.04, 0]}>
            <boxGeometry args={[0.12, 0.12, 2.6]} />
            <meshStandardMaterial color={COLORS.secondary} wireframe transparent opacity={0.7} />
          </mesh>
          {/* Hoist */}
          <mesh position={[0, -0.15, 0]}>
            <boxGeometry args={[0.15, 0.12, 0.15]} />
            <meshStandardMaterial color={COLORS.primary} transparent opacity={0.8} />
          </mesh>
          {/* Cable */}
          <mesh position={[0, -0.5, 0]}>
            <cylinderGeometry args={[0.006, 0.006, 0.6, 6]} />
            <meshStandardMaterial color={COLORS.dark} />
          </mesh>
          {/* Hook */}
          <mesh position={[0, -0.82, 0]}>
            <torusGeometry args={[0.03, 0.008, 8, 14, Math.PI * 1.5]} />
            <meshStandardMaterial color={COLORS.primary} metalness={0.7} roughness={0.3} />
          </mesh>
        </group>
        
        {/* === SCANNING LASER === */}
        <ScanningLaser position={[1.3, 0.7, 0.7]} />
        
        {/* === DIMENSION LINES - CAD style === */}
        <DimensionLine start={[-2.2, -0.48, 1.7]} end={[2.2, -0.48, 1.7]} offset={0.15} />
        <DimensionLine start={[-2.2, -0.48, -1.7]} end={[-2.2, -0.48, 1.7]} offset={0.15} />
        
        {/* === AUDIT CHECKPOINT MARKERS === */}
        {[
          [-2, -0.48, 1.5],
          [2, -0.48, 1.5],
          [-2, -0.48, -1.5],
          [2, -0.48, -1.5],
          [0, -0.48, 1.5],
        ].map((pos, i) => (
          <group key={i} position={pos as [number, number, number]}>
            <mesh>
              <cylinderGeometry args={[0.05, 0.05, 0.015, 20]} />
              <meshStandardMaterial color={COLORS.primary} metalness={0.6} roughness={0.4} />
            </mesh>
            <mesh position={[0, 0.015, 0]}>
              <sphereGeometry args={[0.028, 14, 14]} />
              <meshStandardMaterial color={COLORS.primary} emissive={COLORS.primary} emissiveIntensity={0.4} />
            </mesh>
          </group>
        ))}
        
        {/* === STORAGE AREA - Wireframe === */}
        <group position={[1.8, -0.48, 0.4]}>
          <mesh position={[0, 0.015, 0]}>
            <boxGeometry args={[0.35, 0.03, 0.35]} />
            <meshStandardMaterial color={COLORS.wireframe} wireframe transparent opacity={0.5} />
          </mesh>
          {[[0, 0.1, 0], [0, 0.2, 0], [-0.06, 0.1, 0.06]].map((pos, i) => (
            <mesh key={i} position={pos as [number, number, number]}>
              <boxGeometry args={[0.12, 0.08, 0.12]} />
              <meshStandardMaterial color={i % 2 === 0 ? COLORS.secondary : COLORS.primary} wireframe transparent opacity={0.7} />
            </mesh>
          ))}
        </group>
        
      </group>
    </Float>
  );
}

export function AnimatedFactory3D() {
  return (
    <div className="absolute inset-0 z-[2] pointer-events-none" style={{ opacity: 0.8 }}>
      <Canvas
        camera={{ position: [4, 2.5, 4], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          {/* Stronger lighting for visibility */}
          <ambientLight intensity={0.8} />
          <directionalLight position={[10, 10, 8]} intensity={1.5} />
          <directionalLight position={[-8, 5, -8]} intensity={0.6} />
          <pointLight position={[0, 4, 0]} intensity={0.5} color="#ffffff" />
          
          <Environment preset="city" />
          
          <Factory />
        </Suspense>
      </Canvas>
    </div>
  );
}

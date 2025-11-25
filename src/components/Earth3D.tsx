import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Sphere, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import worldMapGlobe from '@/assets/world-map-globe.png';

// Location pins data with lat/long coordinates
const locationPins3D = [
  { id: 1, lat: 40, lon: -100, visible: true },  // USA - Central
  { id: 2, lat: 50, lon: 10, visible: true },    // Germany
  { id: 3, lat: 35, lon: 105, visible: true },   // China - Central
  { id: 4, lat: -15, lon: -60, visible: true },  // Brazil
  { id: 5, lat: 0, lon: 20, visible: true },     // Central Africa
  { id: 6, lat: 55, lon: 38, visible: true },    // Russia - Moscow
  { id: 7, lat: 28, lon: 77, visible: true },    // India - Delhi
  { id: 8, lat: 35, lon: 139, visible: true },   // Japan - Tokyo
  { id: 9, lat: -25, lon: 135, visible: true },  // Australia - Central
  { id: 10, lat: 19, lon: -99, visible: true },  // Mexico
  { id: 11, lat: -34, lon: -64, visible: true }, // Argentina
  { id: 12, lat: 51, lon: -0.1, visible: true }, // UK - London
  { id: 13, lat: 41, lon: 12, visible: true },   // Italy - Rome
  { id: 14, lat: 30, lon: 31, visible: true },   // Egypt - Cairo
  { id: 15, lat: -1, lon: 37, visible: true },   // Kenya
  { id: 16, lat: -33, lon: 18, visible: true },  // South Africa
  { id: 17, lat: 45, lon: -75, visible: true },  // Canada - Ottawa
  { id: 18, lat: 25, lon: 55, visible: true },   // UAE - Dubai
  { id: 19, lat: 13, lon: 100, visible: true },  // Thailand - Bangkok
  { id: 21, lat: 48, lon: 2, visible: true },    // France - Paris
  { id: 22, lat: 40, lon: -4, visible: true },   // Spain - Madrid
  { id: 23, lat: 52, lon: 21, visible: true },   // Poland - Warsaw
  { id: 24, lat: 59, lon: 18, visible: true },   // Sweden - Stockholm
  { id: 26, lat: 47, lon: 8, visible: true },    // Switzerland - Zurich
  { id: 27, lat: 50, lon: 14, visible: true },   // Czech Republic - Prague
  { id: 28, lat: 47, lon: 19, visible: true },   // Hungary - Budapest
  { id: 29, lat: 38, lon: 23, visible: true },   // Greece - Athens
  { id: 30, lat: 41, lon: 29, visible: true },   // Turkey - Istanbul
  { id: 31, lat: 37, lon: -122, visible: true }, // USA - San Francisco
  { id: 32, lat: 34, lon: -118, visible: true }, // USA - Los Angeles
  { id: 33, lat: 41, lon: -87, visible: true },  // USA - Chicago
  { id: 34, lat: 30, lon: -95, visible: true },  // USA - Houston
  { id: 35, lat: 49, lon: -123, visible: true }, // Canada - Vancouver
  { id: 36, lat: 43, lon: -79, visible: true },  // Canada - Toronto
  { id: 37, lat: 31, lon: 121, visible: true },  // China - Shanghai
  { id: 38, lat: 22, lon: 114, visible: true },  // China - Hong Kong
  { id: 39, lat: 1, lon: 103, visible: true },   // Singapore
  { id: 40, lat: -6, lon: 106, visible: true },  // Indonesia - Jakarta
];

// Convert lat/lon to 3D coordinates
const latLonToVector3 = (lat: number, lon: number, radius: number) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
};

// 3D Pin Component
const Pin3D = ({ position, visible }: { position: THREE.Vector3; visible: boolean }) => {
  const pinRef = useRef<THREE.Group>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    if (visible) {
      setScale(1);
    } else {
      setScale(0);
    }
  }, [visible]);

  useEffect(() => {
    // Orient pin to point outward from globe center (once, not every frame)
    if (pinRef.current) {
      pinRef.current.lookAt(0, 0, 0);
      pinRef.current.rotateY(Math.PI);
    }
  }, []);

  return (
    <group ref={pinRef} position={position} scale={scale}>
      {/* Pin body */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.2, 16]} />
        <meshStandardMaterial color="#A8C5B8" />
      </mesh>
      
      {/* Pin head */}
      <mesh position={[0, 0.22, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#A8C5B8" emissive="#A8C5B8" emissiveIntensity={0.3} />
      </mesh>

      {/* White circle inside pin head */}
      <mesh position={[0, 0.22, 0.075]}>
        <circleGeometry args={[0.05, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* User icon (simplified) */}
      <mesh position={[0, 0.26, 0.08]}>
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshBasicMaterial color="#A8C5B8" />
      </mesh>
      <mesh position={[0, 0.2, 0.08]}>
        <cylinderGeometry args={[0.03, 0.035, 0.04, 16]} />
        <meshBasicMaterial color="#A8C5B8" />
      </mesh>

      {/* Pin pointer */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <coneGeometry args={[0.05, 0.1, 16]} />
        <meshStandardMaterial color="#96B5AD" />
      </mesh>
    </group>
  );
};

const EarthSphere = ({ showPins, visiblePins }: { showPins: boolean; visiblePins: number[] }) => {
  const groupRef = useRef<THREE.Group>(null);
  const texture = useLoader(THREE.TextureLoader, worldMapGlobe);

  // Rotate the earth smoothly
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001; // Smooth rotation
    }
  });

  return (
    <>
      <group ref={groupRef}>
        {/* Main Earth with clean dotted map texture */}
        <Sphere args={[2.875, 128, 128]}>
          <meshStandardMaterial
            map={texture}
            roughness={0.6}
            metalness={0.2}
          />
        </Sphere>

        {/* 3D Pins attached to globe */}
        {showPins && locationPins3D.map((pin) => (
          <Pin3D
            key={pin.id}
            position={latLonToVector3(pin.lat, pin.lon, 2.875)}
            visible={visiblePins.includes(pin.id)}
          />
        ))}
      </group>
    </>
  );
};

const Earth3D = ({ width = "100%", height = "400px", showPins = false }: { width?: string; height?: string; showPins?: boolean }) => {
  const [visiblePins, setVisiblePins] = useState<number[]>([]);

  useEffect(() => {
    if (!showPins) return;

    let currentIndex = 0;
    const pinSequence: number[] = [];

    const interval = setInterval(() => {
      if (pinSequence.length < locationPins3D.length) {
        // Add a new pin
        pinSequence.push(locationPins3D[currentIndex].id);
        setVisiblePins([...pinSequence]);
        currentIndex++;
      } else {
        // Start removing pins one by one
        pinSequence.shift();
        setVisiblePins([...pinSequence]);
        
        // Reset when all pins are removed
        if (pinSequence.length === 0) {
          currentIndex = 0;
        }
      }
    }, 800); // Show/hide one pin every 0.8 seconds (faster animation)

    return () => clearInterval(interval);
  }, [showPins]);

  return (
    <div style={{ width, height, position: 'relative', overflow: 'visible' }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ 
          alpha: true, 
          antialias: true
        }}
      >
        {/* Clean lighting setup */}
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 3, 5]} intensity={2} color="#ffffff" />
        
        {/* The Earth with dotted map and 3D pins */}
        <EarthSphere showPins={showPins} visiblePins={visiblePins} />
        
        {/* Allow manual rotation */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.15}
        />
      </Canvas>
    </div>
  );
};

export default Earth3D;

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Sphere, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import worldMapGlobe from '@/assets/world-map-globe.png';

// Location pins data with lat/long coordinates - 120+ pins
const locationPins3D = [
  // EUROPE (40 pins)
  { id: 1, lat: 51.5, lon: -0.1, visible: true },   // UK - London
  { id: 2, lat: 55.75, lon: 37.6, visible: true },  // Russia - Moscow
  { id: 3, lat: 48.85, lon: 2.35, visible: true },  // France - Paris
  { id: 4, lat: 52.52, lon: 13.4, visible: true },  // Germany - Berlin
  { id: 5, lat: 41.9, lon: 12.5, visible: true },   // Italy - Rome
  { id: 6, lat: 40.4, lon: -3.7, visible: true },   // Spain - Madrid
  { id: 7, lat: 52.37, lon: 4.9, visible: true },   // Netherlands - Amsterdam
  { id: 8, lat: 50.85, lon: 4.35, visible: true },  // Belgium - Brussels
  { id: 9, lat: 59.33, lon: 18.07, visible: true }, // Sweden - Stockholm
  { id: 10, lat: 60.17, lon: 24.94, visible: true }, // Finland - Helsinki
  { id: 11, lat: 59.91, lon: 10.75, visible: true }, // Norway - Oslo
  { id: 12, lat: 55.68, lon: 12.57, visible: true }, // Denmark - Copenhagen
  { id: 13, lat: 50.08, lon: 14.43, visible: true }, // Czech Republic - Prague
  { id: 14, lat: 48.21, lon: 16.37, visible: true }, // Austria - Vienna
  { id: 15, lat: 47.37, lon: 8.54, visible: true },  // Switzerland - Zurich
  { id: 16, lat: 52.23, lon: 21.01, visible: true }, // Poland - Warsaw
  { id: 17, lat: 47.5, lon: 19.04, visible: true },  // Hungary - Budapest
  { id: 18, lat: 44.43, lon: 26.1, visible: true },  // Romania - Bucharest
  { id: 19, lat: 42.7, lon: 23.32, visible: true },  // Bulgaria - Sofia
  { id: 20, lat: 38.72, lon: -9.14, visible: true }, // Portugal - Lisbon
  { id: 21, lat: 38.0, lon: 23.73, visible: true },  // Greece - Athens
  { id: 22, lat: 53.35, lon: -6.26, visible: true }, // Ireland - Dublin
  { id: 23, lat: 64.13, lon: -21.9, visible: true }, // Iceland - Reykjavik
  { id: 24, lat: 45.46, lon: 9.19, visible: true },  // Italy - Milan
  { id: 25, lat: 41.38, lon: 2.17, visible: true },  // Spain - Barcelona
  { id: 26, lat: 50.11, lon: 8.68, visible: true },  // Germany - Frankfurt
  { id: 27, lat: 48.13, lon: 11.58, visible: true }, // Germany - Munich
  { id: 28, lat: 43.3, lon: 5.4, visible: true },    // France - Marseille
  { id: 29, lat: 45.76, lon: 4.84, visible: true },  // France - Lyon
  { id: 30, lat: 53.48, lon: -2.24, visible: true }, // UK - Manchester
  { id: 31, lat: 55.95, lon: -3.19, visible: true }, // UK - Edinburgh
  { id: 32, lat: 59.43, lon: 24.75, visible: true }, // Estonia - Tallinn
  { id: 33, lat: 56.95, lon: 24.11, visible: true }, // Latvia - Riga
  { id: 34, lat: 54.69, lon: 25.28, visible: true }, // Lithuania - Vilnius
  { id: 35, lat: 45.44, lon: 12.32, visible: true }, // Italy - Venice
  { id: 36, lat: 50.45, lon: 30.52, visible: true }, // Ukraine - Kyiv
  { id: 37, lat: 49.84, lon: 24.03, visible: true }, // Ukraine - Lviv
  { id: 38, lat: 44.81, lon: 20.46, visible: true }, // Serbia - Belgrade
  { id: 39, lat: 45.81, lon: 15.98, visible: true }, // Croatia - Zagreb
  { id: 40, lat: 46.05, lon: 14.51, visible: true }, // Slovenia - Ljubljana

  // ASIA - CHINA (15 pins)
  { id: 41, lat: 39.9, lon: 116.4, visible: true },  // Beijing
  { id: 42, lat: 31.23, lon: 121.47, visible: true }, // Shanghai
  { id: 43, lat: 23.13, lon: 113.26, visible: true }, // Guangzhou
  { id: 44, lat: 22.54, lon: 114.06, visible: true }, // Shenzhen
  { id: 45, lat: 30.57, lon: 114.27, visible: true }, // Wuhan
  { id: 46, lat: 30.67, lon: 104.07, visible: true }, // Chengdu
  { id: 47, lat: 29.56, lon: 106.55, visible: true }, // Chongqing
  { id: 48, lat: 34.34, lon: 108.94, visible: true }, // Xi'an
  { id: 49, lat: 36.67, lon: 117.0, visible: true },  // Jinan
  { id: 50, lat: 31.86, lon: 117.28, visible: true }, // Hefei
  { id: 51, lat: 32.06, lon: 118.78, visible: true }, // Nanjing
  { id: 52, lat: 30.29, lon: 120.16, visible: true }, // Hangzhou
  { id: 53, lat: 22.28, lon: 114.16, visible: true }, // Hong Kong
  { id: 54, lat: 43.88, lon: 125.32, visible: true }, // Changchun
  { id: 55, lat: 38.04, lon: 114.48, visible: true }, // Shijiazhuang

  // ASIA - FAR EAST & OTHER (15 pins)
  { id: 56, lat: 35.68, lon: 139.65, visible: true }, // Japan - Tokyo
  { id: 57, lat: 34.69, lon: 135.5, visible: true },  // Japan - Osaka
  { id: 58, lat: 37.57, lon: 126.98, visible: true }, // South Korea - Seoul
  { id: 59, lat: 35.18, lon: 129.08, visible: true }, // South Korea - Busan
  { id: 60, lat: 13.75, lon: 100.52, visible: true }, // Thailand - Bangkok
  { id: 61, lat: 1.35, lon: 103.82, visible: true },  // Singapore
  { id: 62, lat: -6.21, lon: 106.85, visible: true }, // Indonesia - Jakarta
  { id: 63, lat: 14.6, lon: 121.0, visible: true },   // Philippines - Manila
  { id: 64, lat: 3.14, lon: 101.69, visible: true },  // Malaysia - Kuala Lumpur
  { id: 65, lat: 10.76, lon: 106.66, visible: true }, // Vietnam - Ho Chi Minh
  { id: 66, lat: 21.03, lon: 105.85, visible: true }, // Vietnam - Hanoi
  { id: 67, lat: 28.7, lon: 77.1, visible: true },    // India - Delhi
  { id: 68, lat: 19.08, lon: 72.88, visible: true },  // India - Mumbai
  { id: 69, lat: 12.97, lon: 77.59, visible: true },  // India - Bangalore
  { id: 70, lat: 25.27, lon: 55.3, visible: true },   // UAE - Dubai

  // AFRICA (20 pins)
  { id: 71, lat: 30.04, lon: 31.24, visible: true },  // Egypt - Cairo
  { id: 72, lat: 31.63, lon: -8.0, visible: true },   // Morocco - Marrakech
  { id: 73, lat: 33.97, lon: -6.85, visible: true },  // Morocco - Rabat
  { id: 74, lat: 36.74, lon: 3.06, visible: true },   // Algeria - Algiers
  { id: 75, lat: 36.8, lon: 10.18, visible: true },   // Tunisia - Tunis
  { id: 76, lat: 6.52, lon: 3.38, visible: true },    // Nigeria - Lagos
  { id: 77, lat: 9.08, lon: 7.53, visible: true },    // Nigeria - Abuja
  { id: 78, lat: -1.29, lon: 36.82, visible: true },  // Kenya - Nairobi
  { id: 79, lat: -6.79, lon: 39.27, visible: true },  // Tanzania - Dar es Salaam
  { id: 80, lat: 0.35, lon: 32.58, visible: true },   // Uganda - Kampala
  { id: 81, lat: -26.2, lon: 28.04, visible: true },  // South Africa - Johannesburg
  { id: 82, lat: -33.93, lon: 18.42, visible: true }, // South Africa - Cape Town
  { id: 83, lat: -17.83, lon: 31.05, visible: true }, // Zimbabwe - Harare
  { id: 84, lat: -15.42, lon: 28.29, visible: true }, // Zambia - Lusaka
  { id: 85, lat: 15.59, lon: 32.53, visible: true },  // Sudan - Khartoum
  { id: 86, lat: 9.03, lon: 38.74, visible: true },   // Ethiopia - Addis Ababa
  { id: 87, lat: -4.04, lon: 39.67, visible: true },  // Kenya - Mombasa
  { id: 88, lat: 5.56, lon: -0.2, visible: true },    // Ghana - Accra
  { id: 89, lat: 6.45, lon: 3.4, visible: true },     // Benin - Cotonou
  { id: 90, lat: 14.69, lon: -17.45, visible: true }, // Senegal - Dakar

  // NORTH AMERICA - USA (15 pins)
  { id: 91, lat: 40.71, lon: -74.01, visible: true }, // New York
  { id: 92, lat: 34.05, lon: -118.24, visible: true }, // Los Angeles
  { id: 93, lat: 41.88, lon: -87.63, visible: true }, // Chicago
  { id: 94, lat: 29.76, lon: -95.37, visible: true }, // Houston
  { id: 95, lat: 33.45, lon: -112.07, visible: true }, // Phoenix
  { id: 96, lat: 39.95, lon: -75.17, visible: true }, // Philadelphia
  { id: 97, lat: 29.42, lon: -98.49, visible: true }, // San Antonio
  { id: 98, lat: 32.78, lon: -96.8, visible: true },  // Dallas
  { id: 99, lat: 37.77, lon: -122.42, visible: true }, // San Francisco
  { id: 100, lat: 47.61, lon: -122.33, visible: true }, // Seattle
  { id: 101, lat: 25.76, lon: -80.19, visible: true }, // Miami
  { id: 102, lat: 42.36, lon: -71.06, visible: true }, // Boston
  { id: 103, lat: 33.75, lon: -84.39, visible: true }, // Atlanta
  { id: 104, lat: 38.91, lon: -77.04, visible: true }, // Washington DC
  { id: 105, lat: 36.17, lon: -115.14, visible: true }, // Las Vegas

  // NORTH AMERICA - CANADA (8 pins)
  { id: 106, lat: 43.65, lon: -79.38, visible: true }, // Toronto
  { id: 107, lat: 45.5, lon: -73.57, visible: true },  // Montreal
  { id: 108, lat: 49.28, lon: -123.12, visible: true }, // Vancouver
  { id: 109, lat: 45.42, lon: -75.7, visible: true },  // Ottawa
  { id: 110, lat: 51.05, lon: -114.07, visible: true }, // Calgary
  { id: 111, lat: 53.55, lon: -113.47, visible: true }, // Edmonton
  { id: 112, lat: 43.47, lon: -80.52, visible: true }, // Kitchener
  { id: 113, lat: 49.9, lon: -97.14, visible: true },  // Winnipeg

  // SOUTH AMERICA (12 pins)
  { id: 114, lat: -23.55, lon: -46.63, visible: true }, // Brazil - São Paulo
  { id: 115, lat: -22.91, lon: -43.17, visible: true }, // Brazil - Rio de Janeiro
  { id: 116, lat: -15.78, lon: -47.93, visible: true }, // Brazil - Brasília
  { id: 117, lat: -34.6, lon: -58.38, visible: true },  // Argentina - Buenos Aires
  { id: 118, lat: -33.45, lon: -70.67, visible: true }, // Chile - Santiago
  { id: 119, lat: -12.05, lon: -77.03, visible: true }, // Peru - Lima
  { id: 120, lat: 4.71, lon: -74.07, visible: true },   // Colombia - Bogotá
  { id: 121, lat: 10.48, lon: -66.9, visible: true },   // Venezuela - Caracas
  { id: 122, lat: -0.23, lon: -78.52, visible: true },  // Ecuador - Quito
  { id: 123, lat: -16.5, lon: -68.15, visible: true },  // Bolivia - La Paz
  { id: 124, lat: -25.26, lon: -57.58, visible: true }, // Paraguay - Asunción
  { id: 125, lat: -34.9, lon: -56.16, visible: true },  // Uruguay - Montevideo

  // AUSTRALIA & OCEANIA (8 pins)
  { id: 126, lat: -33.87, lon: 151.21, visible: true }, // Australia - Sydney
  { id: 127, lat: -37.81, lon: 144.96, visible: true }, // Australia - Melbourne
  { id: 128, lat: -27.47, lon: 153.03, visible: true }, // Australia - Brisbane
  { id: 129, lat: -31.95, lon: 115.86, visible: true }, // Australia - Perth
  { id: 130, lat: -35.28, lon: 149.13, visible: true }, // Australia - Canberra
  { id: 131, lat: -41.29, lon: 174.78, visible: true }, // New Zealand - Wellington
  { id: 132, lat: -36.85, lon: 174.76, visible: true }, // New Zealand - Auckland
  { id: 133, lat: -43.53, lon: 172.64, visible: true }, // New Zealand - Christchurch
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
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.3, 16]} />
        <meshStandardMaterial color="#14B8A6" />
      </mesh>
      
      {/* Pin head */}
      <mesh position={[0, 0.35, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#14B8A6" emissive="#14B8A6" emissiveIntensity={0.3} />
      </mesh>

      {/* White circle inside pin head */}
      <mesh position={[0, 0.35, 0.11]}>
        <circleGeometry args={[0.08, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* User icon (simplified) */}
      <mesh position={[0, 0.4, 0.12]}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshBasicMaterial color="#14B8A6" />
      </mesh>
      <mesh position={[0, 0.32, 0.12]}>
        <cylinderGeometry args={[0.04, 0.05, 0.06, 16]} />
        <meshBasicMaterial color="#14B8A6" />
      </mesh>

      {/* Pin pointer */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <coneGeometry args={[0.08, 0.15, 16]} />
        <meshStandardMaterial color="#0D9488" />
      </mesh>
    </group>
  );
};

const EarthSphere = ({ showPins, visiblePins }: { showPins: boolean; visiblePins: number[] }) => {
  const groupRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(THREE.TextureLoader, worldMapGlobe);

  // Rotate the earth with pulsing glow animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001; // Smooth rotation
    }
    if (glowRef.current) {
      // Subtle pulsing glow effect
      const pulse = Math.sin(state.clock.elapsedTime * 0.5) * 0.05 + 0.25;
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = pulse;
    }
  });

  return (
    <>
      <group ref={groupRef}>
        {/* Main Earth with high-contrast dotted map texture */}
        <Sphere args={[2.875, 128, 128]}>
          <meshStandardMaterial
            map={texture}
            emissive="#2563eb"
            emissiveIntensity={0.7}
            roughness={0.6}
            metalness={0.3}
            toneMapped={false}
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
      
      {/* Animated outer glow sphere */}
      <Sphere ref={glowRef} args={[3.15, 64, 64]}>
        <meshBasicMaterial
          color="#3b82f6"
          transparent
          opacity={0.25}
          side={THREE.BackSide}
          toneMapped={false}
        />
      </Sphere>

      {/* Inner subtle glow */}
      <Sphere args={[2.95, 64, 64]}>
        <meshBasicMaterial
          color="#60a5fa"
          transparent
          opacity={0.1}
          side={THREE.FrontSide}
        />
      </Sphere>
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
    }, 2500); // Show/hide one pin every 2.5 seconds (slower motion)

    return () => clearInterval(interval);
  }, [showPins]);

  return (
    <div style={{ width, height, position: 'relative', overflow: 'visible' }}>
      {/* Enhanced animated background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div 
          className="w-[90%] h-[90%] rounded-full bg-blue-600/30 blur-3xl animate-pulse"
          style={{ animationDuration: '4s' }}
        />
        <div 
          className="absolute w-[70%] h-[70%] rounded-full bg-blue-400/20 blur-2xl animate-pulse"
          style={{ animationDuration: '3s', animationDelay: '1s' }}
        />
      </div>
      
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ 
          alpha: true, 
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2
        }}
      >
        {/* Enhanced lighting for better contrast */}
        <ambientLight intensity={1.2} />
        
        {/* Strong directional light to simulate sun */}
        <directionalLight position={[5, 3, 5]} intensity={3} color="#ffffff" />
        
        {/* High-contrast blue accent lights */}
        <pointLight position={[-5, 0, 5]} intensity={2.5} color="#2563eb" />
        <pointLight position={[5, 0, 5]} intensity={2.5} color="#3b82f6" />
        <pointLight position={[0, 5, 0]} intensity={1.5} color="#60a5fa" />
        
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

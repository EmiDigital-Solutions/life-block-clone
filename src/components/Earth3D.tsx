import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Sphere, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin } from 'lucide-react';
import worldMapGlobe from '@/assets/world-map-globe.png';

const EarthSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(THREE.TextureLoader, worldMapGlobe);

  // Rotate the earth realistically
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0008; // Slower realistic rotation
    }
  });

  return (
    <>
      {/* Main Earth with dotted map texture */}
      <Sphere ref={meshRef} args={[2.875, 64, 64]}>
        <meshStandardMaterial
          map={texture}
          emissive="#3b82f6"
          emissiveIntensity={0.4}
          roughness={0.8}
          metalness={0.1}
        />
      </Sphere>
      
      {/* Outer glow sphere */}
      <Sphere args={[3.1, 32, 32]}>
        <meshBasicMaterial
          color="#60a5fa"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </Sphere>
    </>
  );
};

// Location pins data - positioned around the globe
const locationPins = [
  { id: 1, top: '25%', left: '20%' },  // North America
  { id: 2, top: '35%', left: '50%' },  // Europe
  { id: 3, top: '45%', left: '75%' },  // Asia
  { id: 4, top: '60%', left: '30%' },  // South America
  { id: 5, top: '55%', left: '55%' },  // Africa
];

const Earth3D = ({ width = "100%", height = "400px", showPins = false }: { width?: string; height?: string; showPins?: boolean }) => {
  const [visiblePins, setVisiblePins] = useState<number[]>([]);

  useEffect(() => {
    if (!showPins) return;

    let currentIndex = 0;
    const pinSequence: number[] = [];

    const interval = setInterval(() => {
      if (pinSequence.length < locationPins.length) {
        // Add a new pin
        pinSequence.push(locationPins[currentIndex].id);
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
    }, 1500); // Show/hide one pin every 1.5 seconds

    return () => clearInterval(interval);
  }, [showPins]);

  return (
    <div style={{ width, height, position: 'relative', overflow: 'visible' }}>
      {/* Animated background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div 
          className="w-[80%] h-[80%] rounded-full bg-blue-500/20 blur-3xl animate-pulse"
          style={{ animationDuration: '3s' }}
        />
      </div>
      
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
      >
        {/* Ambient light for overall illumination */}
        <ambientLight intensity={0.8} />
        
        {/* Directional light to simulate sun */}
        <directionalLight position={[5, 3, 5]} intensity={2} color="#ffffff" />
        
        {/* Blue accent lights */}
        <pointLight position={[-5, 0, 5]} intensity={1.5} color="#3b82f6" />
        <pointLight position={[5, 0, 5]} intensity={1.5} color="#60a5fa" />
        
        {/* The Earth with dotted map */}
        <EarthSphere />
        
        {/* Allow manual rotation */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.15}
        />
      </Canvas>

      {/* Location Pins Overlay */}
      {showPins && (
        <div className="absolute inset-0 pointer-events-none">
          <AnimatePresence>
            {locationPins.map((pin) => 
              visiblePins.includes(pin.id) && (
                <motion.div
                  key={pin.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "backOut" }}
                  className="absolute"
                  style={{ top: pin.top, left: pin.left, transform: 'translate(-50%, -100%)' }}
                >
                  {/* Green location pin */}
                  <div className="relative">
                    {/* Pin body */}
                    <div className="w-12 h-16 bg-gradient-to-b from-[#14B8A6] to-[#0D9488] rounded-t-full rounded-b-full relative shadow-lg border-2 border-white">
                      {/* User icon circle */}
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-[#14B8A6]"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                      </div>
                      {/* Pin pointer */}
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[12px] border-l-transparent border-r-transparent border-t-[#0D9488]" />
                    </div>
                  </div>
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default Earth3D;

import { motion } from "framer-motion";
import { CheckCircle, Shield, Globe, Zap } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, Text3D, Center } from "@react-three/drei";

const QualityBadge3D = () => {
  return (
    <Float
      speed={2}
      rotationIntensity={0.3}
      floatIntensity={0.5}
    >
      <Center>
        <mesh>
          {/* Outer ring */}
          <torusGeometry args={[2, 0.3, 16, 100]} />
          <meshStandardMaterial
            color="#A8C5B8"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        
        {/* Inner circle */}
        <mesh position={[0, 0, 0.1]}>
          <circleGeometry args={[1.8, 64]} />
          <meshStandardMaterial
            color="#A8BFC5"
            metalness={0.6}
            roughness={0.3}
          />
        </mesh>

        {/* Checkmark - simplified 3D */}
        <mesh position={[-0.3, 0.2, 0.3]} rotation={[0, 0, Math.PI / 6]}>
          <boxGeometry args={[0.3, 1.2, 0.2]} />
          <meshStandardMaterial color="#ffffff" metalness={0.5} roughness={0.2} />
        </mesh>
        
        <mesh position={[0.5, -0.4, 0.3]} rotation={[0, 0, -Math.PI / 3]}>
          <boxGeometry args={[0.3, 1.8, 0.2]} />
          <meshStandardMaterial color="#ffffff" metalness={0.5} roughness={0.2} />
        </mesh>
      </Center>
    </Float>
  );
};

const ValuePropositionSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-50 to-white py-20 lg:py-32 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left: 3D Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-[400px] lg:h-[500px] order-2 lg:order-1"
          >
            <Canvas
              camera={{ position: [0, 0, 8], fov: 45 }}
              className="touch-none"
            >
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <directionalLight position={[-10, -10, -5]} intensity={0.3} />
              <pointLight position={[0, 0, 5]} intensity={0.5} color="#A8C5B8" />
              
              <QualityBadge3D />
              
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={1.5}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 2}
              />
            </Canvas>

            {/* Floating stats around the 3D object */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
              className="absolute top-10 left-0 bg-white/80 backdrop-blur-sm px-4 py-3 rounded-full shadow-lg border border-gray-200"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold text-gray-900">2,000+ Auditors</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              viewport={{ once: true }}
              className="absolute top-32 right-0 bg-white/80 backdrop-blur-sm px-4 py-3 rounded-full shadow-lg border border-gray-200"
            >
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-secondary" />
                <span className="text-sm font-semibold text-gray-900">90+ Countries</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              viewport={{ once: true }}
              className="absolute bottom-20 left-10 bg-white/80 backdrop-blur-sm px-4 py-3 rounded-full shadow-lg border border-gray-200"
            >
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold text-gray-900">70% Cost Savings</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8 order-1 lg:order-2"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                viewport={{ once: true }}
                className="inline-block"
              >
                <div className="flex items-center gap-3 text-gray-600 text-sm font-medium">
                  <div className="h-px w-12 bg-primary/40" />
                  <span>Quality Assurance Reimagined</span>
                </div>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight"
              >
                The audit partner for teams obsessed with quality and speed.
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-xl"
            >
              Over a decade connecting global manufacturers with certified local auditors. Our clients saved over €12M+ in audit costs in 2024 alone.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-xl"
            >
              We're the audit infrastructure companies turn to when compliance and speed matter most. Our approach is fast, transparent, and AI-enhanced — purpose-built for modern supply chains.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              viewport={{ once: true }}
              className="pt-4"
            >
              <div className="inline-flex items-center gap-2 text-gray-900 font-medium">
                <span className="text-lg">Audits start at</span>
                <span className="text-3xl font-bold text-primary">€700</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              viewport={{ once: true }}
              className="flex gap-4 pt-4"
            >
              <button className="bg-gray-900 text-white px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 hover:bg-gray-800 hover:scale-105 shadow-lg">
                Start Your First Audit
              </button>
            </motion.div>

            {/* Feature highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4 pt-8 border-t border-gray-200"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-gray-900">Same-day dispatch</span>
                </div>
                <p className="text-sm text-gray-600 pl-6">Auto-matched local auditors</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-gray-900">ISO certified</span>
                </div>
                <p className="text-sm text-gray-600 pl-6">All major standards covered</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ValuePropositionSection;

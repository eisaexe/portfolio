import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';
import NeuralBackground from './NeuralBackground';

export default function Scene({ particleEffect }) {
  return (
    <div id="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
      >
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />

        {/* Lighting for depth feel */}
        <ambientLight intensity={0.6} />
        <pointLight position={[6,  8,  6]}  intensity={1.2} color="#00f5ff" />
        <pointLight position={[-8, -5, -6]} intensity={0.7} color="#8b5cf6" />
        <pointLight position={[0, -8,  4]}  intensity={0.4} color="#00ffaa" />

        <NeuralBackground particleEffect={particleEffect} />
      </Canvas>
    </div>
  );
}

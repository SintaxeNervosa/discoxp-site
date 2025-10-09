import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function Image3DContent({ imgSrc, isHovered }) {
  const texture = useTexture(imgSrc);
  const meshRef = useRef();
  
  useEffect(() => {
    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace;
    }
  }, [texture]);

  useFrame((state) => {
    if (meshRef.current && texture) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.01;

      if (isHovered) {
        meshRef.current.rotation.y += Math.sin(state.clock.elapsedTime * 3) * 0.1;
        meshRef.current.position.z = 0.3;
        meshRef.current.scale.setScalar(1.05);
      } else {
        meshRef.current.position.z = 0;
        meshRef.current.scale.setScalar(1);
      }
    }
  });

  if (!texture) return null;

  return (
    <>
      <mesh ref={meshRef} scale={1}>
        <planeGeometry args={[2.8, 4]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.2}
          metalness={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      <directionalLight position={[2, 2, 3]} intensity={isHovered ? 1.5 : 0.8} />
      <ambientLight intensity={0.4} />
    </>
  );
}

export default function ThreeDImage({ imgSrc }) {
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ width: '100%', height: '100%' }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        style={{
          height: '200px',
          width: '100%',
          background: 'transparent',
          borderRadius: '8px'
        }}
        gl={{ antialias: true }}
      >
        <Image3DContent imgSrc={imgSrc} isHovered={isHovered} />
        
        {isHovered && (
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
            rotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        )}
      </Canvas>
    </div>
  );
}
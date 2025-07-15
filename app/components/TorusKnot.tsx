import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { TorusKnot, MeshDistortMaterial } from '@react-three/drei';

export default function AnimatedTorusKnot() {
  const meshRef = useRef<any>(null);
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.01;
    }
  });
  return (
    <TorusKnot ref={meshRef} args={[3.5, 1.2, 128, 32]} position={[0, 0, 0]}>
      <MeshDistortMaterial
        color="#7c3aed"
        attach="material"
        distort={0.3}
        speed={2}
        roughness={0.2}
        metalness={0.7}
        transparent
        opacity={0.7}
      />
    </TorusKnot>
  );
} 
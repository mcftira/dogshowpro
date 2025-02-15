import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export function DogModel() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y += 0.01;
    }
  });

  // Create a simple geometric dog shape using basic shapes
  return (
    <group ref={group}>
      {/* Body */}
      <mesh position={[0, 0, 0]}>
        <capsuleGeometry args={[0.5, 1, 4, 8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Head */}
      <mesh position={[0, 0.5, 0.8]}>
        <sphereGeometry args={[0.4, 8, 8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Snout */}
      <mesh position={[0, 0.3, 1.2]}>
        <capsuleGeometry args={[0.2, 0.4, 4, 8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Ears */}
      <mesh position={[0.3, 0.8, 0.6]}>
        <capsuleGeometry args={[0.1, 0.3, 4, 8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[-0.3, 0.8, 0.6]}>
        <capsuleGeometry args={[0.1, 0.3, 4, 8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Tail */}
      <mesh position={[0, 0.2, -0.8]} rotation={[0, 0, Math.PI / 4]}>
        <capsuleGeometry args={[0.1, 0.6, 4, 8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Legs */}
      <mesh position={[0.3, -0.8, 0.5]}>
        <capsuleGeometry args={[0.1, 0.6, 4, 8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[-0.3, -0.8, 0.5]}>
        <capsuleGeometry args={[0.1, 0.6, 4, 8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[0.3, -0.8, -0.5]}>
        <capsuleGeometry args={[0.1, 0.6, 4, 8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[-0.3, -0.8, -0.5]}>
        <capsuleGeometry args={[0.1, 0.6, 4, 8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
    </group>
  );
}

export default function DogAnimation() {
  return (
    <div className="w-24 h-24">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <DogModel />
      </Canvas>
    </div>
  );
}

import { Canvas } from '@react-three/fiber';
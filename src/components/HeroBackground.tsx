import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedShapes() {
  const groupRef = useRef<THREE.Group>();
  const meshRefs = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      
      meshRefs.current.forEach((mesh, i) => {
        const t = state.clock.elapsedTime;
        mesh.position.y = Math.sin(t * 0.5 + i * Math.PI * 0.5) * 0.5;
        mesh.rotation.x = t * 0.3 + i * 0.3;
        mesh.rotation.z = t * 0.2 + i * 0.2;
      });
    }
  });

  const shapes = [
    { geometry: new THREE.TorusGeometry
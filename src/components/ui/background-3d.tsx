"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function FloatingOrb({ position, color, speed, distort, size }: {
  position: [number, number, number];
  color: string;
  speed: number;
  distort: number;
  size: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = Math.sin(clock.elapsedTime * speed * 0.3) * 0.2;
    meshRef.current.rotation.y = clock.elapsedTime * speed * 0.15;
  });

  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[size, 4]} />
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.12}
          distort={distort}
          speed={speed * 0.5}
          roughness={0.7}
        />
      </mesh>
    </Float>
  );
}

function Particles() {
  const count = 120;
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.elapsedTime * 0.02;
    ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.01) * 0.1;
  });

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [positions]);

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        size={0.03}
        color="#D97757"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

function GridFloor() {
  return (
    <gridHelper
      args={[30, 30, "#1a1a1f", "#1a1a1f"]}
      position={[0, -4, 0]}
      rotation={[0, 0, 0]}
    />
  );
}

export function Background3D() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.4} />

        <FloatingOrb position={[-3.5, 2, -2]} color="#D97757" speed={1.2} distort={0.4} size={1.4} />
        <FloatingOrb position={[4, -1, -3]} color="#7c3aed" speed={0.8} distort={0.3} size={1.1} />
        <FloatingOrb position={[0, 3, -5]} color="#2563eb" speed={1.0} distort={0.5} size={0.9} />
        <FloatingOrb position={[-2, -3, -4]} color="#D97757" speed={0.6} distort={0.35} size={0.7} />

        <Particles />
        <GridFloor />
      </Canvas>
    </div>
  );
}

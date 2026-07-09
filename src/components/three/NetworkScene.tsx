import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron, MeshDistortMaterial } from "@react-three/drei";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";

/**
 * NetworkScene — Subtle 3D WebGL background for the hero.
 * A rotating faceted icosahedron surrounded by a constellation of golden points.
 * Metaphor: an ESN — a connected network of nodes.
 */

const Nodes = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(600 * 3);
    for (let i = 0; i < 600; i++) {
      const r = 3.5 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#f5b942"
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
};

const Core = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });
  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
      <Icosahedron ref={meshRef} args={[1.2, 1]}>
        <MeshDistortMaterial
          color="#d4a020"
          emissive="#3a2400"
          roughness={0.25}
          metalness={0.85}
          distort={0.28}
          speed={1.4}
          wireframe={false}
        />
      </Icosahedron>
      <Icosahedron args={[1.35, 1]}>
        <meshBasicMaterial color="#f5c85a" wireframe transparent opacity={0.15} />
      </Icosahedron>
    </Float>
  );
};

export const NetworkScene = () => {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#ffd88a" />
        <pointLight position={[-5, -3, -5]} intensity={0.4} color="#d4a020" />
        <Core />
        <Nodes />
      </Suspense>
    </Canvas>
  );
};

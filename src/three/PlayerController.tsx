import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { Group } from 'three';

type MovementState = {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
};

function useMovementKeys() {
  const movementRef = useRef<MovementState>({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  useEffect(() => {
    const down = (event: KeyboardEvent) => {
      if (event.code === 'KeyW') movementRef.current.forward = true;
      if (event.code === 'KeyS') movementRef.current.backward = true;
      if (event.code === 'KeyA') movementRef.current.left = true;
      if (event.code === 'KeyD') movementRef.current.right = true;
    };

    const up = (event: KeyboardEvent) => {
      if (event.code === 'KeyW') movementRef.current.forward = false;
      if (event.code === 'KeyS') movementRef.current.backward = false;
      if (event.code === 'KeyA') movementRef.current.left = false;
      if (event.code === 'KeyD') movementRef.current.right = false;
    };

    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, []);

  return movementRef;
}

export function PlayerController() {
  const groupRef = useRef<Group>(null);
  const movementRef = useMovementKeys();

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const movement = movementRef.current;
    const speed = 3.6;
    const directionX = Number(movement.right) - Number(movement.left);
    const directionZ = Number(movement.backward) - Number(movement.forward);

    group.position.x += directionX * speed * delta;
    group.position.z += directionZ * speed * delta;
    group.position.x = Math.max(Math.min(group.position.x, 16), -16);
    group.position.z = Math.max(Math.min(group.position.z, 16), -16);
  });

  return (
    <group ref={groupRef} position={[0, 0.5, 0]}>
      <mesh position={[0, 0.8, 0]}>
        <sphereGeometry args={[0.5, 24, 24]} />
        <meshStandardMaterial color="#d9c485" metalness={0.2} roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.35, 0.45, 0.8, 20]} />
        <meshStandardMaterial color="#8f724f" metalness={0.05} roughness={0.7} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
        <torusGeometry args={[0.65, 0.06, 16, 100]} />
        <meshStandardMaterial color="#43d3ff" transparent opacity={0.35} />
      </mesh>
      <Text position={[0, 1.75, 0]} fontSize={0.35} color="#ffffff" anchorX="center" anchorY="middle">
        You
      </Text>
    </group>
  );
}

import { Text } from '@react-three/drei';

type BuildingPlaceholderProps = {
  label: string;
  position: [number, number, number];
  color: string;
};

export function BuildingPlaceholder({ label, position, color }: BuildingPlaceholderProps) {
  return (
    <group position={position}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.3, 1.4, 1.3]} />
        <meshStandardMaterial color={color} roughness={0.45} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0.85, 0]}> 
        <boxGeometry args={[1.1, 0.15, 1.1]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.1} />
      </mesh>
      <Text position={[0, 1.2, 0]} fontSize={0.18} color="#ffffff" anchorX="center" anchorY="middle">
        {label}
      </Text>
    </group>
  );
}

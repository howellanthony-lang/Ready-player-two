import { useMemo } from 'react';
import { Text } from '@react-three/drei';
import type { AgentData } from './Nexus3DWorld';

type AgentNPCProps = {
  agent: AgentData;
  selected: boolean;
  onSelect: () => void;
};

export function AgentNPC({ agent, selected, onSelect }: AgentNPCProps) {
  const accent = selected ? '#fff1a8' : '#7dd3fc';
  const bodyColor = selected ? '#f5cc7a' : '#78b6f1';

  const labelLines = useMemo(
    () => [agent.name, agent.role, agent.mood],
    [agent.name, agent.role, agent.mood],
  );

  return (
    <group position={agent.position}>
      <mesh onClick={onSelect} castShadow receiveShadow>
        <cylinderGeometry args={[0.4, 0.6, 1.2, 18]} />
        <meshStandardMaterial color={bodyColor} roughness={0.4} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0.9, 0]}> 
        <sphereGeometry args={[0.35, 18, 18]} />
        <meshStandardMaterial color="#fef1d0" roughness={0.4} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.06, 0]}>
        <ringGeometry args={[0.7, 0.82, 64]} />
        <meshStandardMaterial color={accent} transparent opacity={0.4} />
      </mesh>
      <Text position={[0, 1.75, 0]} fontSize={0.28} color="#e4f2ff" anchorX="center" anchorY="middle">
        {labelLines.join(' | ')}
      </Text>
      {selected && (
        <Text position={[0, 2.3, 0]} fontSize={0.22} color="#f8f0b6" anchorX="center" anchorY="middle">
          Selected
        </Text>
      )}
    </group>
  );
}

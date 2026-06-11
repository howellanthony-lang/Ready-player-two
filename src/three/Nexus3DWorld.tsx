import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sky, Text } from '@react-three/drei';
import { AgentNPC } from './AgentNPC';
import { BuildingPlaceholder } from './BuildingPlaceholder';
import { PlayerController } from './PlayerController';

export type AgentData = {
  id: string;
  name: string;
  role: string;
  mood: string;
  goal: string;
  memory: string;
  skill: string;
  position: [number, number, number];
};

export const agents: AgentData[] = [
  {
    id: 'mason',
    name: 'Mason',
    role: 'Builder',
    mood: 'Focused',
    goal: 'Build first shelter',
    memory: 'Day 1 camp was formed',
    skill: 'Construction',
    position: [-4, 0, 1],
  },
  {
    id: 'ava',
    name: 'Ava',
    role: 'Medic',
    mood: 'Calm',
    goal: 'Check everyone is safe',
    memory: 'Found a clean water source',
    skill: 'Healing',
    position: [2.5, 0, -3.5],
  },
  {
    id: 'theo',
    name: 'Theo',
    role: 'Inventor',
    mood: 'Curious',
    goal: 'Prototype a new tool',
    memory: 'Studied early energy circuits',
    skill: 'Innovation',
    position: [4.5, 0, 2],
  },
  {
    id: 'elsie',
    name: 'Elsie',
    role: 'Farmer',
    mood: 'Happy',
    goal: 'Tend the seed plots',
    memory: 'Harvested the first crop',
    skill: 'Agriculture',
    position: [-2, 0, -5],
  },
  {
    id: 'rex',
    name: 'Rex',
    role: 'Guard',
    mood: 'Alert',
    goal: 'Patrol the border',
    memory: 'Spotted a distant signal flare',
    skill: 'Vigilance',
    position: [5.5, 0, -5],
  },
  {
    id: 'nova',
    name: 'Nova',
    role: 'Explorer',
    mood: 'Excited',
    goal: 'Chart new terrain',
    memory: 'Spotted a strange sky beacon',
    skill: 'Navigation',
    position: [-6.5, 0, -2],
  },
];

const buildings: { label: string; position: [number, number, number]; color: string }[] = [
  { label: 'Campfire', position: [0, 0, -1.5], color: '#f6b53f' },
  { label: 'Shelter', position: [3.5, 0, -1], color: '#8da87d' },
  { label: 'Farm', position: [-3.5, 0, -3.5], color: '#6aa84f' },
  { label: 'Workshop', position: [3.5, 0, 3], color: '#6068ad' },
  { label: 'School', position: [-1.5, 0, 5], color: '#4d7ea8' },
  { label: 'Factory', position: [6, 0, 4], color: '#a37b50' },
  { label: 'Data Centre', position: [-6, 0, 4], color: '#6fa8dc' },
  { label: 'AI Lab', position: [7.5, 0, -2.5], color: '#9673b9' },
  { label: 'Anti-Gravity Lab', position: [-7.5, 0, 2.5], color: '#4a86e8' },
  { label: 'Flying Car Depot', position: [0, 0, 6.5], color: '#e06666' },
  { label: 'Spaceport', position: [8.5, 0, 0], color: '#3d85c6' },
];

type Nexus3DWorldProps = {
  selectedAgentId: string | null;
  onSelectAgent: (agentId: string) => void;
};

export function Nexus3DWorld({ selectedAgentId, onSelectAgent }: Nexus3DWorldProps) {
  return (
    <div className="h-full w-full min-h-[640px] rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-slate-950">
      <Canvas camera={{ position: [0, 8, 16], fov: 55 }}>
        <color attach="background" args={['#08121f']} />
        <fog attach="fog" args={['#08121f', 15, 35]} />
        <ambientLight intensity={0.45} />
        <directionalLight position={[10, 12, 5]} intensity={1.1} castShadow />
        <Sky sunPosition={[10, 20, 10]} turbidity={8} rayleigh={1.2} />
        <OrbitControls enablePan={true} enableZoom={true} maxPolarAngle={Math.PI / 2.2} />

        <mesh rotation-x={-Math.PI / 2} position={[0, 0, 0]}>
          <planeGeometry args={[80, 80]} />
          <meshStandardMaterial roughness={0.9} metalness={0.05} color="#102430" />
        </mesh>

        <mesh position={[0, 0.01, 0]}> 
          <ringGeometry args={[10, 11.3, 64]} />
          <meshStandardMaterial transparent opacity={0.08} color="#4de2ff" side={2} />
        </mesh>

        <PlayerController />

        {agents.map((agent) => (
          <AgentNPC
            key={agent.id}
            agent={agent}
            selected={selectedAgentId === agent.id}
            onSelect={() => onSelectAgent(agent.id)}
          />
        ))}

        {buildings.map((building) => (
          <BuildingPlaceholder key={building.label} label={building.label} position={building.position} color={building.color} />
        ))}

        <Text
          position={[-9, 5, -9]}
          fontSize={0.7}
          color="#c9f2ff"
          anchorX="left"
          anchorY="middle"
        >
          Origin Planet
        </Text>
        <Text position={[-9, 4.1, -9]} fontSize={0.4} color="#7f9cb1" anchorX="left" anchorY="middle">
          Low-poly AI civilisation
        </Text>
      </Canvas>
    </div>
  );
}

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { CanvasTexture, MathUtils, Vector3 } from "three";
import type { Group } from "three";

type SceneAgent = {
  id: string;
  name: string;
  role: string;
  mood: string;
  position: [number, number, number];
};

type DebugWorldSceneProps = {
  agents: SceneAgent[];
  selectedAgentId: string;
  onSelectAgent: (id: string) => void;
  stormActive: boolean;
  shelterProgress: number;
};

function FirstPersonFounder(): null {
  const camera = useThree((state) => state.camera);
  const movement = useRef({ forward: false, backward: false, left: false, right: false });
  const forward = useMemo(() => new Vector3(), []);
  const right = useMemo(() => new Vector3(), []);

  useLayoutEffect(() => {
    camera.position.set(0, 1.8, 8.5);
    camera.lookAt(0, 1, 0);
    camera.updateProjectionMatrix();
  }, [camera]);

  useEffect(() => {
    const setKey = (event: KeyboardEvent, pressed: boolean) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
      if (event.code === "KeyW") movement.current.forward = pressed;
      if (event.code === "KeyS") movement.current.backward = pressed;
      if (event.code === "KeyA") movement.current.left = pressed;
      if (event.code === "KeyD") movement.current.right = pressed;
      if (["KeyW", "KeyA", "KeyS", "KeyD"].includes(event.code)) event.preventDefault();
    };
    const keyDown = (event: KeyboardEvent) => setKey(event, true);
    const keyUp = (event: KeyboardEvent) => setKey(event, false);
    const stop = () => { movement.current = { forward: false, backward: false, left: false, right: false }; };
    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);
    window.addEventListener("blur", stop);
    return () => {
      window.removeEventListener("keydown", keyDown);
      window.removeEventListener("keyup", keyUp);
      window.removeEventListener("blur", stop);
    };
  }, []);

  useFrame((_, delta) => {
    const input = movement.current;
    if (!input.forward && !input.backward && !input.left && !input.right) return;
    camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();
    right.crossVectors(forward, camera.up).normalize();
    const step = Math.min(delta, 0.05) * 4.4;
    if (input.forward) camera.position.addScaledVector(forward, step);
    if (input.backward) camera.position.addScaledVector(forward, -step);
    if (input.left) camera.position.addScaledVector(right, -step);
    if (input.right) camera.position.addScaledVector(right, step);
    camera.position.x = MathUtils.clamp(camera.position.x, -9, 9);
    camera.position.z = MathUtils.clamp(camera.position.z, -1, 11);
  });

  return null;
}

function Campfire(): React.JSX.Element {
  const flame = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (!flame.current) return;
    flame.current.scale.y = 0.9 + Math.sin(clock.elapsedTime * 8) * 0.12;
    flame.current.rotation.y += 0.02;
  });
  return (
    <group position={[0, 0, 0.5]}>
      {[-0.35, 0.35].map((x, index) => <mesh key={x} position={[x, 0.16, 0]} rotation={[0, index ? -0.7 : 0.7, Math.PI / 2]} castShadow><cylinderGeometry args={[0.1, 0.12, 1.15, 8]} /><meshStandardMaterial color="#5f321f" /></mesh>)}
      <group ref={flame}>
        <mesh position={[0, 0.68, 0]}><coneGeometry args={[0.42, 1.25, 14]} /><meshStandardMaterial color="#ff9d3d" emissive="#ff5b16" emissiveIntensity={2.8} /></mesh>
        <mesh position={[0, 0.62, 0]}><coneGeometry args={[0.22, 0.75, 12]} /><meshBasicMaterial color="#fff0a8" /></mesh>
      </group>
      <pointLight position={[0, 1.4, 0]} color="#ff7a28" intensity={4.5} distance={10} castShadow />
    </group>
  );
}

function Label({ name, role }: { name: string; role: string }): React.JSX.Element | null {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = 320;
    canvas.height = 96;
    if (!context) return null;
    context.fillStyle = "rgba(3, 10, 18, 0.9)";
    context.fillRect(8, 8, 304, 80);
    context.strokeStyle = "rgba(64, 211, 255, 0.75)";
    context.lineWidth = 3;
    context.strokeRect(8, 8, 304, 80);
    context.fillStyle = "#f3f8fc";
    context.font = "700 28px system-ui";
    context.fillText(name, 22, 42);
    context.fillStyle = "#62dcff";
    context.font = "600 19px system-ui";
    context.fillText(role.toUpperCase(), 22, 70);
    const result = new CanvasTexture(canvas);
    result.needsUpdate = true;
    return result;
  }, [name, role]);

  useEffect(() => () => texture?.dispose(), [texture]);
  if (!texture) return null;
  return <sprite position={[0, 1.75, 0]} scale={[2.15, 0.65, 1]}><spriteMaterial map={texture} transparent depthTest={false} /></sprite>;
}

function Citizen({ agent, selected, onSelect }: { agent: SceneAgent; selected: boolean; onSelect: () => void }): React.JSX.Element {
  return (
    <group position={agent.position}>
      <Label name={agent.name.split(" ")[0]} role={agent.role} />
      <mesh onClick={(event) => { event.stopPropagation(); onSelect(); }} scale={selected ? 1.12 : 1} castShadow>
        <capsuleGeometry args={[0.34, 0.78, 8, 16]} />
        <meshStandardMaterial color={selected ? "#ffd34d" : "#dd7729"} roughness={0.58} metalness={0.12} emissive={selected ? "#6e4b00" : "#2a1005"} emissiveIntensity={0.45} />
      </mesh>
      {selected && <mesh position={[0, -0.49, 0]} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[0.52, 0.67, 32]} /><meshBasicMaterial color="#55d8ff" transparent opacity={0.85} /></mesh>}
    </group>
  );
}

function Shelter({ progress }: { progress: number }): React.JSX.Element {
  const posts = [[-1.45, 1.1, -0.9], [1.45, 1.1, -0.9], [-1.45, 1.1, 0.9], [1.45, 1.1, 0.9]] as [number, number, number][];
  return (
    <group position={[2.7, 0, -3.6]}>
      <mesh position={[0, 0.04, 0]}><boxGeometry args={[3.4, 0.08, 2.5]} /><meshStandardMaterial color="#46372c" /></mesh>
      {posts.slice(0, Math.ceil(progress / 25)).map((position, index) => <mesh key={index} position={position} castShadow><boxGeometry args={[0.18, 2.2, 0.18]} /><meshStandardMaterial color="#9b6239" /></mesh>)}
      {progress >= 40 && <mesh position={[0, 2.12, -0.9]} rotation={[0, 0, Math.PI / 2]}><boxGeometry args={[0.18, 3.1, 0.18]} /><meshStandardMaterial color="#9b6239" /></mesh>}
      {progress >= 60 && <mesh position={[0, 2.12, 0.9]} rotation={[0, 0, Math.PI / 2]}><boxGeometry args={[0.18, 3.1, 0.18]} /><meshStandardMaterial color="#9b6239" /></mesh>}
      {progress >= 85 && <mesh position={[0, 2.48, 0]} rotation={[0, 0, Math.PI / 4]} castShadow><boxGeometry args={[3.8, 0.16, 2.9]} /><meshStandardMaterial color="#586775" roughness={0.92} /></mesh>}
    </group>
  );
}

function StormFront(): React.JSX.Element {
  return (
    <group position={[0, 7.4, -9]}>
      {[-7, -4.5, -2, 0.5, 3, 5.5, 8].map((x, index) => <mesh key={x} position={[x, index % 2 ? 0.5 : 0, index % 3]} scale={[2.7, 0.8, 1.5]}><sphereGeometry args={[1.5, 18, 10]} /><meshStandardMaterial color="#151b2b" roughness={1} /></mesh>)}
      <mesh position={[3, -3.7, 1]} rotation={[0, 0, -0.18]}><boxGeometry args={[0.07, 5.2, 0.07]} /><meshBasicMaterial color="#dff8ff" /></mesh>
      <pointLight position={[3, -2.8, 1]} color="#aeeaff" intensity={4} distance={16} />
    </group>
  );
}

function WorldScene({ agents, selectedAgentId, onSelectAgent, stormActive, shelterProgress }: DebugWorldSceneProps): React.JSX.Element {
  return (
    <>
      <color attach="background" args={["#050b14"]} />
      <fog attach="fog" args={["#07101a", 12, 34]} />
      <ambientLight color="#7da8c1" intensity={0.62} />
      <directionalLight position={[-7, 10, 5]} color="#b8dcff" intensity={1.75} castShadow />
      <directionalLight position={[8, 4, -5]} color="#ff7a35" intensity={0.45} />
      <FirstPersonFounder />
      <mesh position={[0, -0.08, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow><planeGeometry args={[32, 32]} /><meshStandardMaterial color="#17352c" roughness={0.96} /></mesh>
      <gridHelper args={[32, 32, "#285e52", "#173d34"]} position={[0, 0.01, 0]} />
      <Campfire />
      {stormActive && <StormFront />}
      {shelterProgress > 0 && <Shelter progress={shelterProgress} />}
      <group position={[-5.7, 0, 3.4]}>{[-0.55, 0, 0.55].map((x) => <mesh key={x} position={[x, 0.17, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.13, 0.13, 1.8, 8]} /><meshStandardMaterial color="#754127" /></mesh>)}</group>
      <group position={[5.6, 0, 3.6]}>{[0, 1.05].map((x) => <mesh key={x} position={[x, 0.42, 0]} castShadow><boxGeometry args={[0.9, 0.84, 0.9]} /><meshStandardMaterial color="#65503b" /></mesh>)}</group>
      <group position={[-3.8, 0.02, -4.5]}>{[-1.2, -0.4, 0.4, 1.2].map((x) => <mesh key={x} position={[x, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[0.46, 3.4]} /><meshStandardMaterial color="#2c633b" /></mesh>)}</group>
      <group position={[-7, 0, -5]}><mesh position={[0, 1.4, 0]}><cylinderGeometry args={[0.1, 0.16, 2.8, 8]} /><meshStandardMaterial color="#526879" metalness={0.8} /></mesh><mesh position={[0, 2.95, 0]}><octahedronGeometry args={[0.42]} /><meshStandardMaterial color="#58ddff" emissive="#20c8ff" emissiveIntensity={2.5} /></mesh><pointLight position={[0, 2.95, 0]} color="#29d7ff" intensity={2} distance={8} /></group>
      {agents.map((agent) => <Citizen key={agent.id} agent={agent} selected={selectedAgentId === agent.id} onSelect={() => onSelectAgent(agent.id)} />)}
    </>
  );
}

export function DebugWorldScene(props: DebugWorldSceneProps): React.JSX.Element {
  return (
    <div className="viewport-canvas" aria-label="First-person view of Origin Planet camp">
      <Canvas camera={{ position: [0, 1.8, 8.5], fov: 58, near: 0.1, far: 100 }} dpr={[1, 2]} gl={{ antialias: true }} shadows>
        <WorldScene {...props} />
      </Canvas>
      <div className="crosshair" aria-hidden="true"><span /><span /></div>
      <div className="movement-hint"><strong>Founder POV</strong><span>WASD to move / click a citizen</span></div>
    </div>
  );
}

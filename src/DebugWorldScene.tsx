import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { CanvasTexture, Euler, MathUtils, Quaternion, Vector3 } from "three";
import type { Group, PointLight, Points } from "three";

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
  masonInteraction: "meet" | "give" | null;
  onMasonInteract: () => void;
};

type FounderControlsProps = {
  masonPosition: [number, number, number];
  onNearMasonChange: (near: boolean) => void;
  onPointerLockChange: (locked: boolean) => void;
};

function FirstPersonFounder({ masonPosition, onNearMasonChange, onPointerLockChange }: FounderControlsProps): null {
  const camera = useThree((state) => state.camera);
  const gl = useThree((state) => state.gl);
  const movement = useRef({ forward: false, backward: false, left: false, right: false });
  const pointerLocked = useRef(false);
  const lastNearMason = useRef(false);
  const yaw = useRef(0);
  const pitch = useRef(-0.08);
  const forward = useMemo(() => new Vector3(), []);
  const right = useMemo(() => new Vector3(), []);
  const mason = useMemo(() => new Vector3(...masonPosition), [masonPosition]);
  const rotation = useMemo(() => new Euler(0, 0, 0, "YXZ"), []);

  useLayoutEffect(() => {
    camera.position.set(0, 1.8, 8.5);
    camera.lookAt(0, 1, 0);
    camera.rotation.order = "YXZ";
    yaw.current = camera.rotation.y;
    pitch.current = camera.rotation.x;
    camera.updateProjectionMatrix();
  }, [camera]);

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.tabIndex = 0;
    const requestFounderView = () => {
      if (document.pointerLockElement || document.activeElement instanceof HTMLInputElement || document.activeElement instanceof HTMLTextAreaElement) return;
      canvas.focus();
      void canvas.requestPointerLock();
    };
    const handlePointerLockChange = () => {
      pointerLocked.current = document.pointerLockElement === canvas;
      onPointerLockChange(pointerLocked.current);
      if (!pointerLocked.current) movement.current = { forward: false, backward: false, left: false, right: false };
    };
    const handleMouseMove = (event: MouseEvent) => {
      if (!pointerLocked.current) return;
      yaw.current -= event.movementX * 0.0018;
      pitch.current = MathUtils.clamp(pitch.current - event.movementY * 0.0018, -1.35, 1.2);
      rotation.set(pitch.current, yaw.current, 0);
      camera.quaternion.setFromEuler(rotation);
    };
    const setKey = (event: KeyboardEvent, pressed: boolean) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
      if (!pointerLocked.current) return;
      if (event.code === "KeyW") movement.current.forward = pressed;
      if (event.code === "KeyS") movement.current.backward = pressed;
      if (event.code === "KeyA") movement.current.left = pressed;
      if (event.code === "KeyD") movement.current.right = pressed;
      if (["KeyW", "KeyA", "KeyS", "KeyD"].includes(event.code)) event.preventDefault();
    };
    const keyDown = (event: KeyboardEvent) => setKey(event, true);
    const keyUp = (event: KeyboardEvent) => setKey(event, false);
    const stop = () => { movement.current = { forward: false, backward: false, left: false, right: false }; };
    canvas.addEventListener("click", requestFounderView);
    document.addEventListener("pointerlockchange", handlePointerLockChange);
    document.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);
    window.addEventListener("blur", stop);
    return () => {
      canvas.removeEventListener("click", requestFounderView);
      document.removeEventListener("pointerlockchange", handlePointerLockChange);
      document.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("keydown", keyDown);
      window.removeEventListener("keyup", keyUp);
      window.removeEventListener("blur", stop);
      if (document.pointerLockElement === canvas) document.exitPointerLock();
    };
  }, [camera, gl, onPointerLockChange, rotation]);

  useFrame((_, delta) => {
    const distanceToMason = Math.hypot(camera.position.x - mason.x, camera.position.z - mason.z);
    const nearMason = distanceToMason <= 3.1;
    if (nearMason !== lastNearMason.current) {
      lastNearMason.current = nearMason;
      onNearMasonChange(nearMason);
    }

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
    camera.position.x = MathUtils.clamp(camera.position.x, -8.5, 8.5);
    camera.position.z = MathUtils.clamp(camera.position.z, -5.5, 10.5);
  });

  return null;
}

function Campfire({ stormActive }: { stormActive: boolean }): React.JSX.Element {
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
      <pointLight position={[0, 1.4, 0]} color="#ff7a28" intensity={stormActive ? 6.2 : 4.5} distance={stormActive ? 13 : 10} castShadow />
    </group>
  );
}

function FounderTool() {
  const camera = useThree((state) => state.camera);
  const tool = useRef<Group>(null);
  const offset = useMemo(() => new Vector3(0.56, -0.46, -1.18), []);
  const worldOffset = useMemo(() => new Vector3(), []);
  const localRotation = useMemo(() => new Quaternion().setFromEuler(new Euler(-0.08, -0.18, -0.12)), []);

  useFrame(({ clock }) => {
    if (!tool.current) return;
    worldOffset.copy(offset);
    worldOffset.y += Math.sin(clock.elapsedTime * 1.7) * 0.012;
    worldOffset.applyQuaternion(camera.quaternion);
    tool.current.position.copy(camera.position).add(worldOffset);
    tool.current.quaternion.copy(camera.quaternion).multiply(localRotation);
  });

  return (
    <group ref={tool} scale={0.24}>
      <mesh castShadow>
        <boxGeometry args={[0.82, 0.34, 1.48]} />
        <meshStandardMaterial color="#263745" metalness={0.78} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.2, -0.06]}>
        <boxGeometry args={[0.62, 0.04, 0.78]} />
        <meshStandardMaterial color="#07151d" emissive="#16cbe8" emissiveIntensity={1.4} />
      </mesh>
      <mesh position={[-0.37, 0.03, -0.63]} rotation={[0, 0, -0.25]}>
        <boxGeometry args={[0.12, 0.12, 0.7]} />
        <meshStandardMaterial color="#4e6574" metalness={0.8} />
      </mesh>
      <mesh position={[0.37, 0.03, -0.63]} rotation={[0, 0, 0.25]}>
        <boxGeometry args={[0.12, 0.12, 0.7]} />
        <meshStandardMaterial color="#4e6574" metalness={0.8} />
      </mesh>
      <mesh position={[0, -0.28, 0.35]} rotation={[0.3, 0, 0]}>
        <boxGeometry args={[0.34, 0.7, 0.38]} />
        <meshStandardMaterial color="#172630" roughness={0.5} />
      </mesh>
      <pointLight position={[0, 0.18, -0.62]} color="#27dcff" intensity={0.9} distance={2.4} />
    </group>
  );
}

function StormRain(): React.JSX.Element {
  const rain = useRef<Points>(null);
  const positions = useMemo(() => {
    const values = new Float32Array(900 * 3);
    for (let index = 0; index < values.length; index += 3) {
      values[index] = (Math.random() - 0.5) * 26;
      values[index + 1] = Math.random() * 12;
      values[index + 2] = (Math.random() - 0.5) * 26;
    }
    return values;
  }, []);

  useFrame((_, delta) => {
    if (!rain.current) return;
    for (let index = 1; index < positions.length; index += 3) {
      positions[index] -= delta * 13;
      if (positions[index] < 0.1) positions[index] = 11 + Math.random() * 2;
    }
    rain.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={rain} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#a9d8e8" size={0.018} transparent opacity={0.55} depthWrite={false} />
    </points>
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
  const lightning = useRef<Group>(null);
  const flash = useRef<PointLight>(null);

  useFrame(({ clock }) => {
    const phase = clock.elapsedTime % 6.4;
    const active = phase < 0.09 || (phase > 0.2 && phase < 0.27);
    if (lightning.current) lightning.current.visible = active;
    if (flash.current) flash.current.intensity = active ? 7.5 : 0;
  });

  return (
    <group position={[0, 7.4, -9]}>
      {[-7, -4.5, -2, 0.5, 3, 5.5, 8].map((x, index) => <mesh key={x} position={[x, index % 2 ? 0.5 : 0, index % 3]} scale={[2.7, 0.8, 1.5]}><sphereGeometry args={[1.5, 18, 10]} /><meshStandardMaterial color="#151b2b" roughness={1} /></mesh>)}
      <group ref={lightning} visible={false}>
        <mesh position={[3, -3.7, 1]} rotation={[0, 0, -0.18]}><boxGeometry args={[0.07, 5.2, 0.07]} /><meshBasicMaterial color="#dff8ff" /></mesh>
      </group>
      <pointLight ref={flash} position={[3, -2.8, 1]} color="#c7f2ff" intensity={0} distance={19} />
    </group>
  );
}

function WorldScene({ agents, selectedAgentId, onSelectAgent, stormActive, shelterProgress, onNearMasonChange, onPointerLockChange }: DebugWorldSceneProps & Pick<FounderControlsProps, "onNearMasonChange" | "onPointerLockChange">): React.JSX.Element {
  const masonPosition: [number, number, number] = agents.find((agent) => agent.id === "mason")?.position ?? [1.7, 0.55, -1.5];
  return (
    <>
      <color attach="background" args={[stormActive ? "#02050c" : "#050b14"]} />
      <fog attach="fog" args={[stormActive ? "#050813" : "#07101a", stormActive ? 8 : 12, stormActive ? 27 : 34]} />
      <ambientLight color="#7da8c1" intensity={stormActive ? 0.34 : 0.62} />
      <directionalLight position={[-7, 10, 5]} color="#b8dcff" intensity={stormActive ? 0.8 : 1.75} castShadow />
      <directionalLight position={[8, 4, -5]} color="#ff7a35" intensity={0.45} />
      <FirstPersonFounder masonPosition={masonPosition} onNearMasonChange={onNearMasonChange} onPointerLockChange={onPointerLockChange} />
      <FounderTool />
      <mesh position={[0, -0.08, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow><planeGeometry args={[32, 32]} /><meshStandardMaterial color="#17352c" roughness={0.96} /></mesh>
      <gridHelper args={[32, 32, "#285e52", "#173d34"]} position={[0, 0.01, 0]} />
      <Campfire stormActive={stormActive} />
      {stormActive && <><StormFront /><StormRain /></>}
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
  const [pointerLocked, setPointerLocked] = useState(false);
  const [nearMason, setNearMason] = useState(false);

  useEffect(() => {
    const handleInteract = (event: KeyboardEvent) => {
      if (event.code !== "KeyE" || !nearMason || !props.masonInteraction) return;
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
      event.preventDefault();
      props.onMasonInteract();
    };
    window.addEventListener("keydown", handleInteract);
    return () => window.removeEventListener("keydown", handleInteract);
  }, [nearMason, props.masonInteraction, props.onMasonInteract]);

  const prompt = props.masonInteraction === "meet"
    ? "Press E to speak with Mason"
    : props.masonInteraction === "give"
      ? "Press E to give Mason Tools (cost: 1 Tool)"
      : null;

  return (
    <div className="viewport-canvas" aria-label="First-person view of Origin Planet camp">
      <Canvas camera={{ position: [0, 1.8, 8.5], fov: 58, near: 0.1, far: 100 }} dpr={[1, 2]} gl={{ antialias: true }} shadows>
        <WorldScene {...props} onNearMasonChange={setNearMason} onPointerLockChange={setPointerLocked} />
      </Canvas>
      <div className="crosshair" aria-hidden="true"><span /><span /></div>
      {!pointerLocked && <div className="founder-view-prompt"><strong>Enter Founder View</strong><span>Click the world for mouse look and WASD</span></div>}
      {nearMason && prompt && <button type="button" className="interaction-prompt" onClick={props.onMasonInteract}>{prompt}</button>}
      <div className="movement-hint"><strong>Founder POV</strong><span>{pointerLocked ? "Mouse look / WASD / Esc to release" : "Click a citizen to inspect"}</span></div>
    </div>
  );
}

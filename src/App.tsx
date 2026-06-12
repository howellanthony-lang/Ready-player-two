import { useEffect, useMemo, useState } from "react";
import { DebugWorldScene } from "./DebugWorldScene";

type CareerId = "architect" | "engineer" | "medic" | "farmer" | "scout" | "guardian";
type ScreenId = "login" | "profile" | "character" | "career" | "loading" | "game";

type Agent = {
  id: string;
  name: string;
  role: string;
  mood: string;
  energy: number;
  health: number;
  goal: string;
  action: string;
  memory: string;
  skill: string;
  trust: number;
  position: [number, number, number];
};

type FeedEntry = {
  id: number;
  day: number;
  time: string;
  type: "founder" | "agent" | "event" | "research" | "project" | "world";
  text: string;
};

const careers: { id: CareerId; name: string; description: string; gift: string; opening: string }[] = [
  { id: "architect", name: "Architect", description: "Turn survival problems into practical structures.", gift: "+1 tool / +2 research", opening: "You recognise the camp's weak geometry immediately." },
  { id: "engineer", name: "Engineer", description: "Study systems, energy and practical invention.", gift: "+6 research", opening: "Broken equipment looks less like debris and more like possibility." },
  { id: "medic", name: "Medic", description: "Protect health and prepare people for crisis.", gift: "+6 morale", opening: "You notice exhaustion before anyone says they are afraid." },
  { id: "farmer", name: "Farmer", description: "Build resilience through food and living systems.", gift: "+2 food", opening: "The soil is poor, but not dead. Elsie will understand that." },
  { id: "scout", name: "Scout", description: "Read terrain, weather and hidden routes.", gift: "+2 wood / safer outlook", opening: "The eastern ridge could shelter the camp if the wind turns." },
  { id: "guardian", name: "Guardian", description: "Create safety without taking away citizen agency.", gift: "+10 morale", opening: "Every exposed approach to the camp is already mapped in your mind." },
];

const avatarPresets = [
  { id: "aether", name: "Aether", color: "#55d8ff", detail: "Cool spectral signal" },
  { id: "ember", name: "Ember", color: "#ff8748", detail: "Warm survival signal" },
  { id: "verdant", name: "Verdant", color: "#5ce0a6", detail: "Living world signal" },
  { id: "solar", name: "Solar", color: "#ffd25b", detail: "High visibility signal" },
];

const missions = [
  { name: "Enter The Nexus", objective: "Complete Founder initialization." },
  { name: "Meet Mason", objective: "Find and interact with Mason in the camp." },
  { name: "Give Tools", objective: "Give Mason a builder tool without commanding his plan." },
  { name: "The Storm Warning", objective: "Trigger the incoming storm event." },
  { name: "Secure The Camp", objective: "Let every citizen adopt an emergency goal." },
  { name: "Advance Day", objective: "Move time forward and review the daily summary." },
  { name: "Build First Shelter", objective: "Advance time until the shelter reaches 100%." },
  { name: "First Council", objective: "Call the first council after shelter is complete." },
  { name: "First Storm Demo Complete", objective: "The settlement survived its first shared decision." },
];

const initialAgents: Agent[] = [
  { id: "mason", name: "Mason Briggs", role: "Builder", mood: "Focused", energy: 82, health: 100, goal: "Build the first shelter", action: "Searching for usable timber", memory: "The six survivors formed a camp at dusk.", skill: "Construction", trust: 48, position: [1.7, 0.55, -1.5] },
  { id: "ava", name: "Ava Stone", role: "Medic", mood: "Calm", energy: 76, health: 96, goal: "Keep the group healthy", action: "Checking emergency supplies", memory: "Clean water was found near the ridge.", skill: "Medicine", trust: 42, position: [-3.6, 0.55, 1.2] },
  { id: "theo", name: "Theo Vale", role: "Inventor", mood: "Curious", energy: 68, health: 92, goal: "Understand the Founder tools", action: "Studying broken equipment", memory: "The Founder presence appeared without a body.", skill: "Research", trust: 36, position: [-1.1, 0.55, -2.4] },
  { id: "elsie", name: "Elsie Hart", role: "Farmer", mood: "Worried", energy: 71, health: 98, goal: "Protect the remaining food", action: "Planting emergency seed rows", memory: "Food stores will not last another week.", skill: "Agriculture", trust: 45, position: [3.5, 0.55, 2.2] },
  { id: "rex", name: "Rex Calder", role: "Guard", mood: "Alert", energy: 88, health: 100, goal: "Secure the camp perimeter", action: "Watching the eastern ridge", memory: "Dark clouds are moving faster than expected.", skill: "Security", trust: 31, position: [4.8, 0.55, -0.2] },
  { id: "nova", name: "Nova Quinn", role: "Explorer", mood: "Restless", energy: 79, health: 95, goal: "Map the nearby valley", action: "Checking wind direction", memory: "A sheltered hollow lies beyond the ridge.", skill: "Exploration", trust: 39, position: [-4.8, 0.55, -1.9] },
];

const initialFeed: FeedEntry[] = [
  { id: 1, day: 1, time: "06:18", type: "world", text: "Origin Planet settlement established." },
  { id: 2, day: 1, time: "06:22", type: "agent", text: "Mason identifies shelter as the first survival priority." },
  { id: 3, day: 1, time: "06:27", type: "agent", text: "Elsie reports food stores are critically low." },
  { id: 4, day: 1, time: "06:31", type: "event", text: "A severe storm front is forming beyond the ridge." },
];

const feedColors: Record<FeedEntry["type"], string> = {
  founder: "feed-founder",
  agent: "feed-agent",
  event: "feed-event",
  research: "feed-research",
  project: "feed-project",
  world: "feed-world",
};

export function App(): React.JSX.Element {
  const [screen, setScreen] = useState<ScreenId>("login");
  const [founderName, setFounderName] = useState("Founder Howell");
  const [career, setCareer] = useState<CareerId>("architect");
  const [avatarPreset, setAvatarPreset] = useState("aether");
  const [missionIndex, setMissionIndex] = useState(0);
  const [day, setDay] = useState(1);
  const [selectedAgentId, setSelectedAgentId] = useState("mason");
  const [agents, setAgents] = useState(initialAgents);
  const [resources, setResources] = useState({ people: 6, food: 3, wood: 8, stone: 4, tools: 1, research: 8, morale: 62 });
  const [feed, setFeed] = useState(initialFeed);
  const [eventText, setEventText] = useState("A storm is coming tonight.");
  const [stormActive, setStormActive] = useState(false);
  const [toolsGiven, setToolsGiven] = useState(false);
  const [shelterProgress, setShelterProgress] = useState(0);
  const [dailySummary, setDailySummary] = useState<string[] | null>(null);

  const selectedAgent = useMemo(
    () => agents.find((agent) => agent.id === selectedAgentId) ?? agents[0],
    [agents, selectedAgentId],
  );
  const selectedAvatar = avatarPresets.find((preset) => preset.id === avatarPreset) ?? avatarPresets[0];
  const selectedCareer = careers.find((option) => option.id === career) ?? careers[0];

  useEffect(() => {
    if (screen !== "loading") return undefined;
    const timer = window.setTimeout(() => {
      setScreen("game");
      setMissionIndex(1);
      setFeed((current) => [
        { id: Date.now(), day: 1, time: "06:14", type: "founder", text: `${founderName} enters Origin Planet as the ${selectedCareer.name}.` },
        ...current,
      ]);
    }, 2200);
    return () => window.clearTimeout(timer);
  }, [founderName, screen, selectedCareer.name]);

  const beginLoading = () => {
    setResources((current) => {
      const bonus = {
        architect: { tools: 1, research: 2 }, engineer: { research: 6 }, medic: { morale: 6 },
        farmer: { food: 2 }, scout: { wood: 2 }, guardian: { morale: 10 },
      }[career];
      return Object.entries(bonus).reduce((next, [key, value]) => ({ ...next, [key]: next[key as keyof typeof next] + value }), current);
    });
    setScreen("loading");
  };

  const addFeed = (...entries: Omit<FeedEntry, "id" | "day">[]) => {
    setFeed((current) => [
      ...entries.map((entry, index) => ({ ...entry, day, id: Date.now() + index })),
      ...current,
    ]);
  };

  const updateAgent = (id: string, update: Partial<Agent>) => {
    setAgents((current) => current.map((agent) => agent.id === id ? { ...agent, ...update } : agent));
  };

  const selectAgent = (id: string) => {
    setSelectedAgentId(id);
    if (id === "mason" && missionIndex <= 1) {
      setMissionIndex(2);
      addFeed({ time: "06:38", type: "agent", text: "Mason explains that timber is available, but the camp has no reliable cutting tool." });
    }
  };

  const giveTools = () => {
    if (toolsGiven || resources.tools < 1) return;
    setToolsGiven(true);
    setMissionIndex((current) => Math.max(current, 3));
    setShelterProgress(20);
    setResources((current) => ({ ...current, tools: current.tools - 1, research: current.research + 4 }));
    updateAgent("mason", {
      mood: "Determined",
      goal: "Raise the first shelter before the storm",
      action: "Cutting timber for the shelter frame",
      memory: `${founderName} trusted me with the colony's only proper tool.`,
      trust: 65,
    });
    updateAgent("theo", { goal: "Document how better tools change construction", action: "Recording Mason's building method" });
    addFeed(
      { time: "06:42", type: "founder", text: `${founderName} gives Mason the builder tool.` },
      { time: "06:43", type: "research", text: "Tools discovered through a real survival problem." },
      { time: "06:44", type: "project", text: "Mason starts the First Shelter project (20%)." },
    );
  };

  const triggerStorm = () => {
    if (stormActive) return;
    setStormActive(true);
    setMissionIndex((current) => Math.max(current, 4));
    setResources((current) => ({ ...current, morale: Math.max(0, current.morale - 8), research: current.research + 3 }));
    setAgents((current) => current.map((agent) => {
      const reactions: Record<string, Partial<Agent>> = {
        mason: { mood: "Urgent", goal: "Finish storm shelter", action: toolsGiven ? "Raising the shelter frame" : "Waiting for a usable tool" },
        ava: { mood: "Concerned", goal: "Prepare emergency medicine", action: "Moving supplies under cover" },
        theo: { mood: "Inspired", goal: "Improve storm-resistant construction", action: "Testing stronger beam joints" },
        elsie: { mood: "Protective", goal: "Keep food dry", action: "Sealing seed crates" },
        rex: { mood: "Alert", goal: "Bring everyone inside before landfall", action: "Securing the camp perimeter" },
        nova: { mood: "Focused", goal: "Track the storm path", action: "Observing the eastern ridge" },
      };
      return { ...agent, ...reactions[agent.id] };
    }));
    addFeed(
      { time: "06:46", type: "event", text: "First Storm triggered. High winds are approaching." },
      { time: "06:47", type: "agent", text: "All six citizens abandon routine work and adopt survival goals." },
    );
  };

  const secureCamp = () => {
    if (!stormActive || missionIndex !== 4) return;
    setMissionIndex(5);
    addFeed(
      { time: "06:48", type: "founder", text: `${founderName} confirms the emergency plan without overriding citizen choices.` },
      { time: "06:49", type: "project", text: "Secure The Camp complete: every citizen has accepted an emergency role." },
    );
  };

  const submitWorldEvent = () => {
    const text = eventText.trim();
    if (!text) return;
    addFeed({ time: "06:45", type: "event", text: `[World Event] ${text}` });
    if (/storm|rain|wind/i.test(text)) triggerStorm();
    setEventText("");
  };

  const advanceDay = () => {
    const nextDay = day + 1;
    const shelterGain = toolsGiven ? (stormActive ? 45 : 35) : 0;
    const nextShelter = Math.min(100, shelterProgress + shelterGain);
    const nextFood = Math.max(0, resources.food - 1);
    const shelterCompleted = nextShelter === 100 && shelterProgress < 100;
    const summary = [
      `Six citizens consumed 1 food. ${nextFood} food remains.`,
      toolsGiven ? `Mason advanced First Shelter by ${shelterGain}% to ${nextShelter}%.` : "Shelter work stalled because Mason has no proper tool.",
      stormActive ? (shelterCompleted ? "The shelter is ready for landfall." : "The storm is closer. Safety remains at risk.") : "The storm front continues to gather beyond the ridge.",
      `Theo generated ${toolsGiven ? 5 : 2} practical research points.`,
    ];

    setDay(nextDay);
    setShelterProgress(nextShelter);
    setResources((current) => ({
      ...current,
      food: nextFood,
      research: current.research + (toolsGiven ? 5 : 2),
      morale: Math.max(0, Math.min(100, current.morale + (shelterCompleted ? 18 : stormActive ? -4 : 0))),
    }));
    setDailySummary(summary);
    setMissionIndex((current) => shelterCompleted ? Math.max(current, 7) : Math.max(current, 6));
    setFeed((current) => [
      ...(shelterCompleted ? [{ id: Date.now() + 2, day: nextDay, time: "07:00", type: "project" as const, text: "First Shelter completed. The settlement has a safe interior." }] : []),
      { id: Date.now() + 1, day: nextDay, time: "06:30", type: "research", text: `Theo converts survival work into ${toolsGiven ? 5 : 2} research points.` },
      { id: Date.now(), day: nextDay, time: "06:00", type: "world", text: `Day ${nextDay} begins on Origin Planet.` },
      ...current,
    ]);
    if (shelterCompleted) {
      updateAgent("mason", { mood: "Proud", goal: "Reinforce the settlement", action: "Inspecting the completed shelter", trust: 78, memory: `We survived because ${founderName} gave us a tool, not an order.` });
    }
  };

  const startFirstCouncil = () => {
    if (shelterProgress < 100) return;
    setMissionIndex(8);
    addFeed(
      { time: "07:15", type: "founder", text: `${founderName} calls the first settlement council.` },
      { time: "07:18", type: "agent", text: "The citizens choose food security as their next shared priority." },
      { time: "07:20", type: "world", text: "First Storm Demo complete. Origin Planet has begun to govern itself." },
    );
  };

  if (screen === "login") return <LoginScreen onContinue={() => setScreen("profile")} />;
  if (screen === "profile") return <FounderProfileScreen name={founderName} onNameChange={setFounderName} onBack={() => setScreen("login")} onContinue={() => setScreen("character")} />;
  if (screen === "character") return <CharacterCreatorScreen presets={avatarPresets} selectedId={avatarPreset} onSelect={setAvatarPreset} onBack={() => setScreen("profile")} onContinue={() => setScreen("career")} />;
  if (screen === "career") return <CareerSelectScreen career={career} onSelect={setCareer} onBack={() => setScreen("character")} onContinue={beginLoading} />;
  if (screen === "loading") return <LoadingScreen founderName={founderName} avatar={selectedAvatar} career={selectedCareer} />;

  return (
    <GameScreen>
      <header className="top-bar">
        <div className="logo-lockup"><strong>NEXUS</strong><span>WORLDS</span></div>
        <TopStat label="World" value="Origin Planet" sub="Origin Age" />
        <TopStat label="Day" value={String(day)} sub={stormActive ? "Storm watch" : "Dawn cycle"} />
        <TopStat label="Founder" value={founderName} sub={`${selectedAvatar.name} / ${selectedCareer.name}`} />
        <div className="founder-signal" style={{ "--avatar-color": selectedAvatar.color } as React.CSSProperties}><span>{selectedAvatar.name.charAt(0)}</span></div>
        <div className="resource-strip">
          <Resource label="People" value={resources.people} />
          <Resource label="Food" value={resources.food} warning />
          <Resource label="Wood" value={resources.wood} />
          <Resource label="Stone" value={resources.stone} />
          <Resource label="Tools" value={resources.tools} warning={resources.tools === 0} />
          <Resource label="Research" value={resources.research} />
          <Resource label="Morale" value={`${resources.morale}%`} warning={resources.morale < 55} />
        </div>
      </header>

      <div className="command-grid">
        <aside className="hud-panel world-status">
          <PanelTitle kicker="Colony telemetry" title="World Status" />
          <div className="mission-tracker">
            <span>Current Mission {Math.min(missionIndex + 1, missions.length)} / {missions.length}</span>
            <strong>{missions[missionIndex].name}</strong>
            <p>{missions[missionIndex].objective}</p>
          </div>
          <div className="planet-preview"><div className="planet-orb" /><span>ORIGIN / CAMP 01</span></div>
          <StatusRow label="Weather" value={stormActive ? "Severe storm" : "Cloud front"} danger />
          <StatusRow label="Threat" value={stormActive ? "High" : "Rising"} danger />
          <StatusRow label="Shelter" value={shelterProgress === 100 ? "Secure" : shelterProgress > 0 ? `${shelterProgress}%` : "None"} danger={shelterProgress < 100} />
          <StatusRow label="Food" value={`${resources.food} days`} danger={resources.food <= 3} />
          <StatusRow label="Safety" value={shelterProgress >= 70 ? "Improving" : "At risk"} danger={shelterProgress < 70} />
          <StatusRow label="Morale" value={`${resources.morale}%`} />
          <div className="project-block">
            <div><span>First Shelter</span><strong>{shelterProgress}%</strong></div>
            <ProgressBar value={shelterProgress} />
            <p>{toolsGiven ? "Mason is constructing a storm-resistant frame." : "Mason needs a tool before construction can begin."}</p>
          </div>
          <div className="milestone-block"><span>Next milestone</span><strong>{shelterProgress === 100 ? "Stabilise food" : "Build First Shelter"}</strong></div>
        </aside>

        <section className="world-stage">
          {stormActive && <div className="storm-alert"><span>Storm Incoming</span><p>High winds and heavy rain expected. Prepare the settlement.</p></div>}
          <DebugWorldScene
            agents={agents}
            selectedAgentId={selectedAgentId}
            onSelectAgent={selectAgent}
            stormActive={stormActive}
            shelterProgress={shelterProgress}
          />
          <div className="creator-tools">
            <button type="button" onClick={giveTools} disabled={toolsGiven}>Give Tools</button>
            <button type="button" onClick={triggerStorm} disabled={stormActive}>Trigger Storm</button>
            <button type="button" onClick={secureCamp} disabled={!stormActive || missionIndex !== 4}>Secure Camp</button>
            <button type="button" onClick={() => addFeed({ time: "06:48", type: "founder", text: "The Founder blesses the camp with 2 wood." })}>Bless Resource</button>
            <button type="button" onClick={() => addFeed({ time: "06:49", type: "world", text: "Nova discovers a sheltered route beyond the ridge." })}>Reveal Land</button>
            <button type="button" onClick={startFirstCouncil} disabled={shelterProgress < 100 || missionIndex >= 8}>First Council</button>
          </div>
        </section>

        <aside className="hud-panel agent-inspector">
          <PanelTitle kicker="Citizen link" title={`Selected: ${selectedAgent.name}`} />
          <div className="agent-identity"><div>{selectedAgent.name.charAt(0)}</div><span><strong>{selectedAgent.name}</strong><small>{selectedAgent.role} / {selectedAgent.skill}</small></span></div>
          <AgentMetric label="Energy" value={selectedAgent.energy} />
          <AgentMetric label="Health" value={selectedAgent.health} good />
          <InfoSection label="Mood" value={selectedAgent.mood} />
          <InfoSection label="Current goal" value={selectedAgent.goal} />
          <InfoSection label="Current action" value={selectedAgent.action} />
          <InfoSection label="Recent memory" value={selectedAgent.memory} />
          <AgentMetric label="Trust in Founder" value={selectedAgent.trust} good />
          {selectedAgent.id === "mason" && missionIndex <= 1 && <button type="button" className="secondary-action inspector-action" onClick={() => selectAgent("mason")}>Speak with Mason</button>}
          {selectedAgent.id === "mason" && <button type="button" className="primary-action inspector-action" onClick={giveTools} disabled={toolsGiven}>{toolsGiven ? "Tools Delivered" : "Give Mason Tools"}</button>}
        </aside>
      </div>

      <div className="bottom-grid">
        <section className="hud-panel activity-panel">
          <PanelTitle kicker="Live colony record" title="Activity Feed" />
          <div className="feed-list">
            {feed.slice(0, 9).map((entry) => <div className={`feed-line ${feedColors[entry.type]}`} key={entry.id}><time>D{entry.day} {entry.time}</time><span>{entry.text}</span></div>)}
          </div>
        </section>
        <section className="hud-panel event-panel">
          <PanelTitle kicker="Founder intervention" title="World Event" />
          <textarea value={eventText} onChange={(event) => setEventText(event.target.value)} aria-label="World event" placeholder="Describe a local world event..." />
          <button type="button" className="secondary-action" onClick={submitWorldEvent}>Trigger Event</button>
        </section>
        <section className="hud-panel advance-panel">
          <PanelTitle kicker="Manual simulation" title="Advance Day" />
          <p>Move time forward and let every citizen work toward their current goal.</p>
          <button type="button" className="primary-action" onClick={advanceDay} disabled={missionIndex < 5}>Advance to Day {day + 1}</button>
        </section>
        <section className="hud-panel tech-panel">
          <PanelTitle kicker="Problem-led evolution" title="Tech Tree" />
          <div className="tech-strip">
            <TechNode name="Fire" state="complete" progress={100} />
            <TechNode name="Tools" state={toolsGiven ? "complete" : "ready"} progress={toolsGiven ? 100 : 65} />
            <TechNode name="Construction" state={shelterProgress > 0 ? "active" : "locked"} progress={shelterProgress} />
            <TechNode name="Farming" state="locked" progress={0} />
            <TechNode name="Storage" state="locked" progress={0} />
            <TechNode name="Electricity" state="locked" progress={0} />
            <TechNode name="Vehicles" state="locked" progress={0} />
            <TechNode name="Flying Cars" state="locked" progress={0} />
            <TechNode name="Spaceport" state="locked" progress={0} />
          </div>
        </section>
      </div>

      {dailySummary && (
        <div className="summary-backdrop" role="dialog" aria-modal="true" aria-labelledby="daily-summary-title">
          <section className="daily-summary">
            <p className="eyebrow">Origin Planet report</p>
            <h2 id="daily-summary-title">Day {day} Summary</h2>
            {dailySummary.map((item) => <p key={item}>{item}</p>)}
            <button type="button" className="primary-action" onClick={() => setDailySummary(null)}>Return to World</button>
          </section>
        </div>
      )}
    </GameScreen>
  );
}

function LoginScreen({ onContinue }: { onContinue: () => void }): React.JSX.Element {
  return (
    <main className="entry-screen login-screen">
      <section className="entry-panel login-panel">
        <p className="brand-mark">NEXUS <span>WORLDS</span></p>
        <p className="eyebrow">First Storm Demo</p>
        <h1>A civilisation is waiting for its Founder.</h1>
        <p className="entry-copy">Six people are stranded on Origin Planet. There is no shelter, food is low, and a storm is coming. Enter as a local guest and shape what happens next.</p>
        <button type="button" className="primary-action enter-world" onClick={onContinue}>Continue as Guest</button>
        <p className="legal-note">No account required. Profile data remains in local React state.</p>
      </section>
    </main>
  );
}

function FounderProfileScreen({ name, onNameChange, onBack, onContinue }: { name: string; onNameChange: (value: string) => void; onBack: () => void; onContinue: () => void }): React.JSX.Element {
  return (
    <main className="entry-screen">
      <section className="entry-panel">
        <OnboardingStep current={1} title="Founder Profile" />
        <p className="eyebrow">Identity initialization</p>
        <h1>Name the presence behind this world.</h1>
        <p className="entry-copy">Citizens will remember your interventions and form their own opinion of the Founder over time.</p>
        <label className="profile-field"><span>Founder name</span><input value={name} onChange={(event) => onNameChange(event.target.value)} maxLength={28} autoFocus /></label>
        <ScreenActions onBack={onBack} onContinue={onContinue} disabled={!name.trim()} label="Create Character" />
      </section>
    </main>
  );
}

function CharacterCreatorScreen({ presets, selectedId, onSelect, onBack, onContinue }: { presets: typeof avatarPresets; selectedId: string; onSelect: (id: string) => void; onBack: () => void; onContinue: () => void }): React.JSX.Element {
  return (
    <main className="entry-screen">
      <section className="entry-panel">
        <OnboardingStep current={2} title="Character Creator" />
        <p className="eyebrow">Founder signal</p>
        <h1>Choose how the world senses you.</h1>
        <p className="entry-copy">Your Founder remains a first-person, unseen presence. This preset defines the signal colour citizens associate with you.</p>
        <div className="avatar-grid">
          {presets.map((preset) => (
            <button type="button" key={preset.id} onClick={() => onSelect(preset.id)} className={`avatar-option ${selectedId === preset.id ? "selected" : ""}`}>
              <span className="avatar-preview" style={{ "--avatar-color": preset.color } as React.CSSProperties}>{preset.name.charAt(0)}</span>
              <strong>{preset.name}</strong><small>{preset.detail}</small>
            </button>
          ))}
        </div>
        <ScreenActions onBack={onBack} onContinue={onContinue} label="Choose Career" />
      </section>
    </main>
  );
}

function CareerSelectScreen({ career, onSelect, onBack, onContinue }: { career: CareerId; onSelect: (id: CareerId) => void; onBack: () => void; onContinue: () => void }): React.JSX.Element {
  return (
    <main className="entry-screen">
      <section className="entry-panel wide-entry-panel">
        <OnboardingStep current={3} title="Career Select" />
        <p className="eyebrow">Opening specialisation</p>
        <h1>Decide what you notice first.</h1>
        <p className="entry-copy">Careers provide a small starting advantage and flavour. They do not lock future technology or decisions.</p>
        <div className="career-grid" aria-label="Choose a Founder career">
          {careers.map((option) => (
            <button key={option.id} type="button" className={`career-option ${career === option.id ? "selected" : ""}`} onClick={() => onSelect(option.id)}>
              <strong>{option.name}</strong><span>{option.description}</span><small>{option.gift}</small>
            </button>
          ))}
        </div>
        <p className="career-opening">{careers.find((option) => option.id === career)?.opening}</p>
        <ScreenActions onBack={onBack} onContinue={onContinue} label="Deploy to Origin Planet" />
      </section>
    </main>
  );
}

function LoadingScreen({ founderName, avatar, career }: { founderName: string; avatar: typeof avatarPresets[number]; career: typeof careers[number] }): React.JSX.Element {
  return (
    <main className="loading-screen">
      <div className="loading-planet"><div /></div>
      <section className="loading-copy">
        <p className="brand-mark">NEXUS <span>WORLDS</span></p>
        <p className="eyebrow">Transit link established</p>
        <h1>Origin Planet</h1>
        <p>Day 1. Six survivors. No shelter. Storm probability rising.</p>
        <div className="loading-profile"><span className="avatar-preview" style={{ "--avatar-color": avatar.color } as React.CSSProperties}>{avatar.name.charAt(0)}</span><div><strong>{founderName}</strong><small>{career.name} / {avatar.name} signal</small></div></div>
        <div className="loading-track"><span /></div>
        <small>Initializing local civilisation simulation...</small>
      </section>
    </main>
  );
}

function GameScreen({ children }: { children: React.ReactNode }): React.JSX.Element {
  return <main className="game-shell">{children}</main>;
}

function OnboardingStep({ current, title }: { current: number; title: string }): React.JSX.Element {
  return <div className="onboarding-step"><span>Step {current} / 3</span><strong>{title}</strong></div>;
}

function ScreenActions({ onBack, onContinue, label, disabled = false }: { onBack: () => void; onContinue: () => void; label: string; disabled?: boolean }): React.JSX.Element {
  return <div className="screen-actions"><button type="button" className="secondary-action" onClick={onBack}>Back</button><button type="button" className="primary-action" onClick={onContinue} disabled={disabled}>{label}</button></div>;
}

function TopStat({ label, value, sub }: { label: string; value: string; sub: string }): React.JSX.Element {
  return <div className="top-stat"><span>{label}</span><strong>{value}</strong><small>{sub}</small></div>;
}

function Resource({ label, value, warning = false }: { label: string; value: string | number; warning?: boolean }): React.JSX.Element {
  return <div className={warning ? "resource warning" : "resource"}><span>{label}</span><strong>{value}</strong></div>;
}

function PanelTitle({ kicker, title }: { kicker: string; title: string }): React.JSX.Element {
  return <div className="panel-title"><span>{kicker}</span><h2>{title}</h2></div>;
}

function StatusRow({ label, value, danger = false }: { label: string; value: string; danger?: boolean }): React.JSX.Element {
  return <div className="status-row"><span>{label}</span><strong className={danger ? "danger" : ""}>{value}</strong></div>;
}

function ProgressBar({ value }: { value: number }): React.JSX.Element {
  return <div className="progress-track"><span style={{ width: `${value}%` }} /></div>;
}

function AgentMetric({ label, value, good = false }: { label: string; value: number; good?: boolean }): React.JSX.Element {
  return <div className="agent-metric"><div><span>{label}</span><strong>{value}%</strong></div><div className="progress-track"><span className={good ? "good" : ""} style={{ width: `${value}%` }} /></div></div>;
}

function InfoSection({ label, value }: { label: string; value: string }): React.JSX.Element {
  return <div className="info-section"><span>{label}</span><p>{value}</p></div>;
}

function TechNode({ name, state, progress }: { name: string; state: "complete" | "ready" | "active" | "locked"; progress: number }): React.JSX.Element {
  return <div className={`tech-node ${state}`}><strong>{name}</strong><span>{state === "complete" ? "Complete" : state === "locked" ? "Locked" : `${progress}%`}</span><ProgressBar value={progress} /></div>;
}

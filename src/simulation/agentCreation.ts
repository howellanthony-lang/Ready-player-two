import type { Agent, AgentJob, AgentLifeStage, AgentOrigin, BuildingId, PlanetProgress } from "./types";

export const MIN_AGENT_POPULATION = 6;
export const DAILY_AGENT_TARGET = 50;
export const MAX_AGENT_POPULATION = 50;

interface AgentTemplate {
  name: string;
  role: string;
  job: AgentJob;
  origin: AgentOrigin;
  lifeStage: AgentLifeStage;
  personality: string;
  backstory: string;
  currentGoal: string;
  longTermGoal: string;
  startingMemory: string;
  locationId: string;
}

interface RoleNeed {
  role: string;
  job: AgentJob;
  requiredBuilding?: BuildingId;
  reason: string;
}

const roleNeeds: RoleNeed[] = [
  {
    role: "Blacksmith",
    job: "blacksmith",
    requiredBuilding: "workshop",
    reason: "The workshop exists, but nobody can craft better tools yet."
  },
  {
    role: "Farmer",
    job: "farmer",
    requiredBuilding: "farm",
    reason: "The settlement needs a steady food specialist."
  },
  {
    role: "Teacher",
    job: "teacher",
    requiredBuilding: "school",
    reason: "The school needs someone to turn knowledge into culture."
  },
  {
    role: "Merchant",
    job: "merchant",
    requiredBuilding: "market",
    reason: "The market has opened and trade needs a human face."
  },
  {
    role: "Medic",
    job: "medic",
    requiredBuilding: "hospital",
    reason: "The hospital needs a healer to care for the growing town."
  },
  {
    role: "Scientist",
    job: "scientist",
    requiredBuilding: "research_lab",
    reason: "The research lab needs a specialist to turn ideas into breakthroughs."
  },
  {
    role: "Pilot",
    job: "pilot",
    requiredBuilding: "flying_car_depot",
    reason: "Flying cars are available, but the city needs trained sky traffic pilots."
  }
];

const starterBackfill: AgentTemplate[] = [
  {
    name: "Ava Stone",
    role: "Medic",
    job: "medic",
    origin: "migration",
    lifeStage: "newcomer",
    personality: "Calm, practical, protective",
    backstory: "Ava followed the first settlement beacon after hearing it needed steady hands.",
    currentGoal: "Set up a safe place to treat minor injuries.",
    longTermGoal: "Build a trusted health network for the town.",
    startingMemory: "Ava remembers arriving with a satchel of medical notes and a promise to help.",
    locationId: "settlement_gate"
  },
  {
    name: "Rex Calder",
    role: "Guard",
    job: "guard",
    origin: "migration",
    lifeStage: "newcomer",
    personality: "Watchful, blunt, loyal",
    backstory: "Rex came to Ironvale after guarding trade trails between smaller camps.",
    currentGoal: "Walk the settlement edge and learn who needs protection.",
    longTermGoal: "Keep the growing civilisation safe without making it fearful.",
    startingMemory: "Rex remembers the quiet road into town and the first campfire smoke on the horizon.",
    locationId: "settlement_gate"
  }
];

const generatedTemplates: Record<AgentJob, AgentTemplate[]> = {
  forager: [],
  builder: [],
  farmer: [
    {
      name: "Nia Hart",
      role: "Farmer",
      job: "farmer",
      origin: "migration",
      lifeStage: "newcomer",
      personality: "Patient, observant, stubborn",
      backstory: "Nia arrived after hearing the soil around Ironvale was finally ready for crops.",
      currentGoal: "Inspect the fields and organise the first harvest plan.",
      longTermGoal: "Make sure nobody in Ironvale fears hunger again.",
      startingMemory: "Nia remembers marking the wind direction and soil texture on her first morning.",
      locationId: "farm"
    }
  ],
  blacksmith: [
    {
      name: "Branna Cole",
      role: "Blacksmith",
      job: "blacksmith",
      origin: "migration",
      lifeStage: "newcomer",
      personality: "Direct, proud, reliable",
      backstory: "Branna travelled to Ironvale after hearing the town had built a new workshop.",
      currentGoal: "Inspect the workshop and meet the builders.",
      longTermGoal: "Become Ironvale's master craftswoman.",
      startingMemory: "Branna remembers the ring of an empty workshop waiting for its first hammer strike.",
      locationId: "workshop"
    }
  ],
  teacher: [
    {
      name: "Mara Bell",
      role: "Teacher",
      job: "teacher",
      origin: "migration",
      lifeStage: "newcomer",
      personality: "Patient, organised, warm",
      backstory: "Mara came to Ironvale because a town with a school needs shared memory.",
      currentGoal: "Open the first lesson and learn each citizen's strengths.",
      longTermGoal: "Create a generation of citizens who can outthink every crisis.",
      startingMemory: "Mara remembers placing chalk on the first school table before sunrise.",
      locationId: "school"
    }
  ],
  guard: [],
  medic: [],
  engineer: [],
  merchant: [
    {
      name: "Theo Vale",
      role: "Merchant",
      job: "merchant",
      origin: "world_event",
      lifeStage: "traveller",
      personality: "Charming, restless, sharp",
      backstory: "Theo arrived with a trade caravan and decided Ironvale was worth the risk.",
      currentGoal: "Price local goods and find the town's first trade route.",
      longTermGoal: "Make Ironvale the place every caravan wants to reach.",
      startingMemory: "Theo remembers the market stalls being unfinished but full of possibility.",
      locationId: "market"
    }
  ],
  scientist: [
    {
      name: "Lin Okoye",
      role: "Scientist",
      job: "scientist",
      origin: "ai_generated",
      lifeStage: "worker",
      personality: "Curious, exacting, optimistic",
      backstory: "Lin was recruited by the world council when the research lab came online.",
      currentGoal: "Stabilise the lab and choose the first major research question.",
      longTermGoal: "Push Ironvale from industry into a cleaner, smarter future.",
      startingMemory: "Lin remembers the first lab terminal blinking awake.",
      locationId: "research_lab"
    }
  ],
  researcher: [],
  pilot: [
    {
      name: "Juno Pierce",
      role: "Pilot",
      job: "pilot",
      origin: "apprentice",
      lifeStage: "apprentice",
      personality: "Brave, focused, playful",
      backstory: "Juno trained on ground vehicles before anti-gravity transport changed everything.",
      currentGoal: "Test the flying car depot's first route.",
      longTermGoal: "Make sky travel safe enough for ordinary citizens.",
      startingMemory: "Juno remembers seeing the first hover lane shimmer above the depot.",
      locationId: "flying_car_depot"
    }
  ]
};

export const starterAgents = (): Agent[] => [
  createAgentFromTemplate({
    name: "Mason Briggs",
    role: "Builder",
    job: "builder",
    origin: "starter",
    lifeStage: "resident",
    personality: "Steady, inventive, protective",
    backstory: "Mason helped raise the first shelters from salvaged timber.",
    currentGoal: "Keep basic construction moving.",
    longTermGoal: "Turn the settlement into a town that can withstand bad years.",
    startingMemory: "Mason remembers the first shelter frame holding through the night.",
    locationId: "camp"
  }, 1, 1),
  createAgentFromTemplate({
    name: "Ari Vale",
    role: "Forager",
    job: "forager",
    origin: "starter",
    lifeStage: "resident",
    personality: "Alert, generous, quietly funny",
    backstory: "Ari mapped the nearby waterline and safe gathering routes.",
    currentGoal: "Find enough supplies for the next day.",
    longTermGoal: "Make the wild land feel known instead of frightening.",
    startingMemory: "Ari remembers finding the stream that made Day 1 possible.",
    locationId: "woods"
  }, 1, 2),
  createAgentFromTemplate({
    name: "Sera Quill",
    role: "Teacher",
    job: "teacher",
    origin: "starter",
    lifeStage: "resident",
    personality: "Curious, careful, encouraging",
    backstory: "Sera began recording the settlement's discoveries before there was a school.",
    currentGoal: "Write down the lessons everyone is learning.",
    longTermGoal: "Make knowledge survive longer than any one citizen.",
    startingMemory: "Sera remembers naming the first shared notebook the town archive.",
    locationId: "camp"
  }, 1, 3),
  createAgentFromTemplate({
    name: "Vale Noor",
    role: "Researcher",
    job: "researcher",
    origin: "starter",
    lifeStage: "resident",
    personality: "Dreamy, intense, generous",
    backstory: "Vale sees patterns in small improvements and turns them into experiments.",
    currentGoal: "Test which ideas create the most progress.",
    longTermGoal: "Help the town discover technology fast enough to shape its own future.",
    startingMemory: "Vale remembers the first spark that made fire feel like destiny.",
    locationId: "camp"
  }, 1, 4)
];

export const createAgentFromWorldNeed = (progress: PlanetProgress): Agent | null => {
  if (progress.currentDay === progress.lastAgentCreationCheckDay || progress.agents.length >= MAX_AGENT_POPULATION) {
    return null;
  }

  const backfill = starterBackfill.find((template) => !hasJob(progress, template.job));

  if (progress.agents.length < MIN_AGENT_POPULATION && backfill) {
    return createAgentFromTemplate(backfill, progress.currentDay, progress.agents.length + 1);
  }

  const need = roleNeeds.find((candidate) => {
    const buildingReady = !candidate.requiredBuilding || progress.completedBuildings.includes(candidate.requiredBuilding);
    return buildingReady && !hasJob(progress, candidate.job);
  });

  if (!need) {
    return null;
  }

  const template = generatedTemplates[need.job][0];

  if (!template) {
    return null;
  }

  return {
    ...createAgentFromTemplate(template, progress.currentDay, progress.agents.length + 1),
    startingMemory: `${template.startingMemory} Reason for arrival: ${need.reason}`
  };
};

export const createAgentsForDailyPopulationTarget = (progress: PlanetProgress): Agent[] => {
  if (progress.currentDay === progress.lastAgentCreationCheckDay || progress.agents.length >= MAX_AGENT_POPULATION) {
    return [];
  }

  const newAgents: Agent[] = [];
  const targetCount = Math.min(DAILY_AGENT_TARGET, MAX_AGENT_POPULATION);

  while (progress.agents.length + newAgents.length < targetCount) {
    const projectedProgress = {
      ...progress,
      agents: [...progress.agents, ...newAgents]
    };
    const neededAgent = createAgentFromWorldNeed(projectedProgress);

    if (neededAgent) {
      newAgents.push({
        ...neededAgent,
        id: `agent-${progress.currentDay}-${progress.agents.length + newAgents.length + 1}-${neededAgent.job}`
      });
      continue;
    }

    newAgents.push(createBackgroundCitizen(progress.currentDay, progress.agents.length + newAgents.length + 1));
  }

  return newAgents;
};

const createAgentFromTemplate = (template: AgentTemplate, day: number, sequence: number): Agent => ({
  id: `agent-${day}-${sequence}-${template.job}`,
  name: template.name,
  role: template.role,
  job: template.job,
  species: "human",
  ageBand: "adult",
  origin: template.origin,
  lifeStage: template.lifeStage,
  personality: template.personality,
  backstory: template.backstory,
  mood: "curious",
  needs: {
    energy: 75,
    food: 70,
    social: 55,
    safety: 65,
    purpose: 80,
    health: 85,
    money: 35
  },
  currentGoal: template.currentGoal,
  longTermGoal: template.longTermGoal,
  startingMemory: template.startingMemory,
  locationId: template.locationId,
  createdAtDay: day
});

const createBackgroundCitizen = (day: number, sequence: number): Agent => {
  const jobs: AgentJob[] = ["forager", "builder", "farmer", "guard", "merchant", "researcher", "engineer"];
  const job = jobs[sequence % jobs.length];
  const name = generatedCitizenNames[(sequence - 1) % generatedCitizenNames.length];
  const role = roleForJob(job);

  return createAgentFromTemplate(
    {
      name,
      role,
      job,
      origin: "ai_generated",
      lifeStage: "newcomer",
      personality: generatedPersonalities[sequence % generatedPersonalities.length],
      backstory: `${name} emerged from Ironvale's rapid growth program as the town expanded its population target.`,
      currentGoal: `Find useful ${role.toLowerCase()} work and meet the first neighbours.`,
      longTermGoal: "Become part of a stable, self-sustaining civilisation.",
      startingMemory: `${name} remembers arriving during the first major population surge on Day ${day}.`,
      locationId: "settlement_gate"
    },
    day,
    sequence
  );
};

const roleForJob = (job: AgentJob): string => {
  const roles: Record<AgentJob, string> = {
    forager: "Forager",
    builder: "Builder",
    farmer: "Farmer",
    blacksmith: "Blacksmith",
    teacher: "Teacher",
    guard: "Guard",
    medic: "Medic",
    engineer: "Engineer",
    merchant: "Merchant",
    scientist: "Scientist",
    researcher: "Researcher",
    pilot: "Pilot"
  };

  return roles[job];
};

const hasJob = (progress: PlanetProgress, job: AgentJob): boolean => progress.agents.some((agent) => agent.job === job);

const generatedCitizenNames = [
  "Ira North",
  "Lena Cross",
  "Oren Pike",
  "Talia Reed",
  "Noor Ellis",
  "Cato Wynn",
  "Mina Sol",
  "Jace Rowan",
  "Elian Fox",
  "Rhea Moss",
  "Tobin Hale",
  "Kaia Flint",
  "Milo Penn",
  "Zara Voss",
  "Eden Shaw",
  "Pax Rivers",
  "Lio Mercer",
  "Vera Quinn",
  "Soren Ash",
  "Nell Frost",
  "Remy Lane",
  "Iris Vale",
  "Otis Reed",
  "Mira Stone",
  "Cal West",
  "June Marr",
  "Theo Nash",
  "Ada Locke",
  "Finn Cole",
  "Lyra Bloom",
  "Ezra Ford",
  "Nova Grey",
  "Mace Bell",
  "Kira Wells",
  "Arlo Finch",
  "Sia Brooks",
  "Leon Ward",
  "Maeve Hill",
  "Rafi Kent",
  "Tess Archer",
  "Nico Page",
  "Wren Holt",
  "Isla Moon",
  "Dax King",
  "Cleo Park",
  "Hugo Bright"
];

const generatedPersonalities = [
  "Practical, friendly, eager",
  "Quiet, observant, dependable",
  "Bold, warm, impatient",
  "Curious, careful, optimistic",
  "Organised, dry-humoured, loyal",
  "Restless, inventive, sociable",
  "Patient, resilient, direct"
];

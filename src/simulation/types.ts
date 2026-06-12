export type CivilisationAge =
  | "origin"
  | "settlement"
  | "town"
  | "industrial"
  | "electrical"
  | "digital"
  | "futuristic";

export type SpeedMode = "realistic" | "fast" | "founder" | "god";

export type ProgressPoint =
  | "knowledge"
  | "infrastructure"
  | "culture"
  | "economy"
  | "energy"
  | "transport"
  | "research";

export type TechnologyId =
  | "fire"
  | "tools"
  | "farming"
  | "storage"
  | "construction"
  | "trade"
  | "education"
  | "engineering"
  | "metalworking"
  | "steam_power"
  | "electricity"
  | "combustion_vehicles"
  | "computing"
  | "robotics"
  | "artificial_intelligence"
  | "clean_energy"
  | "anti_gravity"
  | "flying_cars"
  | "spaceflight";

export type BuildingId =
  | "campfire"
  | "shelter"
  | "storage_hut"
  | "farm"
  | "workshop"
  | "school"
  | "market"
  | "factory"
  | "power_station"
  | "hospital"
  | "university"
  | "research_lab"
  | "data_centre"
  | "robot_factory"
  | "anti_gravity_lab"
  | "flying_car_depot"
  | "spaceport";

export type AgentJob =
  | "forager"
  | "builder"
  | "farmer"
  | "blacksmith"
  | "teacher"
  | "guard"
  | "medic"
  | "engineer"
  | "merchant"
  | "scientist"
  | "researcher"
  | "pilot";

export type AgentOrigin =
  | "starter"
  | "migration"
  | "world_event"
  | "apprentice"
  | "player_created"
  | "ai_generated";

export type AgentLifeStage =
  | "newcomer"
  | "resident"
  | "apprentice"
  | "worker"
  | "leader"
  | "traveller";

export type AgentNeed = "energy" | "food" | "social" | "safety" | "purpose" | "health" | "money";

export type ActivityType =
  | "age_reached"
  | "technology_discovered"
  | "building_started"
  | "building_completed"
  | "futuristic_technology_unlocked"
  | "new_arrival";

export type ProgressPoints = Record<ProgressPoint, number>;
export type AgentNeeds = Record<AgentNeed, number>;

export interface TechnologyDefinition {
  id: TechnologyId;
  name: string;
  researchCost: number;
  prerequisites: TechnologyId[];
  futuristic?: boolean;
}

export interface BuildingDefinition {
  id: BuildingId;
  name: string;
  requiredTechnology: TechnologyId;
  buildCost: number;
  buildDays: number;
  yields: Partial<ProgressPoints>;
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  job: AgentJob;
  species: string;
  ageBand: "young" | "adult" | "older";
  origin: AgentOrigin;
  lifeStage: AgentLifeStage;
  personality: string;
  backstory: string;
  mood: string;
  needs: AgentNeeds;
  currentGoal: string;
  longTermGoal: string;
  startingMemory: string;
  locationId: string;
  createdAtDay: number;
}

export interface BuildingProject {
  buildingId: BuildingId;
  startedDay: number;
  remainingDays: number;
}

export interface ActivityFeedEntry {
  id: string;
  day: number;
  type: ActivityType;
  title: string;
  detail: string;
}

export interface PlanetProgress {
  currentDay: number;
  currentAge: CivilisationAge;
  points: ProgressPoints;
  speedMode: SpeedMode;
  unlockedTechnologies: TechnologyId[];
  completedBuildings: BuildingId[];
  activeBuildings: BuildingProject[];
  agents: Agent[];
  lastAgentCreationCheckDay: number;
  activityFeed: ActivityFeedEntry[];
}

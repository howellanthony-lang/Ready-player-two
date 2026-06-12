import type {
  AgentJob,
  BuildingDefinition,
  BuildingId,
  CivilisationAge,
  ProgressPoints,
  SpeedMode,
  TechnologyDefinition,
  TechnologyId
} from "./types";

export const civilisationAges: CivilisationAge[] = [
  "origin",
  "settlement",
  "town",
  "industrial",
  "electrical",
  "digital",
  "futuristic"
];

export const speedMultipliers: Record<SpeedMode, number> = {
  realistic: 1,
  fast: 3,
  founder: 8,
  god: 25
};

export const emptyProgressPoints = (): ProgressPoints => ({
  knowledge: 0,
  infrastructure: 0,
  culture: 0,
  economy: 0,
  energy: 0,
  transport: 0,
  research: 0
});

export const jobYields: Record<AgentJob, Partial<ProgressPoints>> = {
  forager: { economy: 1, culture: 0.2 },
  builder: { infrastructure: 1.2 },
  farmer: { economy: 1.1, culture: 0.2 },
  blacksmith: { infrastructure: 1, economy: 0.4, research: 0.2 },
  teacher: { knowledge: 1, culture: 0.4, research: 0.3 },
  guard: { culture: 0.3, infrastructure: 0.2 },
  medic: { knowledge: 0.6, culture: 0.5 },
  engineer: { infrastructure: 0.8, energy: 0.5, research: 0.6 },
  merchant: { economy: 1.4, culture: 0.2 },
  scientist: { knowledge: 1, research: 1.4 },
  researcher: { knowledge: 0.7, research: 1.5 },
  pilot: { transport: 1.2, research: 0.3 }
};

export const technologyDefinitions: Record<TechnologyId, TechnologyDefinition> = {
  fire: { id: "fire", name: "Fire", researchCost: 5, prerequisites: [] },
  tools: { id: "tools", name: "Tools", researchCost: 10, prerequisites: ["fire"] },
  farming: { id: "farming", name: "Farming", researchCost: 16, prerequisites: ["tools"] },
  storage: { id: "storage", name: "Storage", researchCost: 18, prerequisites: ["tools"] },
  construction: { id: "construction", name: "Construction", researchCost: 24, prerequisites: ["storage"] },
  trade: { id: "trade", name: "Trade", researchCost: 32, prerequisites: ["farming", "storage"] },
  education: { id: "education", name: "Education", researchCost: 42, prerequisites: ["construction"] },
  engineering: { id: "engineering", name: "Engineering", researchCost: 58, prerequisites: ["education"] },
  metalworking: { id: "metalworking", name: "Metalworking", researchCost: 72, prerequisites: ["engineering"] },
  steam_power: { id: "steam_power", name: "Steam Power", researchCost: 96, prerequisites: ["metalworking"] },
  electricity: { id: "electricity", name: "Electricity", researchCost: 132, prerequisites: ["steam_power"] },
  combustion_vehicles: {
    id: "combustion_vehicles",
    name: "Combustion Vehicles",
    researchCost: 156,
    prerequisites: ["electricity"]
  },
  computing: { id: "computing", name: "Computing", researchCost: 210, prerequisites: ["electricity"] },
  robotics: { id: "robotics", name: "Robotics", researchCost: 280, prerequisites: ["computing"] },
  artificial_intelligence: {
    id: "artificial_intelligence",
    name: "Artificial Intelligence",
    researchCost: 360,
    prerequisites: ["robotics"]
  },
  clean_energy: {
    id: "clean_energy",
    name: "Clean Energy",
    researchCost: 390,
    prerequisites: ["electricity", "computing"]
  },
  anti_gravity: {
    id: "anti_gravity",
    name: "Anti-Gravity",
    researchCost: 520,
    prerequisites: ["artificial_intelligence", "clean_energy"],
    futuristic: true
  },
  flying_cars: {
    id: "flying_cars",
    name: "Flying Cars",
    researchCost: 620,
    prerequisites: ["anti_gravity"],
    futuristic: true
  },
  spaceflight: {
    id: "spaceflight",
    name: "Spaceflight",
    researchCost: 760,
    prerequisites: ["flying_cars"],
    futuristic: true
  }
};

export const buildingDefinitions: Record<BuildingId, BuildingDefinition> = {
  campfire: {
    id: "campfire",
    name: "Campfire",
    requiredTechnology: "fire",
    buildCost: 2,
    buildDays: 1,
    yields: { culture: 0.4, knowledge: 0.2 }
  },
  shelter: {
    id: "shelter",
    name: "Shelter",
    requiredTechnology: "tools",
    buildCost: 5,
    buildDays: 1,
    yields: { infrastructure: 0.5, culture: 0.2 }
  },
  storage_hut: {
    id: "storage_hut",
    name: "Storage Hut",
    requiredTechnology: "storage",
    buildCost: 8,
    buildDays: 2,
    yields: { economy: 0.6, infrastructure: 0.3 }
  },
  farm: {
    id: "farm",
    name: "Farm",
    requiredTechnology: "farming",
    buildCost: 10,
    buildDays: 2,
    yields: { economy: 0.9, culture: 0.2 }
  },
  workshop: {
    id: "workshop",
    name: "Workshop",
    requiredTechnology: "construction",
    buildCost: 16,
    buildDays: 2,
    yields: { infrastructure: 0.9, research: 0.2 }
  },
  school: {
    id: "school",
    name: "School",
    requiredTechnology: "education",
    buildCost: 24,
    buildDays: 3,
    yields: { knowledge: 1.1, culture: 0.4, research: 0.4 }
  },
  market: {
    id: "market",
    name: "Market",
    requiredTechnology: "trade",
    buildCost: 26,
    buildDays: 3,
    yields: { economy: 1.2, culture: 0.3 }
  },
  factory: {
    id: "factory",
    name: "Factory",
    requiredTechnology: "steam_power",
    buildCost: 44,
    buildDays: 4,
    yields: { infrastructure: 1.7, economy: 1, energy: 0.4 }
  },
  power_station: {
    id: "power_station",
    name: "Power Station",
    requiredTechnology: "electricity",
    buildCost: 58,
    buildDays: 4,
    yields: { energy: 2, infrastructure: 0.6 }
  },
  hospital: {
    id: "hospital",
    name: "Hospital",
    requiredTechnology: "electricity",
    buildCost: 62,
    buildDays: 4,
    yields: { culture: 1, knowledge: 0.5 }
  },
  university: {
    id: "university",
    name: "University",
    requiredTechnology: "engineering",
    buildCost: 70,
    buildDays: 5,
    yields: { knowledge: 2, research: 1.4, culture: 0.6 }
  },
  research_lab: {
    id: "research_lab",
    name: "Research Lab",
    requiredTechnology: "computing",
    buildCost: 92,
    buildDays: 5,
    yields: { research: 2.6, knowledge: 0.8, energy: 0.4 }
  },
  data_centre: {
    id: "data_centre",
    name: "Data Centre",
    requiredTechnology: "computing",
    buildCost: 118,
    buildDays: 5,
    yields: { knowledge: 1.5, research: 1.2, energy: 1 }
  },
  robot_factory: {
    id: "robot_factory",
    name: "Robot Factory",
    requiredTechnology: "robotics",
    buildCost: 150,
    buildDays: 6,
    yields: { infrastructure: 2.2, economy: 1.5, research: 0.8 }
  },
  anti_gravity_lab: {
    id: "anti_gravity_lab",
    name: "Anti-Gravity Lab",
    requiredTechnology: "anti_gravity",
    buildCost: 190,
    buildDays: 6,
    yields: { research: 3.5, transport: 1.4, energy: 1 }
  },
  flying_car_depot: {
    id: "flying_car_depot",
    name: "Flying Car Depot",
    requiredTechnology: "flying_cars",
    buildCost: 230,
    buildDays: 6,
    yields: { transport: 4, economy: 1.6, culture: 0.8 }
  },
  spaceport: {
    id: "spaceport",
    name: "Spaceport",
    requiredTechnology: "spaceflight",
    buildCost: 320,
    buildDays: 8,
    yields: { transport: 4.5, research: 2.4, economy: 2.2, culture: 1.2 }
  }
};

export const ageMilestones: Record<CivilisationAge, { technologies: TechnologyId[]; buildings: BuildingId[] }> = {
  origin: { technologies: [], buildings: [] },
  settlement: { technologies: ["fire"], buildings: ["campfire", "shelter"] },
  town: { technologies: ["trade", "education"], buildings: ["market", "school"] },
  industrial: { technologies: ["steam_power"], buildings: ["factory"] },
  electrical: { technologies: ["electricity"], buildings: ["power_station"] },
  digital: { technologies: ["computing"], buildings: ["research_lab", "data_centre"] },
  futuristic: { technologies: ["anti_gravity", "flying_cars"], buildings: ["anti_gravity_lab", "flying_car_depot"] }
};

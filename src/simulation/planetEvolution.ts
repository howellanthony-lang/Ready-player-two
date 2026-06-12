import {
  ageMilestones,
  buildingDefinitions,
  civilisationAges,
  emptyProgressPoints,
  jobYields,
  speedMultipliers,
  technologyDefinitions
} from "./definitions";
import { createAgentsForDailyPopulationTarget, starterAgents } from "./agentCreation";
import type {
  ActivityFeedEntry,
  Agent,
  BuildingDefinition,
  BuildingId,
  CivilisationAge,
  PlanetProgress,
  ProgressPoints,
  SpeedMode,
  TechnologyDefinition
} from "./types";

const pointKeys = Object.keys(emptyProgressPoints()) as (keyof ProgressPoints)[];

export const createInitialPlanetProgress = (speedMode: SpeedMode = "fast"): PlanetProgress => ({
  currentDay: 1,
  currentAge: "settlement",
  points: {
    ...emptyProgressPoints(),
    knowledge: 2,
    infrastructure: 2,
    culture: 1,
    economy: 2,
    research: 4
  },
  speedMode,
  unlockedTechnologies: [],
  completedBuildings: [],
  activeBuildings: [],
  agents: starterAgents(),
  lastAgentCreationCheckDay: 0,
  activityFeed: [
    {
      id: "day-1-settlement",
      day: 1,
      type: "age_reached",
      title: "Settlement founded",
      detail: "NEXUS Worlds begins as a basic settlement on Day 1."
    }
  ]
});

export const simulateDays = (
  initialProgress: PlanetProgress,
  days: number,
  agents?: Agent[]
): PlanetProgress => {
  let progress = cloneProgress(initialProgress);

  for (let index = 0; index < days; index += 1) {
    progress = simulateDay(progress, agents);
  }

  return progress;
};

export const simulateDay = (progress: PlanetProgress, agents?: Agent[]): PlanetProgress => {
  const next: PlanetProgress = {
    ...cloneProgress(progress),
    currentDay: progress.currentDay + 1
  };

  if (agents) {
    next.agents = agents.map((agent) => ({ ...agent, needs: { ...agent.needs } }));
  }

  generateDailyPoints(next, next.agents);
  completeBuildings(next);
  discoverTechnologies(next);
  startNextBuilding(next);
  updateAge(next);
  checkAgentCreation(next);

  return next;
};

export const getNextMilestone = (progress: PlanetProgress): string => {
  const nextAge = civilisationAges[civilisationAges.indexOf(progress.currentAge) + 1];

  if (nextAge) {
    const milestone = ageMilestones[nextAge];
    const missingTech = milestone.technologies.find((id) => !progress.unlockedTechnologies.includes(id));
    const missingBuilding = milestone.buildings.find((id) => !progress.completedBuildings.includes(id));

    if (missingTech) {
      return `Discover ${technologyDefinitions[missingTech].name} to move toward the ${nextAge} age.`;
    }

    if (missingBuilding) {
      return `Complete ${buildingDefinitions[missingBuilding].name} to reach the ${nextAge} age.`;
    }
  }

  const nextTechnology = Object.values(technologyDefinitions).find((technology) =>
    canUnlockTechnology(technology, progress)
  );

  if (nextTechnology) {
    return `Build research toward ${nextTechnology.name}.`;
  }

  return "Expand the civilisation and prepare the next simulation layer.";
};

export const getUnlockedBuildingDefinitions = (progress: PlanetProgress): BuildingDefinition[] =>
  Object.values(buildingDefinitions).filter((building) =>
    progress.unlockedTechnologies.includes(building.requiredTechnology)
  );

const generateDailyPoints = (progress: PlanetProgress, agents: Agent[]): void => {
  const multiplier = speedMultipliers[progress.speedMode];

  for (const agent of agents) {
    addPoints(progress.points, jobYields[agent.job], multiplier);
  }

  for (const buildingId of progress.completedBuildings) {
    addPoints(progress.points, buildingDefinitions[buildingId].yields, multiplier);
  }
};

const completeBuildings = (progress: PlanetProgress): void => {
  const finishedBuildingIds: BuildingId[] = [];

  progress.activeBuildings = progress.activeBuildings
    .map((project) => ({ ...project, remainingDays: project.remainingDays - 1 }))
    .filter((project) => {
      if (project.remainingDays <= 0) {
        finishedBuildingIds.push(project.buildingId);
        return false;
      }

      return true;
    });

  for (const buildingId of finishedBuildingIds) {
    if (!progress.completedBuildings.includes(buildingId)) {
      progress.completedBuildings.push(buildingId);
      addActivity(progress, "building_completed", `${buildingDefinitions[buildingId].name} completed`, "The new building is now contributing to daily progress.");
    }
  }
};

const discoverTechnologies = (progress: PlanetProgress): void => {
  let unlockedThisPass = true;

  while (unlockedThisPass) {
    unlockedThisPass = false;

    for (const technology of Object.values(technologyDefinitions)) {
      if (!canUnlockTechnology(technology, progress)) {
        continue;
      }

      progress.unlockedTechnologies.push(technology.id);
      progress.points.research -= technology.researchCost;
      addActivity(progress, "technology_discovered", `${technology.name} discovered`, "A new technology has entered the civilisation tech tree.");

      if (technology.futuristic) {
        addActivity(progress, "futuristic_technology_unlocked", `${technology.name} changes everything`, "Futuristic capabilities are now available for NEXUS Worlds.");
      }

      unlockedThisPass = true;
      break;
    }
  }
};

const startNextBuilding = (progress: PlanetProgress): void => {
  const activeIds = progress.activeBuildings.map((project) => project.buildingId);
  const nextBuilding = Object.values(buildingDefinitions).find((building) => {
    const canBuild =
      progress.unlockedTechnologies.includes(building.requiredTechnology) &&
      !progress.completedBuildings.includes(building.id) &&
      !activeIds.includes(building.id);

    return canBuild && progress.points.infrastructure >= building.buildCost;
  });

  if (!nextBuilding) {
    return;
  }

  progress.points.infrastructure -= nextBuilding.buildCost;
  progress.activeBuildings.push({
    buildingId: nextBuilding.id,
    startedDay: progress.currentDay,
    remainingDays: nextBuilding.buildDays
  });
  addActivity(progress, "building_started", `${nextBuilding.name} started`, "Builders have queued the next unlocked structure.");
};

const updateAge = (progress: PlanetProgress): void => {
  for (let index = civilisationAges.length - 1; index >= 0; index -= 1) {
    const age = civilisationAges[index];
    const milestone = ageMilestones[age];
    const hasTechnologies = milestone.technologies.every((id) => progress.unlockedTechnologies.includes(id));
    const hasBuildings = milestone.buildings.every((id) => progress.completedBuildings.includes(id));

    if (hasTechnologies && hasBuildings && civilisationAges.indexOf(age) > civilisationAges.indexOf(progress.currentAge)) {
      progress.currentAge = age;
      addActivity(progress, "age_reached", `${formatAge(age)} age reached`, `NEXUS Worlds has advanced into the ${age} age.`);
      return;
    }
  }
};

const checkAgentCreation = (progress: PlanetProgress): void => {
  const newAgents = createAgentsForDailyPopulationTarget(progress);
  progress.lastAgentCreationCheckDay = progress.currentDay;

  if (newAgents.length === 0) {
    return;
  }

  for (const newAgent of newAgents) {
    progress.agents.push(newAgent);
    addActivity(
      progress,
      "new_arrival",
      `[New Arrival] ${newAgent.name} has arrived in Ironvale.`,
      `${newAgent.role}: ${newAgent.currentGoal}`
    );
  }
};

const canUnlockTechnology = (technology: TechnologyDefinition, progress: PlanetProgress): boolean =>
  !progress.unlockedTechnologies.includes(technology.id) &&
  technology.prerequisites.every((id) => progress.unlockedTechnologies.includes(id)) &&
  progress.points.research >= technology.researchCost;

const addPoints = (points: ProgressPoints, yields: Partial<ProgressPoints>, multiplier: number): void => {
  for (const key of pointKeys) {
    points[key] += (yields[key] ?? 0) * multiplier;
  }
};

const addActivity = (
  progress: PlanetProgress,
  type: ActivityFeedEntry["type"],
  title: string,
  detail: string
): void => {
  progress.activityFeed.unshift({
    id: `${progress.currentDay}-${type}-${progress.activityFeed.length}`,
    day: progress.currentDay,
    type,
    title,
    detail
  });
};

const cloneProgress = (progress: PlanetProgress): PlanetProgress => ({
  ...progress,
  points: { ...progress.points },
  unlockedTechnologies: [...progress.unlockedTechnologies],
  completedBuildings: [...progress.completedBuildings],
  activeBuildings: progress.activeBuildings.map((project) => ({ ...project })),
  agents: progress.agents.map((agent) => ({ ...agent, needs: { ...agent.needs } })),
  activityFeed: progress.activityFeed.map((entry) => ({ ...entry }))
});

const formatAge = (age: CivilisationAge): string => age.charAt(0).toUpperCase() + age.slice(1);

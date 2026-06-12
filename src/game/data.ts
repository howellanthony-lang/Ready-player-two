import type { Agent, AvatarPreset, CareerDefinition, FeedEntry, MissionDefinition } from "./types";

export const careers: CareerDefinition[] = [
  { id: "architect", name: "Architect", description: "Turn survival problems into practical structures.", gift: "+1 tool / +2 research", opening: "You recognise the camp's weak geometry immediately." },
  { id: "engineer", name: "Engineer", description: "Study systems, energy and practical invention.", gift: "+6 research", opening: "Broken equipment looks less like debris and more like possibility." },
  { id: "medic", name: "Medic", description: "Protect health and prepare people for crisis.", gift: "+6 morale", opening: "You notice exhaustion before anyone says they are afraid." },
  { id: "farmer", name: "Farmer", description: "Build resilience through food and living systems.", gift: "+2 food", opening: "The soil is poor, but not dead. Elsie will understand that." },
  { id: "scout", name: "Scout", description: "Read terrain, weather and hidden routes.", gift: "+2 wood / safer outlook", opening: "The eastern ridge could shelter the camp if the wind turns." },
  { id: "guardian", name: "Guardian", description: "Create safety without taking away citizen agency.", gift: "+10 morale", opening: "Every exposed approach to the camp is already mapped in your mind." },
];

export const avatarPresets: AvatarPreset[] = [
  { id: "aether", name: "Aether", color: "#55d8ff", detail: "Cool spectral signal" },
  { id: "ember", name: "Ember", color: "#ff8748", detail: "Warm survival signal" },
  { id: "verdant", name: "Verdant", color: "#5ce0a6", detail: "Living world signal" },
  { id: "solar", name: "Solar", color: "#ffd25b", detail: "High visibility signal" },
];

export const missions: MissionDefinition[] = [
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

export const initialAgents: Agent[] = [
  { id: "mason", name: "Mason Briggs", role: "Builder", mood: "Focused", energy: 82, health: 100, goal: "Build the first shelter", action: "Searching for usable timber", memory: "The six survivors formed a camp at dusk.", skill: "Construction", trust: 48, position: [1.7, 0.55, -1.5] },
  { id: "ava", name: "Ava Stone", role: "Medic", mood: "Calm", energy: 76, health: 96, goal: "Keep the group healthy", action: "Checking emergency supplies", memory: "Clean water was found near the ridge.", skill: "Medicine", trust: 42, position: [-3.6, 0.55, 1.2] },
  { id: "theo", name: "Theo Vale", role: "Inventor", mood: "Curious", energy: 68, health: 92, goal: "Understand the Founder tools", action: "Studying broken equipment", memory: "The Founder presence appeared without a body.", skill: "Research", trust: 36, position: [-1.1, 0.55, -2.4] },
  { id: "elsie", name: "Elsie Hart", role: "Farmer", mood: "Worried", energy: 71, health: 98, goal: "Protect the remaining food", action: "Planting emergency seed rows", memory: "Food stores will not last another week.", skill: "Agriculture", trust: 45, position: [3.5, 0.55, 2.2] },
  { id: "rex", name: "Rex Calder", role: "Guard", mood: "Alert", energy: 88, health: 100, goal: "Secure the camp perimeter", action: "Watching the eastern ridge", memory: "Dark clouds are moving faster than expected.", skill: "Security", trust: 31, position: [4.8, 0.55, -0.2] },
  { id: "nova", name: "Nova Quinn", role: "Explorer", mood: "Restless", energy: 79, health: 95, goal: "Map the nearby valley", action: "Checking wind direction", memory: "A sheltered hollow lies beyond the ridge.", skill: "Exploration", trust: 39, position: [-4.8, 0.55, -1.9] },
];

export const initialFeed: FeedEntry[] = [
  { id: 1, day: 1, time: "06:18", type: "world", text: "Origin Planet settlement established." },
  { id: 2, day: 1, time: "06:22", type: "agent", text: "Mason identifies shelter as the first survival priority." },
  { id: 3, day: 1, time: "06:27", type: "agent", text: "Elsie reports food stores are critically low." },
  { id: 4, day: 1, time: "06:31", type: "event", text: "A severe storm front is forming beyond the ridge." },
];

export const feedColors: Record<FeedEntry["type"], string> = {
  founder: "feed-founder",
  agent: "feed-agent",
  event: "feed-event",
  research: "feed-research",
  project: "feed-project",
  world: "feed-world",
};

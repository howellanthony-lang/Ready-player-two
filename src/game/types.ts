export type CareerId = "architect" | "engineer" | "medic" | "farmer" | "scout" | "guardian";

export type ScreenId = "login" | "profile" | "character" | "career" | "loading" | "game";

export type Agent = {
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

export type FeedEntry = {
  id: number;
  day: number;
  time: string;
  type: "founder" | "agent" | "event" | "research" | "project" | "world";
  text: string;
};

export type CareerDefinition = {
  id: CareerId;
  name: string;
  description: string;
  gift: string;
  opening: string;
};

export type AvatarPreset = {
  id: string;
  name: string;
  color: string;
  detail: string;
};

export type MissionDefinition = {
  name: string;
  objective: string;
};

# Ready Player Two Architecture

## Current MVP Architecture

The current MVP should stay simple:

- Frontend: React, TypeScript, Vite.
- 3D rendering: Three.js and React Three Fiber.
- UI state: React local state.
- Backend: Convex exists in the AI Town foundation but should not drive MVP gameplay until the viewport and player loop are stable.

## Future Architecture

The long-term architecture can layer systems in this order:

1. 3D client renders the world.
2. Local state powers the first playable prototype.
3. Convex becomes the persistent source of truth.
4. AI model router proposes character dialogue/actions.
5. Action validation checks game rules.
6. Convex mutations apply valid changes.
7. UI and 3D scene re-render from updated state.

## Main Systems

### World Engine

Controls:

- Day and time.
- World events.
- Locations.
- Agent positions.
- Building states.
- Civilisation age.

### Agent Engine

Controls:

- Goals.
- Moods.
- Jobs.
- Needs.
- Memories.
- Relationships.
- Conversations.

### Conversation Engine

Controls:

- Who talks to whom.
- Why they talk.
- Speech bubble output.
- Conversation summaries.
- Important memory extraction.

### Memory Engine

Controls:

- Short-term memory.
- Long-term memory.
- Importance scoring.
- Searchable recall.
- Relationship-linked memories.

### Player Control Layer

Controls:

- Player movement.
- Agent inspection.
- World event input.
- Pause/play/speed controls later.
- Save/load later.

## Target Data Models

```ts
export type Agent = {
  id: string;
  name: string;
  role: string;
  personality: string;
  backstory: string;
  mood: "happy" | "neutral" | "stressed" | "angry" | "excited" | "tired";
  energy: number;
  hunger?: number;
  socialNeed?: number;
  currentGoal: string;
  longTermGoal: string;
  currentAction: string;
  locationId: string;
  x: number;
  y: number;
  relationships: Relationship[];
  memories: Memory[];
  inventory: InventoryItem[];
};

export type Relationship = {
  agentId: string;
  trust: number;
  friendship: number;
  conflict: number;
  lastInteractionSummary: string;
};

export type Memory = {
  id: string;
  agentId: string;
  content: string;
  importance: number;
  emotionalTone: "positive" | "neutral" | "negative";
  relatedAgentIds: string[];
  createdAt: number;
};

export type WorldEvent = {
  id: string;
  title: string;
  description: string;
  severity: number;
  affectedLocations: string[];
  createdAt: number;
};

export type ActivityLog = {
  id: string;
  type: "conversation" | "movement" | "memory" | "goal" | "world_event" | "relationship";
  text: string;
  agentIds: string[];
  createdAt: number;
};
```


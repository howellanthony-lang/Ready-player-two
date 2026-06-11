# Model Routing and Claude Fable 5

NEXUS Worlds should support multiple AI model providers rather than depending on one model for every task.

Claude Fable 5 can be used later as a high-reasoning model for long-horizon world planning, agent council decisions, civilisation evolution, quest generation and complex system design.

Do not use Claude Fable 5 for every small NPC line. It is better used as the world planner or civilisation brain.

## Recommended Model Strategy

Use a model router.

The model router decides which model should handle each AI job.

## AI Job Types

Possible job types:

- npc_small_talk
- agent_memory_summary
- daily_world_planning
- civilisation_evolution
- quest_generation
- agent_council
- world_event_reaction
- technology_unlock_reasoning
- building_priority_planning
- code_generation
- fallback

## Provider Types

Possible providers:

- mock
- ollama
- openai
- claude_fable_5
- claude_sonnet
- other_future_provider

## Suggested Routing

### Cheap / fast model

Use for:

- NPC short dialogue
- simple reactions
- short memory summaries
- activity feed wording
- background agent chatter

### Local Ollama model

Use for:

- offline development
- cheap testing
- non-critical local simulation
- rough NPC conversation

### OpenAI provider

Use for:

- production NPC dialogue
- structured action outputs
- quest summaries
- player-facing content
- fallback planning

### Claude Fable 5

Use for:

- daily world planning
- agent council decisions
- long-horizon civilisation evolution
- major world events
- technology path decisions
- complex quest generation
- faction strategy
- self-evolving workflow planning
- difficult reasoning tasks

## Why Not Use One Model For Everything

Different AI jobs have different costs and complexity.

A short line of NPC dialogue does not need the most expensive model.

A civilisation-wide planning step may need a stronger reasoning model.

The model router keeps the game affordable and scalable.

## Claude Fable 5 Use Cases

### 1. Daily Civilisation Planning

Input:

- current day
- current age
- agents
- buildings
- resources
- unlocked technologies
- current problems
- recent world events

Output:

- top priorities
- suggested actions
- risks
- valid capability names
- possible agent conversations

### 2. Agent Council

Agents debate what the civilisation should do next.

Example:

- Mason argues for shelter
- Elsie argues for food
- Rex argues for security
- Theo argues for research
- Ava argues for health and safety

The planner produces a balanced next step.

### 3. Quest Generation

Claude Fable 5 can generate quests from live world state.

Example:

- Storm coming
- low food
- shelter incomplete

Possible quests:

- Reinforce the Shelter
- Secure the Grain
- Find the Lost Scout

### 4. Technology Unlock Reasoning

When a new technology unlocks, Claude Fable 5 can generate the story reason and social reaction.

Example:

Electricity unlocked.

Output:

- which agents contributed
- what changed in society
- what buildings become available
- what problems may appear next

## Refusal Handling

Claude Fable 5 may refuse some requests depending on provider behaviour.

If a request is refused, the game should not crash.

Required handling:

1. Detect refusal response.
2. Log the refusal safely.
3. Fall back to another configured model.
4. If no fallback works, use a safe deterministic default.
5. Show a normal game event rather than an error to the player.

Example fallback flow:

```text
Claude Fable 5 request
↓
Refusal or unavailable
↓
Retry with configured fallback model
↓
If fallback fails, use scripted default action
↓
Run action validation
↓
Update Convex only if valid
```

## Cost Control

To avoid high cost:

- Do not call high-reasoning models for every NPC line.
- Batch world planning once per in-game day.
- Use summaries instead of full history.
- Cache world summaries.
- Keep background agents in low-detail mode.
- Use local/mock models during development.
- Only use Claude Fable 5 for major reasoning steps.

## Data Safety

Only send fictional game data to external providers.

Do not send:

- API keys
- private user data
- real personal details
- payment details
- secrets
- local file contents unless intended

## Convex Integration Rule

AI models should not directly mutate world state.

Correct flow:

```text
AI proposes action
↓
Capability registry checks whether action exists
↓
Action validation checks rules, age, resources and tech
↓
Convex mutation updates state only if valid
↓
Activity feed reports result
```

## TypeScript Interface Direction

Future model router types:

```ts
export type AIJobType =
  | "npc_small_talk"
  | "agent_memory_summary"
  | "daily_world_planning"
  | "civilisation_evolution"
  | "quest_generation"
  | "agent_council"
  | "world_event_reaction"
  | "technology_unlock_reasoning"
  | "building_priority_planning"
  | "code_generation"
  | "fallback";

export type ModelProvider =
  | "mock"
  | "ollama"
  | "openai"
  | "claude_fable_5"
  | "claude_sonnet"
  | "other_future_provider";

export type ModelRoute = {
  jobType: AIJobType;
  preferredProvider: ModelProvider;
  fallbackProviders: ModelProvider[];
  maxCostTier: "low" | "medium" | "high";
  requiresStructuredOutput: boolean;
};
```

## First Implementation Later

Do not implement the Claude API immediately.

Build order:

1. 3D playable world
2. static AI citizens
3. click inspect panel
4. activity feed
5. world event input
6. Convex world state
7. action validation layer
8. model router interface
9. mock provider
10. Ollama/OpenAI provider
11. Claude Fable 5 provider later

## Summary

Claude Fable 5 should be treated as an optional high-reasoning world brain for major simulation decisions, not the default model for every NPC message.

The game should remain provider-flexible, cost-controlled and safe through validation before any AI action changes the world.

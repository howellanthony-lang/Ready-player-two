# Convex Game Evolution Plan

This document turns general Convex game advice into a specific plan for NEXUS Worlds / Ready Player Two.

NEXUS Worlds is not a simple round-based game. It is a living AI civilisation world where players, AI citizens, buildings, technologies, quests and world events evolve over time.

Convex should become the source of truth for the live world state.

## Core Principle

The 3D client should render the world.

Convex should own the world state.

AI models should propose actions, but Convex mutations should apply only validated changes.

```text
Player / AI action
↓
Validation layer
↓
Convex mutation
↓
Updated world state
↓
React Three Fiber client re-renders
```

## 1. Add New Game Mechanics Through Convex Mutations

Every meaningful world change should happen through a Convex mutation.

Examples:

- createWorldEvent
- updateAgentGoal
- addActivityFeedEntry
- unlockTechnology
- startBuilding
- completeBuilding
- createAgent
- updateCivilisationAge
- addQuest
- completeQuest
- updateResources
- recordAgentMemory

This keeps the game controlled, auditable and multiplayer-ready later.

## 2. Convex Tables Needed For NEXUS Worlds

Recommended first schema:

### worlds
Stores each world/planet.

Fields:

- name
- currentDay
- currentAge
- currentGoal
- active
- createdAt
- updatedAt

### agents
Stores AI citizens.

Fields:

- worldId
- name
- role
- mood
- currentGoal
- currentAction
- position
- lifeStage
- skillFocus
- createdReason
- createdAt
- updatedAt

### agentMemories
Stores short memories for agents.

Fields:

- agentId
- worldId
- memory
- importance
- createdAt

### activityFeed
Stores world history and visible event logs.

Fields:

- worldId
- type
- message
- agentId optional
- createdAt

### buildings
Stores world buildings.

Fields:

- worldId
- name
- ageRequired
- status
- position
- buildProgress
- createdAt
- completedAt optional

### technologies
Stores unlocked and locked technologies.

Fields:

- worldId
- name
- status
- age
- prerequisites
- unlockedAt optional

### quests
Stores player and AI-generated quests.

Fields:

- worldId
- title
- description
- status
- createdByAgentId optional
- rewardType
- createdAt
- completedAt optional

### resources
Stores world resources.

Fields:

- worldId
- wood
- food
- stone
- energy
- research
- credits
- updatedAt

### worldEvents
Stores player-triggered and system-triggered events.

Fields:

- worldId
- prompt
- impactType
- status
- createdAt

## 3. Local State vs Global State

Use local React state for immediate UI-only actions:

- selected agent panel
- camera mode
- temporary input text
- hover state
- local animation state

Use Convex for global game state:

- agents
- buildings
- resources
- quests
- technology unlocks
- activity feed
- world day/age
- world events

Rule:

If it must persist, sync between users or affect the world, store it in Convex.

## 4. Activity History and Undo Direction

Store all important events in an activityFeed/history table.

This enables:

- replay timeline
- debugging AI decisions
- undo later
- story generation
- daily summaries
- agent memory extraction

Example feed items:

- [World] Day 1 begins.
- [Agent] Mason starts building a shelter.
- [Tech] Fire discovered.
- [Quest] Secure the Grain added.
- [Evolution] Settlement Age unlocked.

## 5. Time-Based Evolution With Crons

Convex crons can drive world evolution.

Possible scheduled jobs:

### advanceWorldDay
Runs every real-world interval or manual dev trigger.

Actions:

- increase day
- add daily feed entry
- check resources
- check building progress
- check technology progress
- trigger agent planning

### dailyAgentPlanning
Runs once per in-game day.

Actions:

- review current world needs
- update agent goals
- create possible quests
- propose new buildings or technologies

### completeTimedBuildings
Checks buildings with progress and completes them when ready.

### unlockAgeIfReady
Checks if the world meets requirements for the next civilisation age.

## 6. Rate Limiting

Rate limiting should be added before allowing many player or AI actions.

Use it for:

- world event input
- AI model calls
- chat messages
- quest generation
- agent creation
- marketplace actions later

This prevents abuse and avoids runaway cost.

## 7. Secret Keeping

Never expose secrets or hidden world state on the client.

Keep server-side:

- API keys
- model provider keys
- hidden quest answers
- hidden agent planning notes
- protected world rules
- validation rules that should not be bypassed

The client should only receive what the player is allowed to see.

## 8. Migrations

As the game evolves, data schemas will change.

Use Convex migrations when adding or restructuring:

- new agent fields
- new world age fields
- new resource fields
- quest reward changes
- memory structures
- economy systems
- player profiles

Rule:

Never randomly delete or rename fields without a migration plan.

## 9. Leaderboards and Progression Later

Leaderboards are not needed for the first MVP, but later they can track:

- fastest civilisation growth
- most helpful player
- most quests completed
- best creator world
- highest reputation
- richest trade district
- strongest faction

This should come after the base world loop works.

## 10. Convex Components To Consider Later

Possible Convex components:

- aggregate / leaderboards
- rate limiting
- crons
- migrations
- presence later
- AI workflow helpers later

Do not add all components at once.

Add them when the game has a real need.

## 11. First Convex MVP Build Order

After the static 3D scene works, build Convex in this order:

1. worlds table
2. agents table
3. buildings table
4. activityFeed table
5. resources table
6. technologies table
7. worldEvents table
8. quests table
9. agentMemories table
10. queries to load world state
11. mutations to update world state
12. world event input mutation
13. building unlock mutation
14. technology unlock mutation
15. daily evolution cron
16. AI model router integration
17. action validation system

## 12. First Convex Queries

Possible first queries:

- getActiveWorld
- listAgentsByWorld
- listBuildingsByWorld
- listActivityFeed
- listTechnologiesByWorld
- getResourcesByWorld
- listQuestsByWorld

## 13. First Convex Mutations

Possible first mutations:

- seedOriginWorld
- createWorldEvent
- addActivityFeedEntry
- updateAgentGoal
- updateAgentMood
- unlockTechnology
- startBuilding
- completeBuilding
- createAgent
- advanceWorldDay

## 14. AI Action Validation Flow

AI models should not be trusted to mutate world state directly.

Required flow:

```text
AI proposes action
↓
Action is converted into structured JSON
↓
Capability registry checks if action exists
↓
Validation checks world age, resources, tech and limits
↓
Convex mutation applies valid change
↓
Activity feed explains result
```

Example invalid action:

```text
AI tries to build Flying Car Depot on Day 1.
```

Validation should reject it because:

- Futuristic Age is not unlocked
- anti-gravity is not unlocked
- clean energy is not unlocked
- required infrastructure does not exist

## 15. World Evolution Loop

Recommended loop:

```text
1. Player or cron triggers a world tick.
2. Convex loads current world state.
3. Model router chooses AI planner if needed.
4. AI proposes possible actions.
5. Validation filters actions.
6. Valid Convex mutations update the world.
7. Activity feed records what happened.
8. 3D client re-renders changed world.
```

## 16. First Playable Convex Demo

The first Convex-powered demo should allow:

- load Origin Planet from Convex
- render agents from Convex
- render buildings from Convex
- show activity feed from Convex
- submit a world event into Convex
- add that event to the activity feed
- update one agent goal in response

Example:

Player types:

```text
A storm is coming.
```

Convex records:

- worldEvent: A storm is coming
- activityFeed: [World Event] A storm is coming.
- Mason goal: Reinforce shelter
- Ava goal: Check supplies
- Rex goal: Patrol camp

## 17. Keep It Simple

Do not attempt full MMO logic yet.

Do not attempt full AI autonomy yet.

Do not attempt player economy yet.

First prove:

- 3D render works
- Convex state loads
- world event saves
- activity feed updates
- agents can change goals
- buildings can unlock

## Summary

Convex should act as the live world brain for NEXUS Worlds.

React Three Fiber renders the world.

AI proposes actions.

Validation protects the rules.

Convex stores the timeline, agents, buildings, technologies, resources, quests and world events.

This gives the project a scalable path from simple 3D MVP to living AI civilisation simulation.

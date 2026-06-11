# God-Level Go-Live Roadmap

This roadmap explains how NEXUS Worlds / Ready Player Two moves from local prototype to a live playable public demo, and then toward a higher-level AI civilisation game.

The goal is not to build everything at once.

The goal is to get a real playable version online fast, then evolve it in controlled stages.

## Current Status

The app UI is loading.

The main issue is that the 3D viewport has shown as a blank white panel.

This must be fixed before adding more AI, Convex, multiplayer or advanced features.

## Core Rule

Do not build god-level features on a broken viewport.

First make the 3D world render reliably.

Then make it playable.

Then deploy it live.

Then evolve the world.

## Stage 0 — Stabilise The Local App

### Goal
Make sure the project runs locally without errors.

### Tasks
- Run `npm install`.
- Run `npm run dev`.
- Open `http://localhost:5173/`.
- Open browser console.
- Fix all red errors.
- Confirm Vite dev server works.
- Confirm React app renders.
- Confirm Convex provider does not crash the app.

### Acceptance Criteria
- No blocking browser console errors.
- App loads every time.
- UI remains visible after refresh.

## Stage 1 — Fix 3D Viewport

### Goal
Replace the blank white 3D panel with a visible debug 3D scene.

### Tasks
- Set Canvas background to dark.
- Add ambient light.
- Add directional light.
- Add green ground plane.
- Add visible red cube at origin.
- Add blue player sphere/capsule.
- Add orange AI agent spheres.
- Put camera at `[0, 6, 10]`.
- Make camera look at origin.
- Ensure Canvas fills the viewport container.
- Temporarily remove any Drei/Text/Sky components if they cause errors.

### Acceptance Criteria
- 3D viewport is no longer blank.
- At least one cube/sphere is visible.
- Scene renders after browser refresh.
- No red console errors from Three.js/React Three Fiber.

## Stage 2 — First Playable 3D MVP

### Goal
Create the first playable Origin Planet.

### Features
- Player avatar.
- WASD movement.
- Six AI citizen placeholders.
- Agent labels.
- Click-to-select agent.
- Agent inspector panel.
- Activity feed.
- Civilisation status panel.
- Building placeholders.
- World selector/portal placeholder.
- World event input that adds a local feed entry.

### Starting Agents
- Mason — Builder — Focused
- Ava — Medic — Calm
- Theo — Inventor — Curious
- Elsie — Farmer — Happy
- Rex — Guard — Alert
- Nova — Explorer — Excited

### Acceptance Criteria
- Player can move.
- Agents are visible.
- Clicking an agent opens the inspector.
- Activity feed is visible.
- Civilisation panel is visible.
- Buildings are visible.
- World event input works locally.

## Stage 3 — Make It Feel Like A Game

### Goal
Turn the tech demo into a basic game loop.

### Core Loop
```text
Player enters Origin Planet
↓
Player sees AI citizens and buildings
↓
Player triggers or observes events
↓
Agents react
↓
Activity feed updates
↓
Buildings/technology progress
↓
Civilisation evolves
```

### Tasks
- Add simple missions.
- Add starter quest: Build First Shelter.
- Add progress meter for shelter.
- Add resource counters: wood, food, stone, research, energy.
- Add basic interaction prompts.
- Add agent speech bubbles.
- Add first world event reactions.

### Acceptance Criteria
- Player has something to do in the first 2 minutes.
- The world visibly reacts to one action.
- The activity feed explains what happened.

## Stage 4 — Convex World State

### Goal
Move from local mock state to persistent Convex world state.

### First Convex Tables
- worlds
- agents
- buildings
- activityFeed
- resources
- technologies
- worldEvents
- quests
- agentMemories

### First Queries
- getActiveWorld
- listAgentsByWorld
- listBuildingsByWorld
- listActivityFeed
- getResourcesByWorld
- listTechnologiesByWorld

### First Mutations
- seedOriginWorld
- createWorldEvent
- addActivityFeedEntry
- updateAgentGoal
- updateAgentMood
- startBuilding
- completeBuilding
- unlockTechnology
- advanceWorldDay

### Acceptance Criteria
- Origin Planet loads from Convex.
- Agents load from Convex.
- Buildings load from Convex.
- Activity feed loads from Convex.
- World event input writes to Convex.
- Refreshing the page keeps the world state.

## Stage 5 — Go Live Public Demo

### Goal
Deploy a public playable demo.

### Recommended First Deployment
- Frontend: Vercel, Netlify or similar static hosting.
- Backend/world state: Convex deployment.
- Domain later after demo works.

### Go-Live Checklist
- `npm run build` works locally.
- No TypeScript errors.
- No missing environment variables.
- Convex deployment configured.
- Public deployment URL works.
- Game loads on desktop browser.
- Game loads after refresh.
- No API keys or secrets committed.
- README includes live demo link.

### First Public Demo Name
```text
NEXUS Worlds — Origin Planet Demo
```

### First Public Demo Description
```text
A browser-based 3D AI civilisation prototype where players enter Origin Planet, inspect AI citizens, trigger world events and watch the colony begin evolving from Day 1.
```

## Stage 6 — AI Model Router

### Goal
Add AI without locking the game to one provider.

### Providers
- mock
- ollama
- openai
- claude_fable_5
- claude_sonnet
- future providers

### Routing
- Small NPC talk: cheap/local model.
- World planning: high-reasoning model.
- Agent council: high-reasoning model.
- Quest generation: high-reasoning or mid-cost model.
- Development testing: mock provider.

### Acceptance Criteria
- Model router interface exists.
- Mock provider works first.
- No secrets committed.
- AI output is structured.
- AI actions are validated before Convex mutations.

## Stage 7 — Action Validation / Capability Registry

### Goal
Stop AI from breaking the game rules.

### Rule
AI proposes actions.

The game validates actions.

Convex only updates state if the action is valid.

### Example Capability Names
- gather_resource
- build_shelter
- build_farm
- research_technology
- create_agent
- trigger_world_event
- start_quest
- complete_building
- unlock_age

### Acceptance Criteria
- Invalid actions are rejected.
- Valid actions are applied.
- Activity feed explains both success and rejection.

## Stage 8 — Planet Evolution Engine

### Goal
The world evolves from camp to civilisation.

### Ages
1. Origin Age
2. Settlement Age
3. Town Age
4. Industrial Age
5. Electrical Age
6. Digital Age
7. Futuristic Age

### Visual Evolution
- Campfire
- Shelter
- Farm
- Workshop
- School
- Market
- Factory
- Power Station
- Data Centre
- AI Lab
- Anti-Gravity Lab
- Flying Car Depot
- Spaceport

### Acceptance Criteria
- Technologies unlock in order.
- Buildings appear as ages unlock.
- Future milestones are locked until requirements are met.
- Player can see what is coming next.

## Stage 9 — Agent Memory, Personality and Society

### Goal
Make AI citizens feel alive.

### Agent Features
- goals
- moods
- memories
- relationships
- skills
- jobs
- opinions of player
- personality traits
- daily routines

### Starting Personality Direction
- Mason: blunt builder
- Ava: calm medic
- Theo: chaotic inventor
- Elsie: grounded farmer
- Rex: over-serious guard
- Nova: adventurous explorer

### Acceptance Criteria
- Agents remember recent events.
- Agents react differently based on role/personality.
- Agent inspector shows memory and current goal.

## Stage 10 — God-Level Features Later

Do not build these before the MVP is live.

### Future Features
- multiplayer presence
- player accounts
- avatar customisation
- creator worlds
- public/private worlds
- portal travel
- AI factions
- economy/markets
- player reputation
- quests generated by AI citizens
- flying vehicles
- spaceport travel
- player housing
- education worlds
- combat zones
- mobile-friendly view
- Unreal/VR client later

## Live Demo Success Definition

The first live version is successful if a player can:

1. Open a public URL.
2. See the 3D world.
3. Move the player.
4. Click an AI citizen.
5. Read their role, mood and goal.
6. Trigger a world event.
7. See the activity feed update.
8. Understand the world will evolve over time.

## Codex Instruction For Next Build

Use this prompt:

```text
Read docs/AI_PROJECT_ASSISTANT_CONTEXT.md and docs/GOD_LEVEL_GO_LIVE_ROADMAP.md first.

Current priority: fix the blank/white 3D viewport and make a visible debug scene render.

Then build the first playable 3D MVP only.

Do not add Convex, AI model calls, multiplayer, Unreal or VR until the 3D viewport and player movement work.

Acceptance criteria:
- npm run dev works
- viewport is not blank
- player appears
- WASD movement works
- six agents appear
- clicking an agent opens inspector
- activity feed appears
- civilisation panel appears
- world event input adds a feed entry locally
```

## Bottom Line

The next stage is:

```text
Fix render → make playable → connect Convex → deploy live → add AI → evolve civilisation → scale features
```

That is the clean route from prototype to god-level game.

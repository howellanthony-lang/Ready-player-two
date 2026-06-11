# AI Project Assistant Context

This file gives Codex, GitHub Copilot, ChatGPT, Claude or any future AI coding assistant the current project context for NEXUS Worlds / Ready Player Two.

Use this file before making architectural or coding decisions.

## Project Identity

Repository:

```text
howellanthony-lang/Ready-player-two
```

Working product name:

```text
NEXUS Worlds
```

Repo name can remain Ready-player-two, but the public-facing game/product should stay legally original as NEXUS Worlds.

## Core Vision

NEXUS Worlds is a browser-based 3D playable AI civilisation simulation.

The player enters a living virtual world where AI citizens talk, remember, build, evolve and shape the world over time.

The first playable world is:

```text
Origin Planet
```

The world starts on Day 1 with a basic camp and should evolve through ages:

1. Origin Age
2. Settlement Age
3. Town Age
4. Industrial Age
5. Electrical Age
6. Digital Age
7. Futuristic Age

The long-term fantasy is a large AI-powered virtual universe with portals, player-created worlds, AI societies, quests, markets, creator tools, flying vehicles, spaceports and evolving civilisation.

The immediate goal is much smaller:

```text
Build the first playable 3D MVP.
```

## Legal / Creative Safety Rules

This project may take broad inspiration from large virtual-world fiction and games, but it must not copy protected IP.

Do not use or copy:

- OASIS branding
- Ready Player One branding
- Fable branding
- protected characters
- protected locations
- protected skins
- protected questlines
- protected music
- protected logos
- exact visual designs from copyrighted works

Use original NEXUS Worlds names, story, lore, mechanics and designs.

Safe inspiration themes:

- large shared virtual universe
- portal/world selector
- avatar identity
- AI citizens
- evolving civilisation
- player choice and reputation
- humour and reactive NPCs
- quests and creator worlds

## Recommended Technology Stack

Use the easiest stack for the first build:

- React
- TypeScript
- Vite
- Three.js
- React Three Fiber
- Drei
- Convex later as the live world backend

Do not start with:

- Unreal Engine
- VR
- MMO-scale multiplayer
- complex physics
- huge asset packs
- blockchain/economy systems

Those can come later after the browser 3D MVP works.

## Current Build Priority

Build in this order:

1. Static 3D scene
2. Player avatar
3. WASD movement
4. Six AI citizen placeholders
5. Agent labels
6. Click-to-inspect agent panel
7. Activity feed
8. Civilisation panel
9. Building placeholders
10. World selector / portal placeholder
11. World event input
12. Convex world state
13. Action validation layer
14. Model router
15. AI conversations
16. Planet evolution engine
17. Agent creation system
18. Flying car / spaceport milestone

## First 3D MVP Requirements

The app should run with:

```bash
npm run dev
```

The browser should open at:

```text
http://localhost:5173/
```

The first 3D MVP should include:

- full-screen 3D canvas
- ground plane or small planet surface
- sky/background
- lighting
- player avatar
- WASD movement
- six AI citizens
- labels above agents
- click-to-select agents
- inspect panel
- activity feed
- civilisation panel
- building placeholders
- world event input
- portal/world selector placeholder

## Starting AI Citizens

Use these starting citizens:

| Name | Role | Mood |
| --- | --- | --- |
| Mason | Builder | Focused |
| Ava | Medic | Calm |
| Theo | Inventor | Curious |
| Elsie | Farmer | Happy |
| Rex | Guard | Alert |
| Nova | Explorer | Excited |

Each citizen should eventually have:

- name
- role
- mood
- current goal
- current action
- recent memory
- skill focus
- relationship with player
- position in the world

## First Buildings

Use simple 3D placeholders for:

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

Visual evolution direction:

```text
Campfire → Shelter → Farm → Workshop → School → Factory → Power Station → Data Centre → AI Lab → Anti-Gravity Lab → Flying Car Depot → Spaceport
```

## Convex Direction

Convex should become the source of truth for world state.

React Three Fiber renders the world.

Convex stores and evolves the world.

AI models propose actions.

Validation checks the rules before Convex mutates state.

Correct flow:

```text
Player or AI action
↓
Action validation
↓
Convex mutation
↓
Updated world state
↓
3D client re-renders
```

First Convex tables to consider:

- worlds
- agents
- agentMemories
- activityFeed
- buildings
- technologies
- quests
- resources
- worldEvents

First Convex queries:

- getActiveWorld
- listAgentsByWorld
- listBuildingsByWorld
- listActivityFeed
- listTechnologiesByWorld
- getResourcesByWorld
- listQuestsByWorld

First Convex mutations:

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

## Action Validation Rule

AI models must never directly mutate world state.

Required action flow:

```text
AI proposes action
↓
Structured JSON action
↓
Capability registry checks if action exists
↓
Validation checks resources, age, technology and limits
↓
Convex mutation applies valid change
↓
Activity feed reports result
```

Example invalid action:

```text
Build Flying Car Depot on Day 1
```

This must be rejected because the world does not yet have:

- Futuristic Age
- clean energy
- computing
- anti-gravity
- flying car technology
- required infrastructure

## Model Routing Direction

Do not depend on only one AI model.

Use a model router.

Possible providers:

- mock
- ollama
- openai
- claude_fable_5
- claude_sonnet
- other_future_provider

Use cheap/local models for:

- small NPC talk
- quick reactions
- activity feed wording
- local development

Use high-reasoning models for:

- daily world planning
- agent council decisions
- civilisation evolution
- major quest generation
- technology path reasoning
- faction planning

Claude Fable 5, if available, should be treated as an optional high-reasoning world brain, not the default model for every NPC line.

If a model refuses or fails:

1. Do not crash the game.
2. Log safely.
3. Retry with fallback model.
4. If needed, use a deterministic default action.
5. Still run action validation before any world change.

## World Event Input

The first world event input can be simple.

Example:

Player types:

```text
A storm is coming.
```

The game should add to activity feed:

```text
[World Event] A storm is coming.
```

Later it should trigger agent reactions:

- Mason reinforces shelter
- Ava checks supplies
- Rex patrols camp
- Elsie protects food
- Theo researches weather sensors
- Nova scouts the hills

## Style Direction

Visual style for the MVP:

- low-poly
- readable
- sci-fi/fantasy mix
- cinematic but simple
- browser-friendly
- no large asset dependency

Tone direction for agents:

- alive
- reactive
- lightly humorous
- personality-driven
- clear roles
- not generic chatbot responses

Example agent personalities:

- Mason: practical, blunt, proud builder
- Ava: calm, dry-humoured medic
- Theo: chaotic inventor
- Elsie: grounded farmer
- Rex: over-serious guard
- Nova: adventurous explorer

## Portal / World Selector Direction

First version can show locked/coming soon worlds:

- Origin Planet: active
- Central Hub: coming soon
- Creator Moon: coming soon
- Academy World: coming soon
- Combat Zone: coming soon
- Market District: coming soon
- Spaceport: locked

Do not implement all worlds yet.

## Development Rules

- Keep npm run dev working.
- Do not commit API keys.
- Do not commit secrets.
- Do not add giant assets at the MVP stage.
- Do not overbuild before the first playable loop works.
- Prefer simple components.
- Prefer clear TypeScript types.
- Keep client state separate from persistent world state.
- Use Convex only after the static 3D world works.

## Important Local Setup Note

When using Git Bash on Windows, the correct project path is:

```bash
cd /c/Users/howel/Documents/Ready-player-two
```

When using PowerShell, the correct project path is:

```powershell
cd C:\Users\howel\Documents\Ready-player-two
```

Do not paste TypeScript/React code directly into Git Bash.

Paste code into `.tsx` files inside VS Code.

Open project with:

```bash
code .
```

## Current Documentation Files

Important docs already planned or created:

- docs/BIG_VISION.md
- docs/PLANET_EVOLUTION_SYSTEM.md
- docs/AGENT_CREATION_SYSTEM.md
- docs/AUTOHARNESS_RESEARCH.md
- docs/SWARMAI_RESEARCH.md
- docs/SELF_EVOLVING_AI_ARCHITECTURE.md
- docs/MODEL_ROUTING_AND_CLAUDE_FABLE_5.md
- docs/CONVEX_GAME_EVOLUTION_PLAN.md
- docs/AI_PROJECT_ASSISTANT_CONTEXT.md

## Immediate Next Coding Task

Implement the first playable 3D world.

Files to create:

```text
src/three/Nexus3DWorld.tsx
src/three/PlayerController.tsx
src/three/AgentNPC.tsx
src/three/BuildingPlaceholder.tsx
```

Then update:

```text
src/App.tsx
```

to render:

```tsx
<Nexus3DWorld />
```

Acceptance criteria:

- app runs with npm run dev
- 3D world loads
- player can move with WASD
- six agents are visible
- labels are visible
- clicking an agent opens inspect panel
- buildings are visible
- activity feed is visible
- civilisation panel is visible
- world event input can add a feed entry

## Bottom Line

Do not build the final dream yet.

First build the smallest playable version of NEXUS Worlds:

```text
A player walking around a 3D Origin Planet with AI citizens, buildings, activity feed and civilisation progression UI.
```

Then connect Convex.

Then connect AI.

Then evolve the world.

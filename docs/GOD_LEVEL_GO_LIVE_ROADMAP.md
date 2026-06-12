# God-Level Go-Live Roadmap

The goal is not to build everything at once.

The goal is:

```text
Fix render -> make playable -> connect Convex -> deploy live -> add AI -> evolve civilisation -> scale features
```

## Core Rule

Do not build god-level features on a broken viewport.

First make the 3D world render reliably. Then make it playable. Then deploy it live. Then evolve the world.

## Stage 0: Stabilise The Local App

- Run `npm install`.
- Run `npm run dev`.
- Open `http://localhost:5173/ai-town`.
- Open browser console.
- Fix blocking red errors.
- Confirm React app renders.

Acceptance:

- No blocking browser console errors.
- App loads after refresh.
- UI remains visible.

## Stage 1: Fix 3D Viewport

- Set Canvas background to dark.
- Add ambient light.
- Add directional light.
- Add green ground plane.
- Add red cube at origin.
- Add blue player sphere/capsule.
- Add orange AI agent spheres.
- Put camera at `[0, 6, 10]`.
- Make camera look at origin.
- Ensure Canvas fills the viewport panel.
- Temporarily remove crashing Drei/Text/Sky components.

Acceptance:

- Viewport is not blank.
- Objects are visible.
- Scene renders after refresh.
- No React Three Fiber blocking errors.

## Stage 2: First Playable 3D MVP

- Player avatar.
- WASD movement.
- Six citizen placeholders.
- Click-to-select citizen.
- Agent inspector.
- Activity feed.
- Civilisation status panel.
- Building/world marker placeholders.
- World event input that adds a local feed entry.

Acceptance:

- Player can move.
- Agents are visible.
- Clicking an agent opens inspector.
- Activity feed is visible.
- Civilisation panel is visible.
- World event input works locally.

## Stage 3: Make It Feel Like A Game

- Add starter quest: Build First Shelter.
- Add resource counters.
- Add simple interaction prompts.
- Add first speech bubbles.
- Add first world event reactions.

## Stage 4: Convex World State

Move from local mock state to persistent Convex state only after the MVP is playable.

First tables:

- worlds.
- agents.
- buildings.
- activityFeed.
- resources.
- technologies.
- worldEvents.
- quests.
- agentMemories.

## Stage 5: Public Demo

- `npm run build` works locally.
- No TypeScript errors.
- No missing environment variables.
- Convex deployment configured.
- Public deployment URL works.
- README includes setup and demo notes.

## Stage 6: AI Model Router

- Add mock provider first.
- Add Ollama/OpenAI later.
- Use structured model outputs.
- Validate actions before world mutation.
- Never commit secrets.

## Stage 7: Action Validation

AI proposes actions. The game validates actions. Convex only updates state if the action is valid.

## Stage 8: Planet Evolution

The world evolves through:

1. Origin Age.
2. Settlement Age.
3. Town Age.
4. Industrial Age.
5. Electrical Age.
6. Digital Age.
7. Futuristic Age.

## Stage 9: Agent Society

- Goals.
- Moods.
- Memories.
- Relationships.
- Skills.
- Jobs.
- Opinions of player.
- Daily routines.

## Stage 10: Later God-Level Features

Do not build these before the MVP is live:

- Multiplayer presence.
- Player accounts.
- Avatar customisation.
- Creator worlds.
- AI factions.
- Economy.
- AI-generated quests.
- Flying vehicles.
- Spaceport travel.
- Unreal/VR client.


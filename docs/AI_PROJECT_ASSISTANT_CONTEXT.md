# AI Project Assistant Context

This file gives Codex, GitHub Copilot, ChatGPT, Claude, or any future AI coding assistant the current project context for Ready Player Two / NEXUS Worlds.

## Project Identity

Repository:

```text
howellanthony-lang/Ready-player-two
```

Working product names:

- Ready Player Two: repo and creator-facing project name.
- NEXUS Worlds: original public world brand used by the prototype.

## Current Priority

Build the first playable browser 3D MVP before adding advanced systems.

Do not add Convex gameplay state, AI model calls, multiplayer, Unreal, VR, flying cars, monetisation, or creator tools until:

- The viewport renders.
- The player can move.
- Six starter agents are visible.
- Agent inspection works.
- Local activity feed and world event input work.

## Safe Inspiration Rules

The project may use broad inspiration from virtual-world fiction and simulation games, but must not copy protected IP.

Do not use protected:

- Brands.
- Logos.
- Characters.
- Locations.
- Questlines.
- Music.
- Exact visual designs.

Use original lore, names, worlds, characters, mechanics, and designs.

## Recommended Stack

- React.
- TypeScript.
- Vite.
- Three.js.
- React Three Fiber.
- Drei only after the primitive debug scene is stable.
- Convex later as persistent world state.

## Build Order

1. Static 3D scene.
2. Player avatar.
3. WASD movement.
4. Six AI citizen placeholders.
5. Agent labels or inspector support.
6. Click-to-inspect agent panel.
7. Activity feed.
8. Civilisation panel.
9. Building placeholders.
10. World selector placeholder.
11. Local world event input.
12. Convex world state.
13. Action validation.
14. Model router.
15. AI conversations.
16. Planet evolution engine.
17. Agent creation system.

## Acceptance Criteria For Current MVP

- `npm run dev` works.
- Viewport is not blank.
- Player appears.
- WASD movement works.
- Six agents appear.
- Clicking an agent opens inspector.
- Activity feed appears.
- Civilisation panel appears.
- World event input adds a feed entry locally.


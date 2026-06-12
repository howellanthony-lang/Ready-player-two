# Codex Build Prompt: Ready Player Two

You are working inside:

```text
git@github.com:howellanthony-lang/Ready-player-two.git
```

The project is based on `a16z-infra/ai-town` and is being transformed into Ready Player Two / NEXUS Worlds: a visual AI simulation game where agents talk, remember, form relationships, complete goals, and react to world events.

## Do Not Break The Base App

Keep the app runnable at all times.

Before adding advanced systems, verify:

- `npm run dev` works.
- The 3D viewport renders.
- Player movement works.
- Six agents are visible.
- Agent click inspection works.

## Phase 1: Rebrand And Context

- Keep public naming legally original.
- Add project docs.
- Explain the MVP and commercial roadmap.
- Do not copy protected IP, brands, logos, characters, or locations.

## Phase 2: Starter World

Create a starter world called Ironvale with:

- Mason Briggs, Builder.
- Ava Stone, Medic.
- Theo Vale, Inventor.
- Elsie Hart, Farmer.
- Rex Calder, Guard.
- Nova Quinn, Explorer.

Each character should eventually have:

- Name.
- Role.
- Personality.
- Backstory.
- Mood.
- Current goal.
- Long-term goal.
- Relationship defaults.
- Starting location.

## Phase 3: Activity Feed

Display:

- Conversations.
- World events.
- Relationship changes.
- New memories.
- Goal changes.
- Important actions.

## Phase 4: Character Inspector

Clicking a character should show:

- Name.
- Role.
- Mood.
- Current goal.
- Current action.
- Recent memories.
- Relationships.
- Last conversation.

## Phase 5: World Event Input

The player can type an event such as:

```text
A storm is coming tonight.
```

First version:

- Add it to local activity feed.

Later version:

- Store it.
- Make agents react.
- Add memories.
- Update goals.

## Technical Rules

- Use TypeScript.
- Keep code modular.
- Do not commit secrets.
- Add `.env.example` only if environment variables are documented.
- Use existing AI Town systems where possible.
- Avoid changing Convex schema without migration notes.
- Do not add AI calls until the local playable loop works.


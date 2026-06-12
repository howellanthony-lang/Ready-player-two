# MVP Specification

## MVP Name

Ready Player Two: Living World Demo

## Primary Goal

Let a player visually see a small simulated world with citizens, movement, inspection, world status, and local event logging.

## Required Features

### 1. Visual World

The first world is a small 3D Origin Planet debug scene:

- Dark background.
- Green ground plane.
- Red origin marker/building.
- Blue player avatar.
- Six orange AI citizen placeholders.
- Stable camera looking at the origin.

### 2. Player Avatar

The player appears in the scene and moves with:

- `W` forward.
- `A` left.
- `S` backward.
- `D` right.

Movement must be local-only for now and should not require Convex.

### 3. Starter Citizens

Use six starter citizens:

- Mason Briggs: Builder, focused.
- Ava Stone: Medic, calm.
- Theo Vale: Inventor, curious.
- Elsie Hart: Farmer, happy.
- Rex Calder: Guard, alert.
- Nova Quinn: Explorer, excited.

Each citizen needs:

- Name.
- Role.
- Mood.
- Current goal.
- Recent memory.
- Skill focus.
- Position in the world.

### 4. Character Inspector

Clicking an agent should show:

- Name.
- Role.
- Mood.
- Current goal.
- Recent memory.
- Skill focus.

### 5. Activity Feed

Show local feed entries for:

- World start.
- Character goals.
- Evolution milestones.
- Player-created world events.

### 6. Civilisation Panel

Show the current state of the world:

- World name.
- Day.
- Age.
- Goal.
- Citizens.
- Current structures.
- Next milestone.

### 7. World Event Input

The player can type an event such as:

```text
A storm is coming tonight.
```

The app should immediately add:

```text
[World Event] A storm is coming tonight.
```

For the MVP this is local UI state only. Agent reactions can come after the first playable loop is stable.

## Acceptance Criteria

- `npm run dev` works.
- The viewport is not blank.
- The player appears.
- WASD movement works.
- Six agents appear.
- Clicking an agent opens the inspector.
- Activity feed appears.
- Civilisation panel appears.
- World event input adds a feed entry locally.


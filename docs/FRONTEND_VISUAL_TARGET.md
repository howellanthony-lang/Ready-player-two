# Frontend Visual Target

This document locks the approved front-end look for NEXUS Worlds.

## Approved Direction

The game should look like a cinematic sci-fi survival colony command interface wrapped around a playable 3D world.

The target is not a plain prototype UI.

The target is:

```text
High-detail sci-fi world centrepiece
Dark glass HUD panels
Blue neon highlights
Orange/red danger highlights
Readable resource bar
Agent inspector
Activity feed
World event controls
Tech tree strip
Clear storm/danger alerts
```

## First Public Demo Visual Goal

The first public demo should feel like:

```text
You are watching the birth of a civilisation on Origin Planet.
A storm is coming.
Six AI citizens are trying to survive.
You are the Founder guiding them with tools, events and time control.
```

## Main Screen Layout

### Top Bar

Show:

- NEXUS Worlds logo
- Origin Planet
- Origin Age
- Day number
- time of day
- speed control, including x10 later
- people count
- food
- wood
- stone
- metal
- research
- morale
- menu button

### Centre

The centre must be the 3D playable world.

It should show:

- campfire
- shelters
- wood piles
- resource crates
- farming area
- unfinished shelter frame
- sci-fi colony equipment
- storm clouds in the distance
- lightning/weather danger
- agent nameplates
- selected agent highlight

### Left Panel

World Status panel should show:

- planet image or world thumbnail
- Origin Planet
- current age
- current day
- weather
- temperature later
- threat level
- shelter status
- food status
- water status later
- safety status
- morale
- next milestone
- upcoming council/storm events

### Right Panel

Selected Agent panel should show:

- selected agent name
- role
- portrait or avatar icon
- level/progress later
- mood
- energy
- health
- current goal
- current action
- recent memory
- relationship with Founder/player
- tabs for details, inventory, skills, relationships later

### Bottom Left

Activity Feed should show the living story:

- Founder actions
- agent decisions
- event alerts
- tech progress
- resource changes
- building updates
- council results

Example:

```text
[Founder] Gave basic tools to Mason.
[Mason] Started gathering wood.
[Event] A storm is coming.
[Ava] Checking medical supplies.
[Theo] Researching basic tools.
```

### Bottom Centre

Creator tools and event controls:

- Give Tools
- Trigger Event
- Bless Resource
- Reveal Land
- Speed Up Time
- World Event input
- Trigger Event button
- Advance Day button

### Bottom Right

Tech Tree strip:

- Fire
- Tools
- Construction
- Farming
- Storage
- Electricity locked
- Flying Cars locked later
- Spaceport locked later

Show current research and progress.

## Visual Style Rules

Use:

- dark navy/black background
- glass panels
- thin neon blue borders
- orange/red warning states
- green success states
- yellow morale/alert states
- crisp readable text
- large 3D world viewport
- clear spacing

Avoid:

- plain white viewport
- cluttered panels
- tiny unreadable text
- too many buttons at MVP stage
- generic dashboard look
- AAA asset dependency before gameplay works

## First Demo Name

```text
NEXUS Worlds: First Storm Demo
```

## First Demo Core Moment

The first playable demo should centre on this moment:

```text
The Founder warns the colony that a storm is coming.
Agents react based on their roles.
Mason starts shelter.
Ava checks supplies.
Rex patrols.
Elsie protects food.
Theo researches better tools.
Nova scouts safer ground.
The activity feed records the birth of civilisation.
```

## Frontend Acceptance Criteria

The front end is good enough for the first live demo when:

- the 3D viewport is visible and attractive
- the UI looks like a sci-fi command centre
- the player can see the world state instantly
- selected agents feel alive
- world events are easy to trigger
- the activity feed tells a story
- tech progress is visible
- the player understands the next milestone
- the screen feels like a game, not a form

## Immediate Build Priority

1. Fix blank 3D viewport.
2. Add visible terrain and camp scene.
3. Add cinematic dark sci-fi UI styling.
4. Add proper top resource bar.
5. Add world status panel.
6. Add selected agent inspector.
7. Add activity feed.
8. Add world event and Advance Day controls.
9. Add tech tree strip.
10. Make the First Storm Demo feel playable.

# Locked Product Goal

This document records the confirmed product direction for NEXUS Worlds / Ready Player Two.

## Core Player Fantasy

The player is the creator, founder and invisible avatar inside a living AI civilisation.

The player can walk around, influence the world, trigger events, give NPCs the tools they need, create their own story and watch AI citizens evolve like a living ant-farm civilisation.

The experience should combine:

- creator control
- invisible avatar freedom
- Minecraft-style world building
- living AI society watching
- AI RPG quests
- self-directed NPC evolution

## First World

The first world is Origin Planet.

Origin Planet is a primitive sci-fi colony.

It starts with:

- campfire
- survival
- no shelter
- low food
- storm coming

It should eventually evolve into:

- advanced buildings
- AI labs
- flying cars
- spaceport
- portal travel

## First Five-Minute Loop

The first playable loop should be:

1. Spawn on Origin Planet.
2. Walk around.
3. Find Mason.
4. Click Mason.
5. Read Mason's goal.
6. Give NPCs tools/resources to start building the world.
7. Trigger the event: A storm is coming.
8. Agents react.
9. Shelter project starts.
10. Activity feed updates.
11. Player watches agents decide what to do next.

## AI Independence Goal

The final game should support all autonomy levels:

- Level 1: agents react to player/world events
- Level 2: agents choose daily goals
- Level 3: agents hold councils and vote on priorities
- Level 4: agents invent technologies and create quests
- Level 5: agents form relationships, factions and society systems

The MVP should begin with Level 1, then move to Level 2.

## Technology Evolution

Technology should evolve from a mix of:

- faster time progression, around x10 speed
- resources collected
- AI citizens identifying problems
- player choosing or influencing research
- agent councils voting on priorities

The rule is:

```text
Problems create research.
Research unlocks technology.
Technology unlocks buildings.
Buildings unlock jobs.
Jobs make society smarter.
```

## Visible UI For MVP

The first version should show:

- agent goal
- agent mood
- recent memory
- activity feed
- world age
- tech tree progress
- building unlocks

Later versions can add:

- agent needs
- research progress
- building progress
- relationship changes
- council votes
- daily summaries

## Starting Problems

Origin Planet starts with three main problems:

- no shelter
- low food
- storm coming

These problems should force the AI citizens to make decisions.

## Starting Citizens And Priorities

- Mason: shelter, building and infrastructure
- Ava: health, safety and medicine
- Theo: tools, science and technology
- Elsie: food, farming and storage
- Rex: defence, danger and patrols
- Nova: exploration, resources and new land

Agents should disagree productively.

Example:

```text
Mason wants shelter.
Elsie wants farming.
Rex wants patrols.
Theo wants better tools.
Ava wants medical supplies.
Nova wants to explore for safer ground.
```

## Memory System

Store only important memories at first.

Show one recent memory in the agent inspector.

Use memory to slightly change future goals and speech.

Example:

```text
Mason remembers the player helped start the shelter project.
Ava remembers the storm warning.
Theo remembers that better tools are needed.
```

## Win Condition Direction

The project can support multiple goals.

Short-term first goal:

```text
Build shelter, stabilise food and reach Settlement Age.
```

Long-term goals:

```text
Reach Futuristic Age.
Build the first Spaceport.
Unlock portal to Central Hub.
Complete Founder Trial.
Keep civilisation alive across many days.
```

The world should also support open-ended play with no hard ending.

## Time System

MVP:

- no offline simulation yet
- progress only when player is online or presses Advance Day
- manual Advance Day button first

Later:

- coarse offline simulation
- automatic world ticks
- Convex crons
- speed controls including x10 progression

## Visual Style

The visual style should be:

- low-poly sci-fi
- clean UI
- cinematic but simple
- readable
- browser friendly

Do not chase AAA visuals before the core loop works.

## Immediate Dev Priority

The immediate development priority is:

1. Fix the blank 3D viewport.
2. Make the 3D world visible.
3. Add player movement.
4. Add six agents.
5. Add click-to-inspect.
6. Add activity feed.
7. Add storm event reaction.
8. Add shelter project.
9. Add simple tech tree.
10. Add manual Advance Day.

## Core Product Statement

NEXUS Worlds is a creator-led, browser-based 3D AI civilisation game where the player enters Origin Planet, gives AI citizens the tools they need, triggers events, watches them think for themselves, and guides a primitive sci-fi colony into an evolving future civilisation.

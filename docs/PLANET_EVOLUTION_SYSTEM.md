# Planet Evolution System

NEXUS Worlds starts on Day 1 as a basic settlement and can accelerate through civilisation ages until futuristic technologies such as anti-gravity, flying cars, and spaceflight are unlocked.

## First Slice Scope

This first implementation adds the system foundations rather than the full planet simulation:

- TypeScript data structures for ages, speed modes, progress points, technologies, buildings, agents, projects, and activity feed entries.
- Definitions for the required tech tree and building list.
- A deterministic daily simulation loop that generates points, unlocks technology, starts and completes buildings, advances ages, and records feed entries.
- A UI panel showing current day, age, progress points, unlocked technologies, active buildings, completed buildings, and the next milestone.

## Civilisation Ages

The supported ages are:

- origin
- settlement
- town
- industrial
- electrical
- digital
- futuristic

The current first slice starts at `settlement` on Day 1, matching the game goal that the world begins as a basic settlement rather than a blank planet.

## Progress Points

Planet progress is tracked with:

- knowledge
- infrastructure
- culture
- economy
- energy
- transport
- research

Agents and completed buildings generate these points each day. The active speed mode multiplies daily generation so the same rules can support realistic, fast, founder, and god progression.

## Progression Rules

- Agents generate points from their jobs.
- Completed buildings add recurring daily yields.
- Technologies unlock when the planet has enough research points and all prerequisite technologies.
- Buildings unlock from their required technology.
- The simulation starts a build project when an unlocked building is affordable with infrastructure points.
- Build projects complete after their `buildDays` counter reaches zero.
- Ages unlock when their key technologies and buildings exist.
- Activity feed entries are created for age advancement, technology discovery, futuristic technology discovery, building starts, and building completions.

## Extension Notes

The current loop is intentionally small. Next iterations can connect it to existing AI Town agent schedules, persistent world saves, player-authored building placement, population growth, and world events without changing the core definitions.

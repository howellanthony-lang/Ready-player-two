# Self-Evolving AI Architecture

Reference:
https://butschster.medium.com/building-self-evolving-ai-systems-exploring-the-architecture-a63912fd72c4

## Why This Matters

NEXUS Worlds is not just a game where AI agents talk.

The long-term goal is a living AI civilisation system where agents can:

- Discover problems
- Propose solutions
- Use available capabilities
- Create new capabilities
- Register new tools
- Evolve settlements into futuristic societies

## Core Idea

The system should not allow AI agents to do anything randomly.

Instead, AI agents should act through a registry of valid capabilities.

A capability is a controlled action with:

- Name
- Description
- Input schema
- Output schema
- Cost
- Requirements
- Safety rules
- Game effects

## Activity vs Workflow

Activity:
A single action the world knows how to perform.

Examples:

- Gather Resource
- Build Shelter
- Research Technology
- Create Agent
- Start Quest
- Trade Item

Workflow:
A planned sequence of activities.

Examples:

- Found First Settlement
- Prepare For Storm
- Build First School
- Unlock Electricity
- Create Flying Car Industry
- Build Spaceport

## NEXUS Application

Agents should evolve the world by composing valid capabilities.

Example goal:
Improve transport.

Possible workflow:

1. Build roads
2. Research engineering
3. Unlock electricity
4. Build power station
5. Research computing
6. Research anti-gravity
7. Build anti-gravity lab
8. Unlock flying cars
9. Build flying car depot

## Important Rule

AI does not directly mutate the world.

AI proposes actions. The game validates actions. Only valid actions change world state.

## First Implementation

For the first version, build a simple Capability Registry in TypeScript.

Start with these capabilities:

- gather_resource
- build_shelter
- build_farm
- research_technology
- create_agent
- trigger_world_event
- start_quest
- complete_building
- unlock_age

## Future Implementation

Later, this could become a full workflow engine where AI agents can create and improve workflows.

Possible future systems:

- Capability registry UI
- Admin approval for new capabilities
- AI-created workflows
- Versioned capabilities
- Agent-run civilisation planning
- Self-improving world simulations

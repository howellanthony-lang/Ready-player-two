# NEXUS Worlds — Master Unreal Game Model

This is the locked end model for NEXUS Worlds before moving into Unreal Engine.

## One-Line Vision

NEXUS Worlds is a first-person Unreal Engine open-world AI civilisation game where the player creates their own Founder, enters living worlds, guides AI citizens, completes creative missions, and watches civilisation evolve from survival camp to futuristic multi-world society.

## Core Identity

The player is not just a camera or god-mode controller.

The player is the Founder.

The Founder enters the Nexus in first-person POV, creates their own identity, chooses a starting career, and shapes the world through decisions, missions, relationships and civilisation-building.

The story is not one fixed story.

It is the player's own story.

## Format Inspiration

Use broad format inspiration from:

- GTA-style open-world freedom
- Star Citizen-style sci-fi scale and future travel
- survival/civilisation-building games
- living AI simulation systems

Do not copy protected IP.

Do not copy names, maps, missions, vehicles, ships, UI, brands, radio, characters, storylines, factions or assets from other games.

NEXUS Worlds must remain original.

## Unique Selling Point

The game is not better because it is bigger.

The game is better because the world is alive.

Core USP:

```text
A living AI civilisation where citizens think, remember, work, disagree, build, research, travel and evolve society around the player's Founder choices.
```

## Player Fantasy

The player should feel:

- I created my Founder.
- I entered the Nexus.
- I found a vulnerable world.
- My choices helped people survive.
- The citizens remember what I did.
- The world changed because of me.
- This civilisation is becoming something unique.

## Camera and Control

Primary gameplay direction:

- first-person POV
- direct walking/exploration
- interact with citizens and objects
- inspect world elements
- use tools/actions through HUD
- optional third-person later, but first-person is core

## Game Flow

```text
Launch Game
↓
Login / Guest Mode
↓
Founder Profile
↓
Character Creation
↓
Career Selection
↓
Cinematic Loading Screen
↓
Spawn on Origin Planet
↓
First Storm Demo
↓
Settlement Growth
↓
Technology Evolution
↓
Vehicles and City Expansion
↓
Spaceport and Multi-World Travel
```

## Founder Creation

The player can customise their Founder.

MVP character creator:

- Founder name
- avatar preset
- body/outfit preset
- colour accent
- career/path

Future Unreal creator:

- face
- hair
- body
- clothing
- armour/suit
- visor/helmet
- accessories
- voice style later
- personality background later
- Founder symbol/emblem

Character creation affects the story, not only visuals.

## Founder Careers

Starting career choices:

- Architect — building and shelter
- Engineer — tools and technology
- Medic — health and safety
- Farmer — food and storage
- Scout — exploration and discovery
- Guardian — safety and defence

Careers should influence early dialogue, trust bonuses, starter flavour and early strengths.

They should not permanently lock the player out of content.

## First World

First world:

```text
Origin Planet
```

Opening situation:

- Day 1
- no proper shelter
- low food
- campfire
- basic supplies
- storm forming
- six citizens
- Founder has just arrived

## First Demo

First playable demo:

```text
NEXUS Worlds: First Storm Demo
```

Core first 10 minutes:

1. Create Founder.
2. Choose career.
3. Load into Origin Planet.
4. Walk in first-person.
5. Meet Mason.
6. Inspect Mason's goal.
7. Give tools.
8. Trigger storm warning.
9. AI citizens react.
10. Shelter project starts.
11. Activity feed records events.
12. Advance Day.
13. Daily summary appears.
14. World changes visibly.

## First AI Citizens

Start with six memorable citizens.

### Mason

Role: Builder
Focus: shelter, construction, infrastructure
Personality: focused

### Ava

Role: Medic
Focus: health, safety, treatment
Personality: calm

### Theo

Role: Inventor
Focus: tools, research, technology
Personality: curious

### Elsie

Role: Farmer
Focus: food, farming, storage
Personality: practical

### Rex

Role: Guard
Focus: safety, patrols, defence
Personality: alert

### Nova

Role: Explorer
Focus: scouting, discovery, resources
Personality: adventurous

Each citizen needs:

- name
- role
- mood
- current goal
- current action
- recent memory
- trust in Founder
- role priority

## AI Citizen System

Simple MVP logic:

```text
Need creates problem.
Problem creates goal.
Goal creates action.
Action creates memory.
Memory shapes future decisions.
```

Storm reaction example:

- Mason reinforces shelter.
- Ava checks supplies.
- Rex patrols camp.
- Elsie protects food.
- Theo researches better tools.
- Nova scouts safer ground.

## Mission System

First mission chain:

1. Enter The Nexus
2. Meet Mason
3. Give Tools
4. The Storm Warning
5. Secure The Camp
6. Advance Day
7. Build First Shelter
8. First Council

Every mission should have:

- clear objective
- reason it matters
- NPC reaction
- visible world change
- activity feed update
- reward or progress

## Creative Mission Philosophy

Missions should not be random fetch quests.

Missions should come from the living world's problems.

Examples:

- build shelter before storm
- secure food
- settle council disagreement
- discover water source
- unlock construction
- repair camp after storm
- decide next priority

## World Evolution

The world should evolve through ages:

1. Survival Camp
2. Settlement
3. Industrial Colony
4. Advanced City
5. Flying Vehicle Era
6. Spaceport Era
7. Multi-World Nexus

Evolution should be caused by player choices, AI work, research, resources and world events.

## Technology System

Problem-led tech tree:

```text
Problem → Research → Technology → Building → Job → Society Growth
```

Early tech tree:

- Fire
- Tools
- Construction
- Farming
- Storage
- Electricity
- Vehicles
- Computing
- Robotics
- Clean Energy
- AI
- Anti-Gravity
- Flying Cars
- Spaceflight
- Spaceport
- World Portal Network

## Building System

Buildings should appear and upgrade visually.

First building project:

```text
First Shelter
```

Progress states:

- 0 percent: no shelter
- 25 percent: frame appears
- 50 percent: partial walls
- 75 percent: covered structure
- 100 percent: functional shelter

Later buildings:

- farm plot
- storage hut
- workshop
- clinic
- watchtower
- research lab
- power station
- vehicle bay
- AI lab
- spaceport

## HUD Direction

Style:

- dark navy sci-fi HUD
- neon cyan borders and highlights
- orange warnings
- green success indicators
- sharp panels
- minimal rounding
- bold clean text
- cinematic but readable

Required first HUD:

- Founder info panel
- current mission tracker
- interaction prompt
- activity feed
- world status
- selected citizen panel
- shelter progress
- tech tree strip
- storm warning
- Advance Day button

## Visual Direction

Unreal visual target:

- first-person cinematic sci-fi survival camp
- storm clouds and lightning
- campfire glow
- rugged terrain
- modular shelter frame
- sci-fi crates/tools
- readable citizen nameplates
- dark blue/orange colour contrast
- clear mission HUD

## Open-World Direction

Long-term open-world format:

- first-person exploration
- settlements and districts
- world events
- vehicles unlocked through tech
- career opportunities
- AI citizen missions
- reputation systems
- economy later
- factions later
- spaceport later
- travel between worlds later

## Vehicles and Future Travel

Vehicles must be earned through civilisation progress.

Progression:

- hand tools
- carts/basic transport
- ground vehicles
- electric vehicles
- drones
- flying cars
- spacecraft
- world portals

Do not build vehicles in the first demo.

## Backend Direction

Prototype can use local/mock state.

Later backend should store:

- Founder profile
- world state
- agents
- memories
- missions
- buildings
- resources
- tech unlocks
- activity feed
- save data

Unreal should eventually sync with backend world state, but the first Unreal slice can run locally.

## Unreal Engine Vertical Slice

First Unreal slice should include:

- first-person controller
- Origin Planet small map
- campfire area
- storm sky/weather
- six citizen actors
- Mason interaction
- Give Tools action
- shelter construction stages
- mission tracker HUD
- activity feed HUD
- Advance Day mock
- daily summary screen

## Do Not Build First

Do not start with:

- full city
- multiplayer
- massive planet scale
- real traffic
- real economy
- shops
- police/crime systems
- space travel
- flying cars
- hundreds of NPCs
- full production auth
- complex AI agents

Start small and make it excellent.

## Development Rule

Every feature must pass this test:

```text
Does this make the First Storm Demo clearer, more playable, more alive, or more emotionally engaging?
```

If no, delay it.

## First Build Acceptance Criteria

The first Unreal-ready version is successful when:

- player can create/load Founder identity
- player can choose career
- loading screen appears
- player spawns in first-person on Origin Planet
- Mason can be found and interacted with
- Give Tools action works
- storm warning can trigger
- six citizens react with different goals
- shelter progress changes visually
- activity feed tells the story
- Advance Day produces daily summary
- mission tracker progresses
- world feels alive even at small scale

## Final Product Vision

The end game is an original Unreal Engine open-world AI civilisation game where the player's Founder begins on a vulnerable planet and helps build a society that can grow into cities, flying vehicles, spaceports and multiple worlds.

The goal is not to copy GTA or Star Citizen.

The goal is to create a living world that feels more personal, reactive and memorable than a standard open-world game.

## Unreal First Storm Implementation Contract

This implementation contract narrows the master vision into the first Unreal vertical slice. It does not expand the slice to multiplayer, vehicles, space travel, large cities or production AI services.

### Recommended Content Structure

```text
Content/
  Blueprints/
    Characters/
      BP_FounderCharacter
      BP_Citizen_Base
      BP_Citizen_Mason
    GameLogic/
      BP_MissionManager
      BP_ActivityFeedManager
      BP_StormManager
      BP_ShelterManager
  UI/
    WBP_LoadingScreen
    WBP_FounderProfile
    WBP_CareerSelect
    WBP_GameHUD
    WBP_MissionTracker
    WBP_ActivityFeed
    WBP_InteractionPrompt
    WBP_DailySummary
    WBP_TechTree
  DataAssets/
    DA_Careers
    DA_CitizenPresets
    DA_Missions
  Maps/
    OriginPlanet
  Materials/
  Sounds/
```

### Blueprint Responsibilities

- `BP_FounderCharacter`: first-person camera, movement, camp bounds, proximity detection and explicit interaction input.
- `BP_Citizen_Base`: common role, mood, energy, trust, current goal, current action and recent memory state.
- `BP_MissionManager`: deterministic mission state and objective progression.
- `BP_ActivityFeedManager`: ordered local event history and HUD notifications.
- `BP_StormManager`: storm state, lighting changes, lightning effects and citizen reaction dispatch.
- `BP_ShelterManager`: construction progress and visible shelter stages.
- UMG widgets: event-driven presentation of Founder setup, HUD, prompts, daily summary and tech state.

### Build Order

1. Create the Founder first-person controller and bounded movement.
2. Block out the Origin Planet camp and static landmarks.
3. Add the six citizen actors and shared citizen state.
4. Implement the deterministic mission manager.
5. Add the HUD, mission tracker, activity feed and interaction prompt.
6. Add proximity checks and Mason interaction.
7. Add storm triggering, visual effects and scripted citizen reactions.
8. Add visible shelter construction stages.
9. Add manual day advancement and the daily summary.
10. Add Founder profile and career setup.
11. Add the cinematic loading transition.
12. Package, test and polish the complete First Storm mission flow.

### Technical Rules

- Keep all first-slice state deterministic and local.
- Do not add external AI model calls to the vertical slice.
- Use Behavior Trees and EQS only where they improve observable citizen behaviour.
- Prefer event-driven UMG updates over expensive per-frame widget bindings.
- Treat the React First Storm demo as a gameplay and visual reference, not production Unreal code.
- Confirm the exact supported Unreal Engine version before creating or upgrading the `.uproject`; do not assume a future engine version is installed.

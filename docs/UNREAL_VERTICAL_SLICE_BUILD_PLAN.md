# NEXUS Worlds — Unreal Vertical Slice Build Plan

This is the first practical Unreal Engine build plan for NEXUS Worlds.

It turns the master game model into a small playable Unreal slice.

## Goal

Build a small, polished vertical slice called:

```text
NEXUS Worlds: First Storm Demo
```

This is not the full game.

This is the proof that the core fantasy works:

```text
Create Founder → enter Origin Planet → meet Mason → give tools → trigger storm → AI citizens react → shelter progresses → Advance Day → world changes.
```

## Engine Direction

Use Unreal Engine 5.

Recommended first build style:

- Blueprint-first for speed
- C++ only when needed for clean reusable systems
- local/mock data first
- no backend dependency in the first Unreal slice
- no multiplayer yet
- no marketplace/economy yet
- no full open city yet

## First Project Name

```text
NexusWorlds
```

## Recommended Unreal Folder Structure

```text
Content/
  NexusWorlds/
    Art/
      Materials/
      Meshes/
      VFX/
      UI/
    Audio/
    Blueprints/
      Characters/
      Citizens/
      Interactions/
      Missions/
      WorldEvents/
      Buildings/
      UI/
      Systems/
    Data/
      Careers/
      Citizens/
      Missions/
      Tech/
    Maps/
      L_OriginPlanet_StormDemo
    Widgets/
      HUD/
      Menus/
      Loading/
    Developer/
```

## First Map

Map name:

```text
L_OriginPlanet_StormDemo
```

Map contents:

- rugged sci-fi survival camp
- campfire centre
- Mason near shelter frame
- shelter construction frame
- six citizen positions
- basic tents/crates/tools
- storm clouds
- lightning VFX placeholder
- watchtower or beacon prop
- resource pile props
- clear player spawn point

## Core Blueprint Classes

### BP_FounderCharacter

First-person player character.

Responsibilities:

- movement
- camera
- interact trace
- use/interact input
- hold Founder profile reference

### BP_CitizenBase

Base class for AI citizens.

Properties:

- citizenName
- role
- mood
- currentGoal
- currentAction
- recentMemory
- trustInFounder
- interactText

### BP_Citizen_Mason

Builder citizen preset.

### BP_Citizen_Ava

Medic citizen preset.

### BP_Citizen_Theo

Inventor citizen preset.

### BP_Citizen_Elsie

Farmer citizen preset.

### BP_Citizen_Rex

Guard citizen preset.

### BP_Citizen_Nova

Explorer citizen preset.

### BP_InteractableBase

Base interactable object.

Examples:

- tool crate
- shelter frame
- campfire
- citizen interaction

### BP_ShelterProject

Tracks shelter progress.

Progress stages:

- 0 percent: empty frame
- 25 percent: frame visible
- 50 percent: partial walls
- 75 percent: roof cover
- 100 percent: completed shelter

### BP_StormEventManager

Triggers storm warning.

Responsibilities:

- set storm active
- update sky/weather visuals
- update citizens' goals
- add activity feed entries
- update mission progress

### BP_MissionManager

Tracks First Storm Demo mission chain.

Missions:

- Enter The Nexus
- Meet Mason
- Give Tools
- The Storm Warning
- Secure The Camp
- Advance Day
- Build First Shelter
- First Council

### BP_ActivityFeedManager

Stores recent story events.

Example feed entries:

- Founder arrived on Origin Planet.
- Mason is waiting near the shelter frame.
- Founder gave Mason tools.
- Storm warning detected.
- Shelter project started.

### BP_AdvanceDayManager

Runs a simple mocked day update.

Responsibilities:

- increase day count
- advance shelter progress
- update citizen actions
- add daily summary
- unlock next mission if requirements met

## Data Assets

### DA_FounderCareer

Fields:

- careerId
- displayName
- description
- starterBonusText
- preferredCitizen
- openingFlavourText

Careers:

- Architect
- Engineer
- Medic
- Farmer
- Scout
- Guardian

### DA_CitizenProfile

Fields:

- name
- role
- defaultMood
- defaultGoal
- defaultAction
- defaultMemory
- startingTrust

### DA_MissionDefinition

Fields:

- missionId
- title
- objective
- completionCondition
- rewardText

### DA_TechNode

Fields:

- techId
- displayName
- status
- requirementText

Early tech nodes:

- Fire
- Tools
- Construction
- Farming
- Storage
- Electricity locked
- Vehicles locked
- Flying Cars locked
- Spaceport locked

## UI Widgets

### WBP_LoginScreen

MVP:

- Continue as Guest
- Start New Founder

### WBP_FounderProfileScreen

- Founder name entry
- confirm button

### WBP_CharacterCreatorScreen

MVP:

- avatar preset selector
- outfit preset selector
- colour accent selector

### WBP_CareerSelectScreen

- career cards
- description
- starter bonus text
- continue button

### WBP_LoadingScreen

Shows:

- NEXUS Worlds logo
- Origin Planet background
- selected Founder career
- loading text

Example:

```text
Entering Origin Planet...
Day 1: No shelter. Food is low. A storm is forming.
```

### WBP_GameHUD

Contains:

- Founder info panel
- current mission tracker
- interaction prompt
- selected citizen panel
- activity feed
- world status
- shelter progress
- simple tech tree
- storm warning
- Advance Day button

### WBP_DailySummary

Shows the results of Advance Day.

Example:

```text
Day 2 Summary
Mason gathered wood.
Ava checked supplies.
Rex patrolled camp.
Shelter progress: 35%.
Storm risk: High.
```

## First Gameplay Flow

1. Player launches game.
2. Login/guest screen appears.
3. Player enters Founder name.
4. Player chooses simple character preset.
5. Player chooses career.
6. Loading screen plays.
7. Player spawns on Origin Planet.
8. HUD shows current mission: Meet Mason.
9. Player walks to Mason.
10. Player presses interact.
11. Mason details shelter problem.
12. Mission updates to Give Tools.
13. Player gives tools.
14. Shelter project starts.
15. Storm warning triggers.
16. Citizens update goals.
17. Activity feed records events.
18. Player presses Advance Day.
19. Shelter progresses.
20. Daily summary appears.
21. First Council unlocks after shelter milestone.

## First Controls

Suggested controls:

- WASD: move
- Mouse: look
- E: interact
- Tab: mission/profile menu later
- M: map later
- F: Founder tool action later
- Esc: pause

## HUD Style

Use:

- dark navy panels
- neon cyan borders
- orange warning text
- green success indicators
- sharp sci-fi rectangles
- minimal clutter
- readable first-person HUD

## Storm Visual Direction

When storm activates:

- sky darkens
- blue vignette appears
- lightning flashes
- campfire glow feels stronger
- storm warning appears in HUD
- activity feed updates
- citizens change goals

## First Acceptance Criteria

The Unreal vertical slice is successful when:

- project opens in Unreal Engine
- player can launch the Origin Planet map
- first-person movement works
- onboarding screens can be clicked through
- Founder name and career appear in HUD
- Mason can be interacted with
- Give Tools action works
- storm event can trigger
- six citizen actors exist in the camp
- citizen goals update after storm
- shelter progress changes visibly
- activity feed updates
- Advance Day works
- daily summary appears
- no copied GTA or Star Citizen assets/IP are used

## Build Order

### Step 1: Unreal Project Setup

- create UE5 project
- configure folder structure
- create Origin Planet test map
- add first-person controller

### Step 2: HUD Mock

- create core HUD widgets
- add Founder panel
- add mission tracker
- add interaction prompt
- add activity feed

### Step 3: Founder Flow

- login/guest screen
- profile screen
- character preset screen
- career select screen
- loading screen

### Step 4: Camp and Citizens

- create camp layout
- add six citizen actors
- add nameplates
- add interactable Mason

### Step 5: Mission Loop

- Meet Mason
- Give Tools
- Storm Warning
- Secure Camp
- Advance Day
- Build First Shelter

### Step 6: Shelter Project

- add shelter progress variable
- add construction stage meshes/placeholders
- update stage after Give Tools and Advance Day

### Step 7: Storm Event

- update environment
- update citizen goals
- update activity feed
- update mission tracker

### Step 8: Polish Pass

- lighting
- VFX placeholders
- sound placeholders
- UI readability
- camera feel

## Hard Rule

Do not expand beyond the First Storm Demo until this vertical slice feels good.

The game wins by making one small world feel alive first.

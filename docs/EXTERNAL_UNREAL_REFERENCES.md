# External Unreal Reference Repositories

This document records external Unreal Engine repositories that may help NEXUS Worlds.

These repos are references only until reviewed.

Do not merge external code directly into gameplay source until licence, engine version, dependencies and architecture have been checked.

## Reference Repos

### TopDownCamera

```text
https://github.com/TadeoM/TopDownCamera.git
```

Potential use:

- camera system reference
- alternative camera prototype
- possible future strategy or settlement overview camera
- useful later if NEXUS Worlds supports first-person plus command/overview camera modes

Important note:

NEXUS Worlds is first-person Founder POV first.

Top-down camera ideas should not replace the first-person Founder fantasy. Treat this as a future optional camera/reference layer.

README and licence were not found through the available fetch path during this pass, so this repo must be manually reviewed before any code is adapted.

### EpicSurvivalGame

```text
https://github.com/tomlooman/EpicSurvivalGame.git
```

Potential use:

- survival game architecture reference
- Unreal C++ sample reference
- interaction and survival loop inspiration
- AI/systems structure reference
- UI and gameplay framework reference

Important note:

The README says the project started in 2015 and uses very old standards and conventions. Treat it as a learning reference, not a direct foundation.

The repository has an MIT licence, but code should still be reviewed before adaptation.

### EpicGames Signup

```text
https://github.com/EpicGames/Signup.git
```

Potential use:

- reference for connecting GitHub access to Epic Games / Unreal Engine source access
- onboarding note for developers who need access to EpicGames private Unreal Engine repositories
- not gameplay code
- not a dependency for NEXUS Worlds

Important note:

The README says users need an Epic account and must register their GitHub ID to access Epic's Unreal Engine repositories. It also notes that new members requesting to join the Epic Games organisation are now added to a secondary Epic Games organisation.

This repo should be treated as setup/admin reference only.

## Safe Local Clone Commands

Clone into the research folder only:

```bash
mkdir -p research/unreal-references
cd research/unreal-references

git clone https://github.com/TadeoM/TopDownCamera.git

git clone https://github.com/tomlooman/EpicSurvivalGame.git

git clone https://github.com/EpicGames/Signup.git
```

Do not move code into `Content/`, `Source/`, or gameplay folders until reviewed.

## Review Checklist

Before adapting anything:

- check licence
- check Unreal Engine version
- check dependencies/plugins
- check whether the code still builds
- check naming/style
- check asset ownership
- check whether the feature helps the First Storm Demo
- avoid copying protected content or assets

## How They Fit NEXUS Worlds

### Use TopDownCamera For

- future settlement overview camera
- future Founder command mode
- camera orbit/zoom ideas
- debugging world layout

Do not use it for the first required player view unless it supports the first-person Founder goal.

### Use EpicSurvivalGame For

- survival loop ideas
- Unreal gameplay architecture patterns
- interaction/inventory reference
- AI bot structure reference
- SaveGame reference later
- C++ project organisation reference

Do not copy the whole project into NEXUS Worlds.

### Use EpicGames Signup For

- understanding Epic Games GitHub access
- helping developers access Unreal Engine source repositories if needed
- setup documentation only

Do not treat EpicGames Signup as gameplay code.

## First Storm Demo Rule

Only adapt ideas that help:

```text
Create Founder → Enter Origin Planet → Meet Mason → Give Tools → Trigger Storm → Citizens React → Shelter Progresses → Advance Day → Daily Summary
```

If a reference does not help that loop, delay it.

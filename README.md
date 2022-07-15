# pdsw-repo-template

A template repo to base other repos on

---

# repo-template

[![GitHub license](https://img.shields.io/badge/license-UNLICENSED-blue.svg?style=for-the-badge)](.//LICENSE)
[![Maintained](https://img.shields.io/badge/Maintained%3F-yes-green.svg?style=for-the-badge)](https://github.com/Sonos-Inc/pdsw-apigee-agproxytool/graphs/commit-activity)
![Release](https://img.shields.io/badge/release-1.1.0-orange.svg?style=for-the-badge)

More badges can be found at [shields.io](https://shields.io/).

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [Overview](#overview)
- [Requirements](#requirements)
- [Installation/Setup](#installationsetup)
- [Usage](#usage)
- [Contents](#contents)
- [Configuration & Best Practices](#configuration--best-practices)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Overview

This repo contains the source code for the Sample-App(Web based). These sample apps use muse APIs to perfom the below action items instead of LAN.
- Fetch HouseHoldID/GroupIDs
- Play/Pause 
- SkipToNext/SkipToPrev
- Volume control (Groups and Individual Players)
- Eventing


# Requirements

- Nodejs
- React
- Ngrok

# Installation/Setup

Steps for setting up the React application locally:

1. Clone the Repo
2. cd pdsw-portal-sample-app/sample-app
3. npm install or npm i (if you face any face difficulties installing using npm try using yarn)
4. npm start (For the React application to start)

# Usage

Once cloned, a .gitignore file can be selected from `gitignorefiles` or the default `.gitignore` can be used. From there, your application or service can be added.

# Contents

These are the template files included in this repo.

```
template-repo
│   README.md
│   .gitignore  
|   LICENSE
|   MIT_LICENSE 
└───.github
│   │   CODEOWNERS
│   │   delete-merged-branch-config.yml
│   │   labeler.yml
│   │   release-drafter.yml
└───gitignorefiles
|   |   README.md
│   │   gradle.ignore
│   │   java.ignore
|   |   ...
```

| File/Folder           | Description                                             |
| :---------:           | ------------------------------------------------------- |
| ./.gitignore          | <ul>A good, default .gitignore file</ul> |
| ./LICENSE/MIT_LICENSE | <ul>LICENSE file for repo. Either LICENSE or MIT_LICENSE can be used depending on your needs</ul> |
| .github/              | <ul>Includes configuration files necessary for Integrations (i.e. automatic branch deletion)</ul> |
| gitignorefiles/       | <ul>.ignore files for different languages and setups. Use these to create your own .gitignore that applies to your project</ul> |

# Configuration & Best Practices

It is best to follow a `feature -> develop -> main` workflow for branch management. Features should be on their own `feature` branch and merged into the `develop` branch. The `develop` branch should be merged once ready for release into `main`.

You will also want to configure access to your repo under `Settings -> Collaborators & Teams`.

The following Integrations/Services are required for full functionality of this repo:
- [Delete merged branch](https://probot.github.io/apps/delete-merged-branch/)
- [issuelabeler](https://github.com/apps/issuelabeler)
- [Release Drafter](https://github.com/apps/release-drafter)
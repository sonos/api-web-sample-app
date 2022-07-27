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
- [Things to Update](#things-to-update)
- [Configuration & Best Practices](#configuration--best-practices)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Overview

This repo contains the source code for the Sample-App(Web based). These sample apps use muse APIs to perfom the below action items instead of LAN.
- Fetch HouseHoldID/GroupIDs
- Play/Pause 
- SkipToNext/SkipToPrev
- Volume control (Groups and Individual Players)
- Eventing (Update the state changes in the WebApp using the events received from the Muse Backend after subscription)


# Requirements

- Nodejs
- React
- Ngrok

# Installation/Setup

Steps for setting up the React application locally:

1. Clone the Repo
2. cd pdsw-portal-sample-app/sample-app/Client
3. npm install or npm i (if you face any face difficulties installing using npm try using yarn)
4. cd ../Server
5. npm install or npm i (if you face any face difficulties installing using npm try using yarn)
6. npm start (For both React and nodejs application to start at once concurrently)


# Things to Update

- Login to the Sonos Developer Portal(https://integration.sonos.com/integrations) and create a new control integration with Redirect URIs to be `http://localhost:3000`
- Update the client_id, secret in config.json(pdsw-portal-sample-app/sample-app/Client/src)
- Open a terminal window and run the command: `ngrok http 8080`
- Update the *Event Callback URL* under the Credentials tab to the https URL genrerated from the ngrok

# Configuration & Best Practices

It is best to follow a `feature -> develop -> main` workflow for branch management. Features should be on their own `feature` branch and merged into the `develop` branch. The `develop` branch should be merged once ready for release into `main`.

You will also want to configure access to your repo under `Settings -> Collaborators & Teams`.

The following Integrations/Services are required for full functionality of this repo:
- [Delete merged branch](https://probot.github.io/apps/delete-merged-branch/)
- [issuelabeler](https://github.com/apps/issuelabeler)
- [Release Drafter](https://github.com/apps/release-drafter)
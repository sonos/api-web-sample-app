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
- docker

# Installation/Setup

Steps for setting up the React application locally:

1. Open Terminal/command prompt and Clone the repository using the command 'gh repo clone Sonos-Inc/pdsw-portal-sample-app'
2. Navigate to the path using 'cd pdsw-portal-sample-app/sample-app'
3. run the command 'docker-compose up -d'
4. Open a new terminal window, *ngrok http 8080*.
5. Then configure the url obtained on the developer portal using steps mentioned in the section 'Configuration of url in developer portal'


# Configuration of url in developer portal
1. Open the website 'https://developer.sonos.com/'
2. Create an account and login.
3. navigate to My Accounts > Integrations.
4. Click on New Integrations. Enter details and click on continue
5. Enter key name e.g. 'test key name'
6. You will be navigated to Client credentials page. In redirect url text box enter the ngrok url

# Configuration & Best Practices

It is best to follow a `feature -> develop -> main` workflow for branch management. Features should be on their own `feature` branch and merged into the `develop` branch. The `develop` branch should be merged once ready for release into `main`.

You will also want to configure access to your repo under `Settings -> Collaborators & Teams`.

The following Integrations/Services are required for full functionality of this repo:
- [Delete merged branch](https://probot.github.io/apps/delete-merged-branch/)
- [issuelabeler](https://github.com/apps/issuelabeler)
- [Release Drafter](https://github.com/apps/release-drafter)

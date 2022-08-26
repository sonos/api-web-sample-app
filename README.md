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
- typescript

# Installation/Setup - Docker

Steps for setting up the React application locally:

1. Open Terminal/command prompt and Clone the repository using the command `gh repo clone Sonos-Inc/pdsw-portal-sample-app`
2. Search Docker software in windows/mac. get docker started by opening the application.
3. Navigate to the path using `cd pdsw-portal-sample-app/sample-app`
4. Run the command `docker-compose up -d`
5. Open a new terminal/command prompt window, `*ngrok http 8080*.`
6. Then configure the forwarding url from ngrok on the developer portal using steps mentioned in the section 'Configuration of url in developer portal'

# Installation/Setup - without Docker
1. Open Terminal/command prompt and Clone the repository using the command `gh repo clone Sonos-Inc/pdsw-portal-sample-app`
2. Navigate to the path using `cd pdsw-portal-sample-app/sample-app'
3. Run the command `cd /Server`
4. Run the command `npm start`
5. Run the command `cd ..`
6. Run the command `cd /Client`
7. Run the command `npm start`

# Create Client credentials
1. Open the website 'https://developer.sonos.com/'
2. Create an account and login.
3. navigate to My Accounts > Integrations.
4. Click on New Integrations. Enter Display name e.g. 'Login service', Description e.g. 'Description' and click on continue.
5. Enter key name e.g. 'test key name'

# Configure authentication
1. Open the file config.json in the location - Client/src/
2. copy paste the clientId, secret in config.json from Client credentials created in the above steps.
3. generate Base64 code using {clientId:secret}from website https://www.base64encode.org/. Paste the generated code in the b64EncodedKeySecret of config.json.

# Configuration of url in developer portal
1. Open the website 'https://developer.sonos.com/'
2. Login your account created in step - Create Client credentials
3. navigate to My Accounts > Integrations.
4. Click on edit for 'Login service'
5. You will be navigated to Client credentials page. In redirect url text box enter the ngrok url

# Open API Specification Generator
The steps for open API spec ggeneration are available in the README at this location:

https://github.com/Sonos-Inc/pdsw-portal-sample-app/tree/read_me/sample-app/Client/src/App/museClient


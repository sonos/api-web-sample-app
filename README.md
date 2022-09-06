# Sample-App (Web Based)

This repo contains the source code for the Sample-App (Web based). This sample app uses muse APIs to perform the below action items instead of LAN.

- Fetch HouseHoldID/GroupIDs
- Play/Pause 
- SkipToNext/SkipToPrev
- Volume control (Groups and Individual Players)
- Eventing

The purpose of this Sample-App is to showcase some examples of how you can integrate your application with the Sonos Ecosystem. Feel free to use it as a reference, or even
download it to use as a template for your own applications.


## Table of Contents

- [Requirements](#Requirements)
- [Installation/Setup](#Installation/Setup)
- [Configuration](#Configuration)

# Requirements

- Nodejs: https://nodejs.org/en/download/
- Ngrok: https://ngrok.com/download
- typescript: https://www.typescriptlang.org/download

# Installation/Setup
## With Docker

Steps for setting up the React application locally with docker. 
Note - you must have Docker for Desktop installed to perform these steps  - https://www.docker.com/products/docker-desktop/:

1. Open Terminal/command prompt and Clone this repository.
2. Ensure Docker is running.
3. In a terminal/command prompt, navigate to this repository
4. Run the command `docker-compose up -d`
5. Open a new terminal/command prompt window, `*ngrok http 8080*.`
6. Configure the forwarding url from ngrok on the developer portal using steps mentioned in the section [Configuration of url in developer portal](#Configuration of url in developer portal)

# Installation/Setup
## Without Docker
1. Open Terminal/command prompt and Clone this repository.
2. In a terminal/command prompt, run `sh sample-app/run.sh`
3. Open a new terminal/command prompt window, `*ngrok http 8080*.`
4. Configure the forwarding url from ngrok on the developer portal using steps mentioned in the section [Configuration of url in developer portal](#Configuration of url in developer portal)

# Configuration
## Create client credentials
1. Open the website https://developer.sonos.com/
2. Create an account and login.
3. Navigate to My Accounts > Integrations.
4. Create a new Control Integration. 
5. In the Control Integration, create a new API Key.

Note - for more guidance on creation of key/secrets and their uses, go to https://developer.sonos.com/build/direct-control/authorize/

## Configure authentication
1. Open the file config.json in the location - `sample-app/Client/src/`
2. Put the clientId & secret from the key created in [Create client credentials](#Create client credentials) in `config.json`.
3. Generate Base64 key & secret in the following format: `clientId:secret`.
4. Paste the generated Base64 key & secret in `b64EncodedKeySecret` inside `config.json`.

## Configuration of url in developer portal
1. Open the website https://developer.sonos.com/
2. Login to your account created in [Create client credentials](#Create client credentials)
3. Navigate to My Accounts > Integrations > Credentials
4. In the "Redirect URL" field of the key you made earlier, enter your ngrok url

## Open API Specification Generator
The steps for open API spec generation are available in the README in `sample-app/Client/src/App/museClient`


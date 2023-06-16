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
- [Installation/Setup](#Setup & Configuration)

# Requirements

- Nodejs: https://nodejs.org/en/download/
- Ngrok: https://ngrok.com/download
	- Note: You must have/create an Ngrok account and follow the directions to add your authtoken
- typescript: https://www.typescriptlang.org/download
- CORS Anywhere: Run `npm install cors-anywhere` in terminal/command prompt (must have installed Nodejs already)

# Setup & Configuration
1. Open Terminal/command prompt and Clone this repository.
2. In terminal/command prompt, run `ngrok http 8080`
3. Create client credentials
	1. Open the website https://developer.sonos.com/
	2. Create an account and login.
	3. Navigate to My Accounts > Integrations.
	4. Create a new Control Integration. 
	5. In the Control Integration, create a new API Key.
	6. In the "Redirect URL" and "Event Callback URL" fields, enter your ngrok forwarding URL (Ends in `.ngrok-free.app`)
	
	Note - for more guidance on creation of key/secrets and their uses, go to https://developer.sonos.com/build/direct-control/authorize/
4. Configure authentication
	1. Open the file config.json in the location - `sample-app/Client/src/`
	2. Put the clientId & secret from the key created in [Create client credentials](#Create client credentials) in `config.json`.
	3. Generate Base64 encoded key & secret in the following format: `clientId:secret`.
	4. Paste the generated Base64 encoded key & secret in `b64EncodedKeySecret` inside `config.json`.
5. Open a new terminal/command prompt window, enter the `sample-app` directory, and run `node cors-format`
6. Start the Application

	a) **With Docker**

    Note - you must have Docker for Desktop installed to perform these steps  - https://www.docker.com/products/docker-desktop/:

	  i. Ensure Docker is running.

	  ii. In a terminal/command prompt, navigate to this repository and enter the `sample-app` directory

	  iii. Run the command `docker-compose up --build`


	b) **Without Docker**

	  i. In a terminal/command prompt, run `sh sample-app/run.sh`
7. Access the application at http://localhost:3000

## Open API Specification Generator
The steps for open API spec generation are available in the README in `sample-app/Client/src/App/museClient`


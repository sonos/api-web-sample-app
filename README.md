# Sample-App (Web Based)

This repo contains the source code for the Sample-App (Web based). This sample app uses muse APIs to perform the below action items instead of LAN.

- Fetch HouseHoldID/GroupIDs
- Play/Pause 
- SkipToNext/SkipToPrev
- Volume control (Groups and Individual Players)
- Eventing

The purpose of this Sample-App is to showcase some examples of how you can integrate your application with the Sonos Ecosystem. Feel free to use it as a reference, or even
download it to use as a template for your own applications.

*Note: There is a known issue where ngrok does not receive some events. This is a limitation of running the server locally and can be fixed by implementing your own remote server.


## Table of Contents

- [Requirements](#requirements)
- [Setup and Configuration](#setup-and-configuration)

# Requirements

- Nodejs: https://nodejs.org/en/download/
- Ngrok: https://ngrok.com/download
	- Note: You must have/create an Ngrok account and follow the directions to add your authtoken
- typescript: https://www.typescriptlang.org/download
- CORS Anywhere: Run `npm install cors-anywhere` in terminal/command prompt (must have installed Nodejs already)

# Setup and Configuration
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
5. Start the Application

   a) **With Docker**
  
    Note - you must have Docker for Desktop installed to perform these steps  - https://www.docker.com/products/docker-desktop/:

      	i. Ensure Docker is running.

      	ii. In a terminal/command prompt, navigate to this repository and enter the `sample-app` directory

      	iii. Run the command `docker-compose up --build`


   b) **Without Docker**
   
	  	i. Enter the `sample-app/Cors` directory and run `node cors-format`  

	  	ii. In a different terminal/command prompt, navigate to `sample-app/Server/`, and run `npm install`
	  
	  	iii. After the install, run `npm start`

	  	iv. Open a diferent terminal/command prompt, navigate to `sample-app/Client`, and run `npm install`

	  	v. After the install, run `npm start`

	  	vi. Ensure to keep both terminal/command prompt open. Do not close.

6. Access the application at http://localhost:3000

## Open API Specification Generator
The steps for open API spec generation are available in the README in `sample-app/Client/src/App/museClient`

## Eventing Structure
Event handling uses [Recoil](https://recoiljs.org/) ([learn more here](https://recoiljs.org/docs/introduction/core-concepts)) to keep track of the playback state, playback metadata, 
group volume, group status, and player information independently of any component. With the exception of player information, each of these pieces of state is represented by a [Recoil Atom](sample-app/Client/src/App/Recoil), which is updated and accessed by calling the result 
of `useRecoilState(AtomName)`. Player information is represented by a Recoil Atom, which is updated and accessed by calling the result of `useRecoilState(AtomFamilyName(PlayerID))`.

When the group player page is navigated to, the atoms are updated by fetching the current state of the group from the Sonos API. From then on, any 
subsequent updates to the playback state are through eventing. There is a single event listener ([`MuseEventHandler`](sample-app/Client/src/App/WebSocket/MuseEventHandler.js)) that, when it receives an event, calls the 
relevant function in [`MuseDataHandlers`](sample-app/Client/src/App/MuseDataHandlers) to format the response and then uses this formatted response to update the respective Recoil Atom.

To allow for [group player components](sample-app/Client/src/App/Components/GroupSubComponents) and [playerComponent](sample-app/Client/src/App/Components/playerComponent.jsx) to access and modify the state of the Atoms, the components are created within a wrapper function component, in which the 
result of `useRecoilState(AtomName)` or `useRecoilState(AtomFamilyName(PlayerID))` is passed through props as `state` and `setState`. Any external or internal changes to the Atom's state are reflected in 
`this.props.state` and the component is automatically re-rendered to reflect the change. Additionally, calling `this.props.setState(newState)` within a 
component modifies its Atom's state as well as its `this.props.state` field.

### Example/Walkthrough for Playback Metadata
In [`groupPlayersComponent`](sample-app/Client/src/App/Components/groupPlayersComponent.jsx), `PlaybackMetaDataComponentWrapper` is called, with the current
group ID and configuration passed through props. In [`PlaybackMetaDataComponentWrapper`](sample-app/Client/src/App/Components/GroupSubComponents/PlaybackMetaDataComponentWrapper.js),
`useRecoilState(playbackMetadataAtom)` is called and passed into `PlaybackMetaDataComponent` through props as `state` and `setState`, along with the group ID and configuration.

When [`PlaybackMetaDataComponent`](sample-app/Client/src/App/Components/GroupSubComponents/playbackMetaDataComponent.jsx)
is first created, it calls [`PlaybackMetadata`](sample-app/Client/src/App/ControlAPIs/playbackMetadata.js), which uses the group ID and configuration to make an API request to get the current group's
playback metadata. Once the API request is received, [`PlaybackMetadataHandler`](sample-app/Client/src/App/MuseDataHandlers/PlaybackMetadataHandler.js) is called
to properly format the request data. `playbackMetadataAtom`'s state is then set to equal the formatted data, and since the Atom was passed into `PlaybackMetaDataComponent`
through props, the component automatically re-renders to display the new playback metadata.

Once the initial value is set, any playback metadata events received by 
[`MuseEventHandler`](sample-app/Client/src/App/WebSocket/MuseEventHandler.js) are passed through [`PlaybackMetadataHandler`](sample-app/Client/src/App/MuseDataHandlers/PlaybackMetadataHandler.js)
and the state of `playbackMetadataAtom` is updated to reflect the new change. These changes are also atomatically re-rendered by `PlaybackMetadataComponent`.
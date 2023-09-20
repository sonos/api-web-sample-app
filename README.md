# Sample-App (Web-based)

This repo contains the source code for the web-based Sample App, which uses the Sonos API rather than LAN to send actions to and get the status of your Sonos system.
The purpose of this Sample App is to showcase some examples of how you can integrate your application with Sonos controls. Feel free to use it as a reference or even
download it to use as a template for your own applications.

### Features
- Authentication
- Fetching households and groups information
- System control actions
  - Play/pause
  - Skip to next/previous track
  - Shuffle and repeat/repeat 1
  - Group volume control
  - Player volume control
  - Grouping/ungrouping players
- Subscriptions for the following event types:
  - Household groups change
  - Group status
  - Group volume
  - Player volume
  - Playback state
  - Playback metadata
- Eventing & state management
  - Fetches initial state of all listed event types and updates state based on received events
- Fetching household's Favorites/Playlists and initiating playback
- Fetching music service provider logos

***Note: There is a known issue where ngrok does not receive some events. This is a limitation of running the server locally and can be fixed by implementing your own remote server.**


## Table of Contents

- [Requirements](#requirements)
- [Setup and Configuration](#setup-and-configuration)
- [Reference](#reference)
  - [Client Flow](#client-flow)
  - [Server/ngrok/WebSocket Structure](#serverngrokwebsocket-structure)
  - [Eventing Structure](#eventing-structure)
  - [Authentication](#authentication)
  - [Login/Households Page](#loginhouseholds-page)
  - [Groups Page](#groups-page)
  - [Group Playback Page](#group-playback-page)

# Requirements

- Nodejs: https://nodejs.org/en/download/
- Ngrok: https://ngrok.com/download
	- Note: You must have/create an Ngrok account and follow the directions to add your auth token
- typescript: https://www.typescriptlang.org/download
- CORS Anywhere: Run `npm install cors-anywhere` in terminal/command prompt (must have installed Nodejs already)

# Setup and Configuration
1. Open terminal/command prompt and clone this repository.
2. In terminal/command prompt, run `ngrok http 8080`
3. Create client credentials
   1. Navigate to https://developer.sonos.com/
   2. Create an account and login.
   3. Navigate to My Accounts > Integrations.
   4. Create a new Control Integration. 
   5. In the Control Integration, create a new API Key.
   6. In the "Event Callback URL" field, enter your ngrok forwarding URL (Ends in `.ngrok-free.app`). Note that every time ngrok is restarted, the Event Callback URL must be updated to the new ngrok URL
	
   Note - for more guidance on creation of key/secrets and their uses, go to https://developer.sonos.com/build/direct-control/authorize/
4. Configure authentication
   1. Open the file [config.json](sample-app/Client/src/config.json) in the location - `sample-app/Client/src/`
   2. Replace `<Insert key from Developer Portal here>` and `<Insert secret from Developer Portal here>` with your Sonos control integration API key client ID and secret, respectively
5. Start the Application

   a) **With Docker**: Recommended for testing the Sample App's capabilities
  
    Note - you must have Docker for Desktop installed to perform these steps  - https://www.docker.com/products/docker-desktop/:

      	i. Ensure Docker is running.

      	ii. In a terminal/command prompt, navigate to this repository and enter the `sample-app` directory

      	iii. Run the command `docker-compose up --build`

   b) **Without Docker**: Recommended for development, as code changes are automatically recompiled
   
	  	i. Enter the `sample-app/Cors` directory and run `node cors-format`  

	  	ii. In a different terminal/command prompt, navigate to `sample-app/Server/`, and run `npm install`
	  
	  	iii. After the install, run `npm start`

	  	iv. Open a diferent terminal/command prompt, navigate to `sample-app/Client`, and run `npm install`

	  	v. After the install, run `npm start`

	  	vi. Ensure to keep both terminal/command prompt open. Do not close.

6. Access the application at http://localhost:3000

## Open API Specification Generator
The steps for open API spec generation are available in the [README in sample-app/Client/src/App/museClient](sample-app/Client/src/App/museClient/README.md)

# Reference
See [Sonos Developer Documentation](https://devdocs.sonos.com/reference/) for information on specific API commands.

## Client Flow
<img alt="Client flow diagram" src=https://github.com/sonos/api-web-sample-app/assets/67022827/b05d2aa5-a879-4b6a-8fd4-68265924ce18 width="60%"/>

## Server/ngrok/WebSocket Structure
The sample application has two main parts: the client and the server. The client handles all user-facing components, while the server listens for Sonos
API events and sends those events to the client via a WebSocket connection.

![Client/Server/ngrok sequence diagram](https://github.com/sonos/api-web-sample-app/assets/67022827/4b27544d-7009-4e86-9ca0-eb28ae37cb29)

In order for the server to receive Sonos API events, the in-use Sonos Control Integration API key must specify a URL for the events to be sent to. For the purpose of demonstrating this Sample App,
ngrok exposes a port on your computer and creates a public URL that allows events to be sent directly to the specified port (8080 in this case).
[Server/main.mjs](sample-app/Server/main.mjs) sets up a server that listens to events sent to port 8080, so any events sent to the ngrok URL are received by the server.

To allow the server to send messages to the client, [Server/main.mjs](sample-app/Server/main.mjs) sets up a WebSocket connection on port 8000. Each time the 
server receives an event, it sends that event to the WebSocket connection. To receive these messages, the client uses the configuration specified in [socket.js](sample-app/Client/src/App/WebSocket/socket.js)
and listens to the WebSocket at ws://localhost:8000 in [`MuseEventHandler`](sample-app/Client/src/App/WebSocket/MuseEventHandler.js). [`MuseEventHandler`](sample-app/Client/src/App/WebSocket/MuseEventHandler.js)
is active while the application is active regardless of which page the user is on, allowing information to be updated when on both the groups page and the group
playback page.

### ngrok Limitations and Scaling
While using the free tier of ngrok, you'll likely notice that many events are not received by the server, especially after a couple of minutes of event handling.
This is a limitation of using ngrok and running the server locally. For a scalable app that uses Sonos control integrations and has event handling, there must be
an external server that receives events and sends them through WebSocket connections to clients. The Sonos control integration API key callback URL
would be then set to that external server's URL.

Despite the severe performance limitations, ngrok is helpful for demonstrating subscriptions and eventing for a Sonos control client. This exact structure
should not be used in a production-ready app.

## Eventing Structure
<img alt="Eventing flow diagram" src=https://github.com/sonos/api-web-sample-app/assets/67022827/bf38ae14-b26d-44ca-b7a4-8b4037e92b29 width="50%"/>

#### Subscriptions
Upon navigating to the groups page or the group player page, the information of various aspects of your Sonos system is fetched and stored. This information can quickly
become outdated when, for example, there is a grouping change in the current household, the currently playing song is changed, a player's volume is changed,
etc. To solve this, Sonos control integrations use subscriptions (See https://devdocs.sonos.com/docs/subscribe). Subscribing to an event type for a group or
household will cause all changes in that type's state for the specified group/household to be sent to the API key callback URL as events. It is important to be able to update the state of
components based on these events to ensure the most up-to-date information is always being displayed.

This event/subscription model is used instead of polling to ensure more timely updates to component states and to reduce the strain on both the device running 
the application and the Sonos API. Within the sample app, each subscription component subscribes when mounted, and when unmounted, the subscription is deleted.
See [subscribe.js](sample-app/Client/src/App/UserDetails/subscribe.js) for an example.

#### Event Handling
Event handling uses [Recoil](https://recoiljs.org/) ([learn more here](https://recoiljs.org/docs/introduction/core-concepts)) to keep track of the playback state, playback metadata, 
group volume, group status, player volume, and the current household's groups information independently of any component. With the exception of player volume, each of these pieces of state is 
represented by a [Recoil Atom](sample-app/Client/src/App/Recoil), which is updated and accessed by calling the result 
of `useRecoilState(AtomName)`. As the number of players is variable, player volume is represented by a Recoil Atom Family, which is updated and accessed by calling the result of `useRecoilState(AtomFamilyName(PlayerID))`.

When the group playback page is navigated to, the atoms are updated by fetching the current state of the group and household from the Sonos API. From then on, any 
subsequent updates to the playback state are through eventing. There is a single event listener ([`MuseEventHandler`](sample-app/Client/src/App/WebSocket/MuseEventHandler.js))
that, when it receives an event, calls the relevant function in [`MuseDataHandlers`](sample-app/Client/src/App/MuseDataHandlers) to format the response and then 
uses this formatted response to update the respective Recoil Atom. The groups page uses a similar process but only for `groupsInfoAtom`, since this page only requires
access to information on the selected household's groups.

To allow for [GroupPlaybackComponent](sample-app/Client/src/App/Components/groupPlaybackComponent.jsx), [group playback subcomponents](sample-app/Client/src/App/Components/GroupSubComponents),
and [PlayerComponent](sample-app/Client/src/App/Components/playerComponent.jsx) to access and modify the state of the Atoms, the components are each created within a wrapper functional component, in which the 
result of `useRecoilState(AtomName)` or `useRecoilState(AtomFamilyName(PlayerID))` is passed through props, often as `state` and `setState`. Any external or internal changes to the Atom's state are reflected in 
`this.props.state` and the component is automatically re-rendered to reflect the change. Additionally, calling `this.props.setState(newState)` within a 
component modifies its Atom's state as well as its `this.props.state` field.

#### Example/Walkthrough for Playback Metadata
In [`groupPlayersComponent`](sample-app/Client/src/App/Components/groupPlaybackComponent.jsx), `PlaybackMetaDataComponentWrapper` is called, with the current
group ID and configuration passed through props. In [`PlaybackMetaDataComponentWrapper`](sample-app/Client/src/App/Components/GroupSubComponents/playbackMetaDataComponentWrapper.js),
`useRecoilState(playbackMetadataAtom)` is called and passed into `PlaybackMetaDataComponent` through props as `state` and `setState`, along with the group ID and configuration.

[`Subscribe`](sample-app/Client/src/App/UserDetails/subscribe.js) is also called in [`groupPlayersComponent`](sample-app/Client/src/App/Components/groupPlaybackComponent.jsx).
Upon [`Subscribe`](sample-app/Client/src/App/UserDetails/subscribe.js) mounting, among other event types, playback metadata events for the selected group are subscribed to. This means that whenever the current track name,
artist name, container name, cover art, or music service changes, the sample app is sent an event containing the new playback metadata state. When the user
navigates off of the group playback page, these events are unsubscribed to, as there is no need to keep track of playback metadata anymore. See
https://devdocs.sonos.com/reference/playbackmetadata-subscribe for more details.

When [`PlaybackMetaDataComponent`](sample-app/Client/src/App/Components/GroupSubComponents/playbackMetaDataComponent.jsx)
is first created, it calls [`PlaybackMetadata`](sample-app/Client/src/App/ControlAPIs/playbackMetadata.js), which uses the group ID and configuration to make an API request to get the current group's
playback metadata. Once the API response is received, [`PlaybackMetadataHandler`](sample-app/Client/src/App/MuseDataHandlers/PlaybackMetadataHandler.js) is called
to properly format the request data. `playbackMetadataAtom`'s state is then set to equal the formatted data, and since the atom's state was passed into `PlaybackMetaDataComponent`
through props, the component automatically re-renders to display the new playback metadata.

Once the initial value is set, any playback metadata events received by [`MuseEventHandler`](sample-app/Client/src/App/WebSocket/MuseEventHandler.js) are passed
through [`PlaybackMetadataHandler`](sample-app/Client/src/App/MuseDataHandlers/PlaybackMetadataHandler.js) and the state of `playbackMetadataAtom` is updated to
reflect the new change. These changes are also automatically re-rendered by `PlaybackMetadataComponent`.

## Authentication
All Sonos Control API calls require an access token (See https://devdocs.sonos.com/docs/authorize for more details). In the Sample App,
this access token is saved in the window's local storage and accessed throughout the application, often through a JSON object named `museClientConfig`. 
Since the access token is saved, refreshing the page or navigating to other sites does not clear the token. The access token expires after 24 hours, but its
corresponding refresh token does not expire. Clicking the sample app's logout button will clear the currently stored access token and initiate the login process from scratch.

<img alt="Authentication flow diagram" src=https://github.com/sonos/api-web-sample-app/assets/67022827/442c5d1c-855c-4a37-8132-5f91939d85a6 width="70%"/>


#### There are three possible access token states a user can encounter when using the sample app:
- `DOES NOT EXIST`: Occurs when sample app is used for the first time, window storage is cleared, or logout button has been clicked
  - Login page is displayed, and a new access token is obtained when the user completes the login process
  - Access token state is set to `VALID`
- `EXPIRED`: Occurs when access token has been last retrieved more than 24 hours ago
  - Access token is updated using the stored refresh token
  - If refresh is successful, access token state is set to `VALID`. Otherwise, state is set to `DOES NOT EXIST`
- `VALID`: Occurs when access token has been last retrieved less than 24 hours ago
  - Households page is displayed

These authentication states are checked using `getAccessTokenState` in [authentication.js](sample-app/Client/src/App/Authentication/authentication.js). See 
[routingController.jsx](sample-app/Client/src/App/Controllers/routingController.jsx) for the specific conditional rendering used to account for these three states.

#### Obtaining a new access token
1. The user clicks the "Log In" button and is redirected to the Sonos login page
2. The user logs into their Sonos account and authorizes the control integration API key specified in [config.json](sample-app/Client/src/config.json)
3. Once the login is completed, Sonos provides a response code within the URL parameters. The sample app retrieves this response code
4. Using this response code, the sample app makes a Sonos API request to generate an access token
5. This access token response, containing the access token, the time until expiration, and a refresh token, is saved to the window's local storage

See [oAuthController.jsx](sample-app/Client/src/App/Controllers/oAuthController.jsx) for the entire process and [createAuthToken.jsx](sample-app/Client/src/App/Authentication/createAuthToken.js)
for the specific Sonos API call used for obtaining the access token.

#### Refreshing an access token
1. The refresh token of the currently stored access token is retrieved from the window's local storage
2. A Sonos API call to refresh the access token is executed, with the refresh token encoded and sent in the data of the request
3. The response of the Sonos API call is used to update the stored access token

See [refreshAuthToken.js](sample-app/Client/src/App/Authentication/refreshAuthToken.js)

## Login/Households Page
#### http://localhost:3000/
- If no API access token is found, login page is displayed
- If there is a saved access token or login successfully generates an access token, a list of households is fetched from Sonos API and displayed as buttons
- For each household button, the list of players in the household is fetched from the Sonos API and displayed on the household's button
- When the user clicks on a household's button, they are taken to that household's groups page
#### Component Sequence:
- [`RouteComponents`](sample-app/Client/src/App/Controllers/routingController.jsx) is the root component for the login/households page. See [Authentication](#authentication)
  for more information on the authentication component sequence.
- If login is complete or if an access token already existed, [`FetchHouseholds`](sample-app/Client/src/App/Controllers/fetchHouseholdsController.jsx) is rendered,
  which calls [`GetHouseholds`](sample-app/Client/src/App/UserDetails/getHouseholds.js) to fetch the list of households from the Sonos API
- When the list of households has been fetched, [`ListHouseholdsComponent`](sample-app/Client/src/App/Components/listHouseholdsComponent.jsx) is rendered, which
  returns a [`HouseholdRoutingController`](sample-app/Client/src/App/Controllers/householdRoutingController.jsx) component for each household
- [`HouseholdRoutingController`](sample-app/Client/src/App/Controllers/householdRoutingController.jsx) calls the Sonos API for a list of players in the household
  and displays a button containing the name of the household and players in the household, and when clicked, the button routes the user to the groups page for that household

## Groups Page
#### http://localhost:3000/households/{householdID}
- On instantiation, fetches list of groups in selected household from Sonos API and displays each group as a button
- Subscribes to selected household's group change events, so the page is automatically re-rendered to reflect any group changes
- When the user clicks on a group's button, they are taken to that group's group playback page
#### Component Sequence:
- [`RouteHousehold`](sample-app/Client/src/App/Routing/routeHousehold.js) is the root component for the groups page. It retrieves the household information from
  the current location and renders [`FetchGroupsControllerWrapper`](sample-app/Client/src/App/Controllers/fetchGroupsControllerWrapper.js).
- [`FetchGroupsControllerWrapper`](sample-app/Client/src/App/Controllers/fetchGroupsControllerWrapper.js) passes the household's group information to
  [`FetchGroups`](sample-app/Client/src/App/Controllers/fetchGroupsController.jsx), which fetches the current household's groups from the Sonos API using
  [`GetGroups`](sample-app/Client/src/App/UserDetails/getGroups.js), subscribes to the household's group events with
  [`GroupsSubscribe`](sample-app/Client/src/App/UserDetails/groupsSubscribe.js), and then calls [`ListGroupsComponent`](sample-app/Client/src/App/Components/listGroupsComponent.jsx)
- [`ListGroupsComponent`](sample-app/Client/src/App/Components/listGroupsComponent.jsx) returns a [`GroupRoutingController`](sample-app/Client/src/App/Controllers/groupRoutingController.jsx)
  for each group
- [`GroupRoutingController`](sample-app/Client/src/App/Controllers/groupRoutingController.jsx) renders a button that displays the group's name, and when clicked,
  the button routes the user to that group's group playback page

## Group Playback Page
#### http://localhost:3000/groups/{groupID}
- On instantiation, playback state, group volume, playback metadata, group state, current household's groups, and grouped players' volumes are fetched
- Displays current playback information and below, a dropdown menu with "Players" as the default selected option. The "Players" option uses the household's
  groups data to display all players in the current household, with a checkbox next to each. This checkbox is checked if the player is in the currently
  selected group, and if checked, that player's volume slider is shown
- Dropdown menu's other two options are "Favorites" and "Playlists", which fetch a list of all favorites and playlists in the current household, respectively,
  and displays each as a button
- Fetches music service logos from [XML URL](https://service-catalog.ws.sonos.com/mslogo) and uses music service provider ID obtained from playback metadata
  Sonos API call to display correct logo
- Subscribes to the following event types and automatically re-renders the page to update the following aspects:
  - Playback: Play/pause button state, shuffle button state, repeat button state
  - Playback metadata: Track name, container name, artist name, track cover art, and music service provider logo
  - Group volume: Group volume slider
  - Group status: Group name. If group disappears (GROUP_STATUS_GONE event), user is automatically navigated back to groups page
  - Household groups: List of players under "Players" dropdown menu selection. Checkboxes and player volume sliders are updated to reflect which players are in selected group
  - Player volume: Player volume sliders of grouped players when "Players" dropdown menu option is selected
- Sonos API controls for group and grouped players:
  - On click, play/pause button toggles play/pause for current group. See [`PlaybackStateButton`](sample-app/Client/src/App/Components/GroupSubComponents/playbackStateButton.jsx)
  - On click, skip back button restarts current track if possible. On two clicks within 4 seconds, skip back button skips to previous track.
    See [`GroupPlaybackComponent`](sample-app/Client/src/App/Components/groupPlaybackComponent.jsx)
  - On click, skip next button skips to next track if possible. See [`GroupPlaybackComponent`](sample-app/Client/src/App/Components/groupPlaybackComponent.jsx)
  - On click, repeat button cycles through repeat/repeat 1/no repeat if possible. See [`GroupPlaybackComponent`](sample-app/Client/src/App/Components/groupPlaybackComponent.jsx)
  - On click, shuffle button toggles shuffle for current group. See [`GroupPlaybackComponent`](sample-app/Client/src/App/Components/groupPlaybackComponent.jsx)
  - On change, group volume slider sends volume command for current group. See [`VolumeComponent`](sample-app/Client/src/App/Components/GroupSubComponents/volumeComponent.jsx)
  - Clicking an unchecked player groups that player to current group. Clicking a checked player ungroups that player. See
    [`PlayerComponent`](sample-app/Client/src/App/Components/playerComponent.jsx)
  - On change, player volume slider sends volume command for specific player. See [`PlayerComponent`](sample-app/Client/src/App/Components/playerComponent.jsx)
  - On click, a favorite/playlist button loads its favorite/playlist to the current group. See [`FavoriteComponent`](sample-app/Client/src/App/Components/favoriteComponent.jsx)
    and [`PlaylistComponent`](sample-app/Client/src/App/Components/playlistComponent.jsx)

#### Component Sequence
- [`RouteGroup`](sample-app/Client/src/App/Routing/routeGroup.js) is the root component for the group playback page. It retrieves the selected group ID and
  household ID from the current location and renders [`GroupPlaybackComponentWrapper`](sample-app/Client/src/App/Components/groupPlaybackComponentWrapper.js)
- [`GroupPlaybackComponentWrapper`](sample-app/Client/src/App/Components/groupPlaybackComponentWrapper.js) passes the selected group's status, playback state,
  and selected household's groups state through props to [`GroupPlaybackComponent`](sample-app/Client/src/App/Components/groupPlaybackComponent.jsx)
- [`GroupPlaybackComponent`](sample-app/Client/src/App/Components/groupPlaybackComponent.jsx):
  - Calls [`Subscribe`](sample-app/Client/src/App/UserDetails/subscribe.js) to subscribe to all group events and
    [`GroupsSubscribe`](sample-app/Client/src/App/UserDetails/groupsSubscribe.js) to subscribe to the household's group change events
  - Calls [`GetGroups`](sample-app/Client/src/App/UserDetails/getGroups.js) to fetch the initial state of which players are in the selected group
  - Renders each of the group playback subcomponents ([`PlaybackMetaDataComponentWrapper`](sample-app/Client/src/App/Components/GroupSubComponents/playbackMetaDataComponentWrapper.js),
    [`PlayBackStateButtonWrapper`](sample-app/Client/src/App/Components/GroupSubComponents/playbackStateButtonWrapper.js), and [`VolumeComponentWrapper`](sample-app/Client/src/App/Components/GroupSubComponents/volumeComponent.jsx))
  - Depending on the dropdown menu selection, one of the following three components is rendered:
    - [`PlayersController`](sample-app/Client/src/App/Controllers/playersController.jsx)
      - For each player, [`PlayerComponent`](sample-app/Client/src/App/Components/playerComponent.jsx) is returned through
        [`PlayerComponentWrapper`](sample-app/Client/src/App/Components/playerComponentWrapper.js)
      - Each [`PlayerComponent`](sample-app/Client/src/App/Components/playerComponent.jsx) fetches its initial volume state with
        [`GetPlayerVolume`](sample-app/Client/src/App/ControlAPIs/getPlayerVolume.js) and subscribes to volume changes with
        [`PlayerVolumeSubscribe`](sample-app/Client/src/App/UserDetails/playerVolumeSubscribe.js)
      - Each [`PlayerComponent`](sample-app/Client/src/App/Components/playerComponent.jsx) displays its grouping checkbox and its volume slider if the checkbox is checked
    - [`FavoritesController`](sample-app/Client/src/App/Controllers/favoritesController.jsx)
      - Calls [`GetFavorites`](sample-app/Client/src/App/UserDetails/getFavorites.js) on instantiation, which fetches a list of the household's favorites from
        the Sonos API
      - Once favorites are fetched, for each favorite, a [`FavoriteComponent`](sample-app/Client/src/App/Components/favoriteComponent.jsx) is returned, which
        displays a button
    - [`PlaylistsController`](sample-app/Client/src/App/Controllers/playlistsController.jsx)
      - Calls [`GetPlaylists`](sample-app/Client/src/App/UserDetails/getPlaylists.js) on instantiation, which fetches a list of the household's playlists from
        the Sonos API
      - Once playlists are fetched, for each playlist, a [`PlaylistComponent`](sample-app/Client/src/App/Components/playlistComponent.jsx) is returned, which
        displays a button

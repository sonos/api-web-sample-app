import React from 'react';
import { Component } from 'react';

import Authentication from '../Authentication/authentication';
import OAuth from './oAuthController';
import FetchUserDetails from './fetchUserDetails';



class RouteComponents extends Component {
    
    state = { is_logged_in : new Authentication().isAccessTokenValid() }

    access_token_handler=(flag) => {
        this.setState({is_logged_in : flag});
    }

    render() { 
        return (
            <div>
                {!(this.state.is_logged_in) && <OAuth 
                                                access_token_handler={this.access_token_handler} 
                                                is_logged_in = {this.state.is_logged_in}/>}
                {this.state.is_logged_in && <FetchUserDetails/>}
            </div>
        );
    }    

}



export default RouteComponents;
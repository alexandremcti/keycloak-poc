import axios from 'axios'
import { AuthenticationClient, AuthenticationConfig } from "./authentication-client";

const TOKEN_URL = 'http://localhost:8080/auth/realms/myrealm/protocol/openid-connect/token'
const GRANT_TYPES = {
    clientCredentials: 'client_credentials',
    passwordCredentials: 'password'
}

export class OpenIdConnectAuthenticationClient implements AuthenticationClient {
    readonly authenticationConfig: AuthenticationConfig;

    constructor(data: AuthenticationConfig){
        this.authenticationConfig = {
            grantType: data.grantType,
            clientId: data.clientId,
            clientSecret: data.clientSecret,
            username: data.username,
            password: data.password,
            scope: data.scope,
        }
    }



    async getToken(): Promise<any> {
        let params;
        if(this.authenticationConfig.grantType === GRANT_TYPES.clientCredentials) {
            params = new URLSearchParams({
                client_id: this.authenticationConfig.clientId,
                client_secret: this.authenticationConfig.clientSecret,
                grant_type: this.authenticationConfig.grantType
            })
        }
        if(this.authenticationConfig.grantType === GRANT_TYPES.passwordCredentials) {
            params = new URLSearchParams({
                client_id: this.authenticationConfig.clientId,
                client_secret: this.authenticationConfig.clientSecret,
                grant_type: this.authenticationConfig.grantType,
                username: this.authenticationConfig.username as string,
                password: this.authenticationConfig.password as string,
                scope: this.authenticationConfig.scope as string,
            })
        }
        try {
            const { data } = await axios.post(TOKEN_URL, params);
            console.log('data', data)
            return data
        } catch (error) {
            console.log(error)
            return {error: error};
        }
    }
}
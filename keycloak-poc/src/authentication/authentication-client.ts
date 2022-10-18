export interface AuthenticationConfig {
    readonly clientId: string;
    readonly clientSecret: string;
    readonly grantType: "authorization_code" | "implicit" | "refresh_token" | "password" | "client_credentials"; 
    readonly username?: string;
    readonly password?: string; 
    readonly scope?: string;
}

export interface  AuthenticationClient {
    authenticationConfig: AuthenticationConfig;

    getToken(): Promise<any>
}
import KeycloakConnect, { KeycloakConfig } from "keycloak-connect";
import session from 'express-session';

const config: KeycloakConfig = {
    realm: 'myrealm',
    "auth-server-url": "http://localhost:8080/auth",
    resource: "express",
    "confidential-port": 0,
    "ssl-required": "external",
}

const memoryStore = new session.MemoryStore()

const keycloakConnect = new KeycloakConnect({
    store: memoryStore
}, config)


export {
    keycloakConnect,
    memoryStore,
}

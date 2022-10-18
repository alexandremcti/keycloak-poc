import express, { NextFunction, Request, Response } from 'express'
import session from 'express-session';
import {keycloakConnect, memoryStore} from './keycloak'
import {OpenIdConnectAuthenticationClient} from './authentication/open-id-connect-authentication-client' 

const app = express();
app.use(express.json())

app.use(session({
    secret: '1234567890',
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
    cookie: {
        maxAge: 1000 * 60 * 10
    }
}))

app.use(keycloakConnect.middleware({
    logout: '/logout',
    admin: '/'
}))

const auth = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    const {body} = request
    console.log('request', body)
    const openIdConnectAuthenticationClient = new OpenIdConnectAuthenticationClient({
        grantType: `password`,
        clientId: 'myclient',
        clientSecret: 'p2yt38QN7BERgtO0IH8P12kXbbwVxr2d',
        username: body.username,
        password: body.password,
        scope: 'openid',
    })
    const tokenResponse = await openIdConnectAuthenticationClient.getToken();
    response.json(tokenResponse);
    next()
}

//app.set( 'trust proxy', true );



app.post('/no-protected', async (req, res, next) => {
    console.log(req.body)
    res.json({message: 'Hello World'})
})

//inicia o fluxo de openid connect do keycloak 
app.get('/', keycloakConnect.protect(), async (req, res, next) => {
    res.json({message: 'Hello World'})
})

//verifica se o usuário está autenticado
app.get('/check-sso', keycloakConnect.checkSso(), async (request: Request, response: Response, next: NextFunction ) => {
    response.json({message: 'authenticated'})
})

app.get('/protected', keycloakConnect.protect(),  async (req, res, next) => {
    const {name} = req.query
    res.json({message: `Hello World ${name}`})
})
//middleware de autenticação manual
//app.use(auth)

//inicia fluxo de openid connect sem usar o keycloack adapter
app.post('/sessions',  keycloakConnect.protect(), async (request: Request, response: Response, next: NextFunction ) => {
    console.log('body', request.body)
    return response.json({status: "ok"})
})

app.listen(3000, () => console.log('running'))
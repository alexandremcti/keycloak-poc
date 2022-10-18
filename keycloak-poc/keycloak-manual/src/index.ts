import express, { NextFunction, Request, Response } from 'express'
import {OpenIdConnectAuthenticationClient} from './authentication/open-id-connect-authentication-client' 

const app = express();
app.use(express.json())


const auth = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    const {body} = request
    const openIdConnectAuthenticationClient = new OpenIdConnectAuthenticationClient({
        grantType: `password`,
        clientId: 'myclient',
        clientSecret: 'p2yt38QN7BERgtO0IH8P12kXbbwVxr2d',
        username: body.username,
        password: body.password,
        scope: 'openid',
    })
    const tokenResponse = await openIdConnectAuthenticationClient.getToken();
    console.log('response', tokenResponse)
    response.json(tokenResponse);
    next()
}

//async(req, res, next) => await auth(req, res, next),
//inicia fluxo de openid connect sem usar o keycloack adapter

app.post('/sessions', auth, async (request: Request, response: Response, next: NextFunction ) => {
    console.log('body', request.body)
    return response
})

app.get('/query', async (request: Request, response: Response, next: NextFunction ) => {
    console.log('query', request.query)
    return response.json({status: "ok"})
})

app.listen(3001, () => console.log('running on port 3001'))
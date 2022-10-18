import {createHmac} from 'crypto'
import axios from 'axios'
import { OpenIdConnectAuthenticationClient } from '../src/authentication/open-id-connect-authentication-client';

const secret = 'abcdef';
const hash = createHmac('sha256', secret).update('hello world').digest('hex')


describe('Authentication', () => {
    it('Should get access token with client_credentials', async () => {
        const sut = new OpenIdConnectAuthenticationClient({
            grantType: `client_credentials`,
            clientId: 'myclient',
            clientSecret: 'fY66naxZ418Itc5p7XepAbipHBrYIFIF'
        })
        jest.spyOn(axios, 'post').mockResolvedValueOnce({ data: {access_token: hash}})
        const token = await sut.getToken()
        expect(token).toHaveProperty('access_token', hash)
    })


    it('Should get access token with password_credentials', async () => {
        const sut = new OpenIdConnectAuthenticationClient({
            grantType: `password`,
            clientId: 'myuser',
            clientSecret: 'fY66naxZ418Itc5p7XepAbipHBrYIFIF',
            username: 'myuser',
            password: '123456',
        })
        jest.spyOn(axios, 'post').mockResolvedValueOnce({ data: {access_token: hash}})
        const token = await sut.getToken()
        expect(token).toHaveProperty('access_token', hash)
    })
})
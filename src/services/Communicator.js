import Crypt from './Crypt.js';

import axios from 'axios'

class Communicator
{
    static URLS = {
        development: "http://localhost:8000",
        production: "https://password-share.com/api"
    };

    static BASE_URLS = {
        development: "http://localhost:8080/secrets/",
        production: "https://password-share.com/secrets/"
    }

    getUrl()
    {
        return Communicator.URLS[process.env.NODE_ENV];
    }

    getLink(id, password)
    {
        let base = Communicator.BASE_URLS[process.env.NODE_ENV];
        let eID = Crypt.encBase64(id);
        let ePassword = Crypt.encBase64(password);
        base += encodeURIComponent(eID) + "?p=" + encodeURIComponent(ePassword);
        return base;
    }

    async createLink(secret, fromEmail)
    {
        let randomPassword = Crypt.getRandomPassword();
        let encrypted = Crypt.encryptSecret(secret, randomPassword);
        let hash = Crypt.getSHA512(randomPassword);
        
        let body = {
            "from_mail": fromEmail,
            "hash": hash,
            "secret": encrypted,
            "valid_for": 30*24*60*60
        };
        
        let response = await axios.post(this.getUrl() + "/secrets", body);
        let id = response.data.id;
        let link = this.getLink(id, randomPassword);

        return link;
    }
}

export default new Communicator();
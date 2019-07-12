import * as crypto from 'crypto-js';

class Crypt
{
    getSHA512(s)
    {
        var b64 = crypto.SHA512(s);
        var eHex = b64.toString();
        return eHex;
    }

    getSHA256(s)
    {
        var b64 = crypto.SHA256(s);
        var out = b64.toString();
        return out;
    }

    encryptSecret(secret, pw)
    {
        var SHA256EncryptedPW = this.getSHA256(pw);

        var shareText = JSON.stringify(secret);

        var b64 = crypto.AES.encrypt(shareText, SHA256EncryptedPW);

        let hexString = b64.toString();
        return hexString;
    }

    decryptSecret(encryptedText, pw)
    {
        var SHA256EncryptedPW = this.getSHA256(pw);

        var decrypted = crypto.AES.decrypt(encryptedText, SHA256EncryptedPW);
        var plaintext = decrypted.toString(crypto.enc.Utf8);

        return plaintext;
    }

    getRandomPassword()
    {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!§$%&/()=?.;,-_*+~\'\\#:`´°^<>|';
        let max = 36;
        let min = 26;
        let length = Math.floor(Math.random() * (+max - +min) + +min);
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    encBase64(s)
    {
        var words = crypto.enc.Utf8.parse(s); // WordArray object
        var base64 = crypto.enc.Base64.stringify(words); // string: 'SGVsbG8gd29ybGQ='

        return base64;
    }

    decBase64(s)
    {
        var words = crypto.enc.Base64.parse(s);
        var textString = crypto.enc.Utf8.stringify(words);
        return textString;
    }
}

export default new Crypt();
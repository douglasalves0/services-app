import crypto from 'crypto-js';
import Base64 from 'crypto-js/enc-base64';
import { env } from '../config/env';

export class JWT{

    public static validate(token: string): boolean{

        let parts: string[] = token.split('.');
        if(parts.length != 3) return false;
        
        let header: string = parts[0];
        let body: string = parts[1];
        let signature: string = parts[2];

        let trueSignature: string = Base64.stringify(crypto.HmacSHA256(header+'.'+body, env.SECRETKEY));

        if(trueSignature != signature) return false;
        
        let headerObj: any;
        try{
            headerObj = JSON.parse(this.decodeBase64(header));
        }catch{
            return false;
        }

        let bodyObj: any;
        try{
            bodyObj = JSON.parse(this.decodeBase64(body));
        }catch{
            return false;
        }

        if(!bodyObj?.exp) return false;
        if(new Date() > new Date(bodyObj.exp)) return false;

        return true;

    }

    public static createToken(isAdmin: boolean): string{
        return "TODO";
    }

    private static encodeBase64(s: string): string{
        return Buffer.from(s).toString('base64');
    }
    private static decodeBase64(s: string): string{
        return Buffer.from(s, 'base64').toString('ascii');
    }

}
import jwt from "jsonwebtoken";
import config from "config";
import { privateDecrypt } from "crypto";

const privateKey = config.get<string>('privateKey')
const publicKey = config.get<string>('publicKey')

export function signJwt(object: Object, options?: jwt.SignOptions | undefined){

    return jwt.sign(object, {key:privateKey, passphrase:process.env.PRIVATE_KEY_PASSPHRASE || ''},{...(options && options), algorithm: 'RS256',})
}

export function verifyJwt(token: string) {
    try{
        const decoded = jwt.verify(token, publicKey)
        return {
            valid: true,
            expired: false,
            decoded,
        }
    }catch(e: any){
        return {
            valid: false,
            expired: e.message === 'jwt expired',
            decoded: null
        }
    }
}



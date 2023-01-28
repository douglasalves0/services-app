import e from 'dotenv';

e.config();

export let env: any = {
    SECRETKEY: process.env.SECRETKEY,
    APP_PORT: process.env.APP_PORT,
    TOKEN_EXPIRATION_TIME: process.env.TOKEN_EXPIRATION_TIME
};
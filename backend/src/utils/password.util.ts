import * as bcrypt from 'bcrypt';
import { createCipheriv, createDecipheriv } from 'crypto';

export const hashPassword = async (password: string, salt?: number) => {
    return await bcrypt.hash(
        password,
        salt ? salt : Number(process.env.HASH_SALT),
    );
};

export const matchPassword = async (
    password: string,
    supposedPassword: string,
) => {
    return await bcrypt.compare(password, supposedPassword);
};

export const encrypt = (val: string) => {    
    let cipher = createCipheriv(
        `${process.env.ALGORITHM}`,
        Buffer.from(`${process.env.ENC_KEY}`, "hex"),
        Buffer.from(`${process.env.IV}`, "hex")
    );
    let encrypted = cipher.update(val, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
};

export const decrypt = (encrypted: string) => {
    let decipher = createDecipheriv(
        `${process.env.ALGORITHM}`,
        Buffer.from(`${process.env.ENC_KEY}`, "hex"),
        Buffer.from(`${process.env.IV}`, "hex")
    );
    let decrypted = decipher.update(encrypted, 'base64', 'utf8');
    return decrypted + decipher.final('utf8');
};

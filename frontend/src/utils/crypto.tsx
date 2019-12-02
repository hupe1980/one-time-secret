import CryptoJS from 'crypto-js';

export function encrypt(secret: string, passphrase: string): string {
    const ciphertext = CryptoJS.AES.encrypt(secret, passphrase);
    return ciphertext.toString();
}

export function decrypt(ciphertext: string, passphrase: string): string {
    const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
    return bytes.toString(CryptoJS.enc.Utf8);
}
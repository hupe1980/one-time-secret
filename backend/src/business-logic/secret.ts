import * as uuid from 'uuid';
import * as CryptoJS from 'crypto-js';

import { SecretItem } from '../models/secret-item';
import { ShareSecretRequest } from '../request/share-secret-request';
import { SecretAccess } from '../data-layer/secret-access';

const secretAccess = new SecretAccess();

export function encrypt(secret: string, passphrase: string): string {
    const ciphertext = CryptoJS.AES.encrypt(secret, passphrase);
    return ciphertext.toString();
}

export function decrypt(ciphertext: string, passphrase: string): string {
    const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
    return bytes.toString(CryptoJS.enc.Utf8);
}

export const shareSecret = async (
    shareSecretRequest: ShareSecretRequest,
    userId: string,
): Promise<SecretItem> => {
    const secretId = uuid.v4();
    const { ciphertext, ttl } = shareSecretRequest;

    const creationTime = Math.floor(Date.now() / 1000);
    const expirationTime = creationTime + ttl * 60;
    const linkId = uuid.v4();

    return secretAccess.createSecret({
        secretId,
        ciphertext,
        creationTime,
        expirationTime,
        linkId,
        userId,
    });
};

export const getHistory = async (userId: string): Promise<SecretItem[]> => {
    return secretAccess.getAllSecets(userId);
};

export const getSecretMeta = async (
    secretId: string,
    userId: string,
): Promise<SecretItem> => {
    return secretAccess.getSecret(secretId, userId);
};

export const deleteSecret = async (
    secretId: string,
    userId: string,
): Promise<void> => {
    return secretAccess.deleteSecret(secretId, userId);
};

export const retrieveSecret = async (
    linkId: string,
    passphrase: string,
): Promise<string> => {
    const {
        secretId,
        userId,
        ciphertext,
    } = await secretAccess.getSecretByLinkId(linkId);

    const secret = decrypt(ciphertext, passphrase);

    await deleteSecret(secretId, userId);

    return secret;
};

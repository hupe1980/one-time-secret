export interface SecretItem {
    secretId: string;
    ciphertext: string;
    creationTime: number;
    expirationTime: number;
    linkId: string;
    userId: string;
}

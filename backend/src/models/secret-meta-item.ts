import { SecretItem } from './secret-item';

export interface SecretMetaItem extends SecretItem {
    secretId: string;
    ciphertext: string;
    linkId: string;
}

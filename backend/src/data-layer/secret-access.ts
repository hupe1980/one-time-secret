import { DocumentClient } from 'aws-sdk/clients/dynamodb';

import { SecretItem } from '../models/secret-item';

function createDynamoDBClient(): DocumentClient {
    if (process.env.IS_OFFLINE) {
        return new DocumentClient({
            region: 'localhost',
            endpoint: 'localstack:4569',
            sslEnabled: false,
            accessKeyId: 'accessKeyId',
            secretAccessKey: 'secretAccessKey',
        });
    }

    return new DocumentClient();
}

export class SecretAccess {
    public constructor(
        private readonly docClient: DocumentClient = createDynamoDBClient(),
        private readonly secretsTable = process.env.SECRETS_TABLE,
        private readonly linkIdIndex = process.env.LINK_ID_INDEX,
        private readonly userIdIndex = process.env.USER_ID_INDEX,
    ) {}

    public async getAllSecets(userId: string): Promise<SecretItem[]> {
        const result = await this.docClient
            .query({
                TableName: this.secretsTable,
                IndexName: this.userIdIndex,
                KeyConditionExpression: 'userId = :userId',
                ExpressionAttributeValues: {
                    ':userId': userId,
                },
            })
            .promise();

        const items = result.Items;
        return items as SecretItem[];
    }

    public async createSecret(secretItem: SecretItem): Promise<SecretItem> {
        await this.docClient
            .put({
                TableName: this.secretsTable,
                Item: secretItem,
            })
            .promise();

        return secretItem;
    }

    public async getSecret(
        secretId: string,
        userId: string,
    ): Promise<SecretItem> {
        const { Item: item } = await this.docClient
            .get({
                TableName: this.secretsTable,
                Key: {
                    secretId,
                    userId,
                },
            })
            .promise();

        return item as SecretItem;
    }

    public async deleteSecret(secretId: string, userId: string): Promise<void> {
        this.docClient
            .delete({
                TableName: this.secretsTable,
                Key: {
                    secretId,
                    userId,
                },
            })
            .promise();
    }

    public async getSecretByLinkId(linkId: string): Promise<SecretItem> {
        const result = await this.docClient
            .query({
                TableName: this.secretsTable,
                IndexName: this.linkIdIndex,
                KeyConditionExpression: 'linkId = :linkId',
                ExpressionAttributeValues: {
                    ':linkId': linkId,
                },
            })
            .promise();

        const item = result.Items[0];
        return item as SecretItem;
    }
}

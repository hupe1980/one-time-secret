import 'source-map-support/register';
import {
    APIGatewayProxyEvent,
    APIGatewayProxyHandler,
    APIGatewayProxyResult,
} from 'aws-lambda';
import * as middy from 'middy';
import { cors } from 'middy/middlewares';

import { ShareSecretRequest } from '../../request/share-secret-request';
import { shareSecret } from '../../business-logic/secret';
import { createLogger } from '../../utils/logger';
import { getUserId } from '../../utils/auth';

const logger = createLogger('shareSecretHandler', process.env.LOG_LEVEL);

const shareSecretHandler: APIGatewayProxyHandler = async (
    event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
    logger.debug('Share a secret', event);

    const newSecret: ShareSecretRequest = JSON.parse(event.body);

    const userId = getUserId(event);

    const newItem = await shareSecret(newSecret, userId);

    return {
        statusCode: 201,
        body: JSON.stringify({
            newItem,
        }),
    };
};

export const handler = middy(shareSecretHandler).use(
    cors({ credentials: true }),
);

import 'source-map-support/register';
import {
    APIGatewayProxyEvent,
    APIGatewayProxyHandler,
    APIGatewayProxyResult,
} from 'aws-lambda';
import * as middy from 'middy';
import { cors } from 'middy/middlewares';

import { deleteSecret } from '../../business-logic/secret';
import { createLogger } from '../../utils/logger';
import { getUserId } from '../../utils/auth';

const logger = createLogger('deleteSecretHandler', process.env.LOG_LEVEL);

const deleteSecretHandler: APIGatewayProxyHandler = async (
    event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
    logger.debug('Delete a secret', event);

    const { secretId } = event.pathParameters;

    const userId = getUserId(event);

    await deleteSecret(secretId, userId);

    return {
        statusCode: 204,
        body: '',
    };
};

export const handler = middy(deleteSecretHandler).use(
    cors({ credentials: true }),
);

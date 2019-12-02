import 'source-map-support/register';
import {
    APIGatewayProxyEvent,
    APIGatewayProxyHandler,
    APIGatewayProxyResult,
} from 'aws-lambda';
import * as middy from 'middy';
import { cors } from 'middy/middlewares';

import { getSecretMeta } from '../../business-logic/secret';
import { createLogger } from '../../utils/logger';
import { getUserId } from '../../utils/auth';

const logger = createLogger('getSecretMetaHandler', process.env.LOG_LEVEL);

const getSecretMetaHandler: APIGatewayProxyHandler = async (
    event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
    logger.debug('Get secret meta', event);

    const { secretId } = event.pathParameters;

    const userId = getUserId(event);

    const item = await getSecretMeta(secretId, userId);

    return {
        statusCode: 200,
        body: JSON.stringify({
            item,
        }),
    };
};

export const handler = middy(getSecretMetaHandler).use(
    cors({ credentials: true }),
);

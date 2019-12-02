import 'source-map-support/register';
import {
    APIGatewayProxyEvent,
    APIGatewayProxyHandler,
    APIGatewayProxyResult,
} from 'aws-lambda';
import * as middy from 'middy';
import { cors } from 'middy/middlewares';

import { RetrieveSecretRequest } from '../../request/retrieve-secret-request';
import { retrieveSecret } from '../../business-logic/secret';
import { createLogger } from '../../utils/logger';

const logger = createLogger('retrieveSecretHandler', process.env.LOG_LEVEL);

const retrieveSecretHandler: APIGatewayProxyHandler = async (
    event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
    logger.debug('Retrieve a secret', event);

    const { linkId } = event.pathParameters;

    const { passphrase }: RetrieveSecretRequest = JSON.parse(event.body);

    const secret = await retrieveSecret(linkId, passphrase);

    return {
        statusCode: 200,
        body: JSON.stringify({
            secret,
        }),
    };
};

export const handler = middy(retrieveSecretHandler).use(
    cors({ credentials: true }),
);

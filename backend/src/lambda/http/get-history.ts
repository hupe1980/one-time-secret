import 'source-map-support/register';
import {
    APIGatewayProxyEvent,
    APIGatewayProxyHandler,
    APIGatewayProxyResult,
} from 'aws-lambda';
import * as middy from 'middy';
import { cors } from 'middy/middlewares';

import { getHistory } from '../../business-logic/secret';
import { createLogger } from '../../utils/logger';
import { getUserId } from '../../utils/auth';

const logger = createLogger('getHistoryHandler', process.env.LOG_LEVEL);

const getHistoryHandler: APIGatewayProxyHandler = async (
    event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
    logger.debug('Get history', event);

    const userId = getUserId(event);

    const items = await getHistory(userId);

    return {
        statusCode: 200,
        body: JSON.stringify({
            items,
        }),
    };
};

export const handler = middy(getHistoryHandler).use(
    cors({ credentials: true }),
);

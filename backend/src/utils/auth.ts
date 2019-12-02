import { APIGatewayProxyEvent } from 'aws-lambda';

export const getUserId = (event: APIGatewayProxyEvent): string => {
    const IDP_REGEX = /.*\/.*,(.*)\/(.*):CognitoSignIn:(.*)/;

    const authProvider =
        event.requestContext.identity.cognitoAuthenticationProvider;

    const [, , , userId] = authProvider.match(IDP_REGEX);

    return userId;
};

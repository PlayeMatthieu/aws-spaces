import { DynamoDBClient, GetItemCommand, ScanCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export async function updateSpace(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {
    
    if(event.queryStringParameters && ('id' in event.queryStringParameters) && event.body) {

        const paredBody = JSON.parse(event.body);
        const spaceId = event.queryStringParameters['id'];
        const requestBodyKey = Object.keys(paredBody)[0];
        const requestBodyValue = event.body[requestBodyKey];

        const updateResult = await ddbClient.send(new UpdateItemCommand({
            TableName: process.env.TABLE_NAME,
            Key: {
                'id': {
                    S: spaceId
                }
            },
            UpdateExpression: 'set #newLocation = :newLocation',
            ExpressionAttributeValues: {
                ':newLocation': {
                    S: requestBodyValue
                }
            },
            ExpressionAttributeNames: {
                '#newLocation': requestBodyKey
            },
            ReturnValues: 'UPDATED_NEW'
        }))

        return {
            statusCode: 204,
            body: JSON.stringify(updateResult.Attributes)
        }
    }

    return {
        statusCode: 400,
        body: JSON.stringify('Invalid args')
    }

}
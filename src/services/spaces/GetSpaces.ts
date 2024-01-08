import { DynamoDBClient, GetItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export async function GetSpaces(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {
    
    
    if(event.queryStringParameters) {
        if('id' in event.queryStringParameters) {
            const spaceId = event.queryStringParameters['id'];
            const getItemReponse = await ddbClient.send(new GetItemCommand({
                TableName: process.env.TABLE_NAME,
                Key: {
                    'id': {
                        S: spaceId
                    }
                }
            }));
            if(getItemReponse.Item) {
                const unmarshalledItem = unmarshall(getItemReponse.Item);
                return  {
                    statusCode: 200,
                    body: JSON.stringify(unmarshalledItem)
                }
            } else {
                return {
                    statusCode: 404,
                    body: JSON.stringify('No item found with id: ' + spaceId)
                }
            }
        } else {
            return {
                statusCode: 400,
                body: JSON.stringify('Id required!')
            }
        }
    }
    
    
    
    
    
    const result = await ddbClient.send(new ScanCommand({
        TableName: process.env.TABLE_NAME
    }));


    const unmarshalledItem = result.Items?.map(item => unmarshall(item));
    console.log(result.Items);

    return {
        statusCode: 200,
        body: JSON.stringify(unmarshalledItem)
    }
}
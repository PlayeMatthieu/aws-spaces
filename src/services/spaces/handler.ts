import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { postSpaces } from "./PostSpaces";
import { GetSpaces } from "./GetSpaces";
import { updateSpace } from "./UpdateSpace";
import { deleteSpace } from "./DeleteSpace";
import { MissingFieldError } from "../shared/Validator";


const ddbClient = new DynamoDBClient({});

async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {

    let message: string;

    try {
        switch (event.httpMethod) {
            case 'GET':
                const getReponse = await GetSpaces(event, ddbClient);
                return getReponse;
            case 'POST':
                const postReponse = await postSpaces(event, ddbClient);
                return postReponse;
            case 'PUT':
                const putResponse = await updateSpace(event, ddbClient);
                return putResponse;
            case 'DELETE':
                const deleteResponse = await deleteSpace(event, ddbClient);
                return deleteResponse;
            default:
                break;
        }
    } catch (error) {
        console.error(error);
        if(error instanceof MissingFieldError) {
            return {
                statusCode: 400,
                body: JSON.stringify(error.message)
            }
        }
        return {
            statusCode: 500,
            body: JSON.stringify(error.message)
        }
    }



    const response: APIGatewayProxyResult = {
        statusCode: 200,
        body: JSON.stringify(message)
    }

    return response;
}

export { handler };
import { handler } from "../src/services/spaces/handler";

handler({
    httpMethod: 'GET',
    queryStringParameters: {
        id: 'c338bf08-0878-473b-adba-6d564bf624f3'
    },
    body: JSON.stringify({
        location: 'Londen Updated'
    })
} as any, {} as any);
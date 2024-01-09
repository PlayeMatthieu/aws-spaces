import { handler } from "../src/services/spaces/handler";

handler({
    httpMethod: 'POST',
    // queryStringParameters: {
    //     id: 'c338bf08-0878-473b-adba-6d564bf624f3'
    // },
    body: JSON.stringify({
        location: "Veurne2",
        name: "Tweede locatie"
    })
} as any, {} as any);
import { DynamoDBClient, UpdateItemCommand } from '@aws-sdk/client-dynamodb'

const client = new DynamoDBClient({})

export async function main(event: any) {
    let params = {
        TableName: process.env.TABLE_NAME,
        Key: {
            pk: { S: 'orderID' },
        },
        UpdateExpression: 'set IDvalue = if_not_exists(IDvalue, :increment) + :increment, metadata = :event',
        ExpressionAttributeValues: {
            ':increment': { N: '1' },
            ':event': { S: JSON.stringify(event) },
        },
    }
    try {
        const data = await client.send(new UpdateItemCommand(params))
    } catch (err) {
        console.log(err)
        return err
    }
    return {
        statusCode: 200,
        body: 'OK!',
    }
}

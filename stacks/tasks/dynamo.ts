import * as sst from '@serverless-stack/resources'
import * as sfn from 'aws-cdk-lib/aws-stepfunctions'
import * as dynamo from 'aws-cdk-lib/aws-dynamodb'
import * as tasks from 'aws-cdk-lib/aws-stepfunctions-tasks'

export function ShopStatus(stack: sst.Stack, table: dynamo.ITable): tasks.DynamoGetItem {
    return new tasks.DynamoGetItem(stack, 'Get Shop Status', {
        key: { messageId: tasks.DynamoAttributeValue.fromString('PK') },
        table: table,
        outputPath: '$.GetStore',
    })
}

export function IncrementOrderNumber(stack: sst.Stack, table: dynamo.ITable): tasks.DynamoUpdateItem {
    return new tasks.DynamoUpdateItem(stack, 'Generate Order Number', {
        key: {
            MessageId: tasks.DynamoAttributeValue.fromString('PK'),
        },
        table: table,
        expressionAttributeValues: {
            ':val': tasks.DynamoAttributeValue.numberFromString(sfn.JsonPath.stringAt('$.Item.TotalCount.N')),
            ':rand': tasks.DynamoAttributeValue.fromNumber(20),
        },
        updateExpression: 'set IDvalue = IDvalue + :val',
    })
}

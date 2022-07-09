import {
    StackContext,
    use,
    Api as ApiGateway,
} from "@serverless-stack/resources";
import * as sst from '@serverless-stack/resources'

import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamo from 'aws-cdk-lib/aws-dynamodb';
import * as sfn from 'aws-cdk-lib/aws-stepfunctions';
import * as tasks from 'aws-cdk-lib/aws-stepfunctions-tasks';

export function OrderFlow({ stack }: StackContext) {
    // Define each state
    const sWait = new sfn.Wait(stack, "Wait", {
        time: sfn.WaitTime.duration(cdk.Duration.seconds(300)),
    });
    const sHello = new tasks.LambdaInvoke(stack, "functions/lambda.main", {
        // https://docs.sst.dev/constructs/Function
        lambdaFunction: new sst.Function(stack, "function-hello", {
            handler: "functions/lambda.main",
        }),
    });
    const sGetItem = new tasks.DynamoGetItem(stack, 'GetItem', {
        key: { messageId: tasks.DynamoAttributeValue.fromString('PK') },
        table: dynamo.Table.fromTableName(stack, 'table', 'serverlesspresso-config'),
        outputPath: '$.GetStore',
    })
    const sFailed = new sfn.Fail(stack, "Failed");
    const sSuccess = new sfn.Succeed(stack, "Success");

    // Define state machine
    return new sfn.StateMachine(stack, "StateMachine", {
        definition: sWait
            .next(sGetItem)
            .next(
                new sfn.Choice(stack, "Is Shop Open?")
                    .when(sfn.Condition.booleanEquals("$.GetStore.Item.storeOpen", true), sSuccess)
                    .otherwise(sFailed)
            )
            .next(
                new sfn.Choice(stack, "Job Approved?")
                    .when(sfn.Condition.stringEquals("$.status", "Approved"), sSuccess)
                    .otherwise(sFailed)
            ),
    });
}

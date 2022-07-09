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

import { OrderBus } from "./event-bus";

export function OrderFlow({ stack }: StackContext) {
    const bus = use(OrderBus);

    // Define each state
    const sWait = new sfn.Wait(stack, "Wait", {
        time: sfn.WaitTime.duration(cdk.Duration.seconds(300)),
    });
    const sGetItem = new tasks.DynamoGetItem(stack, 'GetItem', {
        key: { messageId: tasks.DynamoAttributeValue.fromString('PK') },
        table: dynamo.Table.fromTableName(stack, 'table', 'serverlesspresso-config'),
        outputPath: '$.GetStore',
    })
    const sUpdateItem = new tasks.DynamoUpdateItem(stack, 'UpdateItem', {
        key: {
            MessageId: tasks.DynamoAttributeValue.fromString('message-007')
        },
        table: dynamo.Table.fromTableName(stack, 'counting-table', 'serverlesspresso-config'),
        expressionAttributeValues: {
            ':val': tasks.DynamoAttributeValue.numberFromString(sfn.JsonPath.stringAt('$.Item.TotalCount.N')),
            ':rand': tasks.DynamoAttributeValue.fromNumber(20),
        },
        updateExpression: 'set IDvalue = IDvalue + :val',
    });
    const sOrderWait = new tasks.EventBridgePutEvents(stack, 'Wait for Order', {
        entries: [{
            detail: sfn.TaskInput.fromObject({
                Message: 'Hello from Step Functions!',
            }),
            eventBus: bus.cdk.eventBus,
            detailType: 'MessageFromStepFunctions',
            source: 'step.functions',
        }],
        timeout: cdk.Duration.seconds(30),
    })
    const sFulfillmentWait = new tasks.EventBridgePutEvents(stack, 'Wait for Fulfillment', {
        entries: [{
            detail: sfn.TaskInput.fromObject({
                Message: 'Hello from Step Functions!',
            }),
            eventBus: bus.cdk.eventBus,
            detailType: 'MessageFromStepFunctions',
            source: 'step.functions',
        }],
        timeout: cdk.Duration.seconds(30),
    })
    const sFailed = new sfn.Fail(stack, "Failed");
    const sSuccess = new sfn.Succeed(stack, "Success");

    // Define state machine
    return new sfn.StateMachine(stack, "StateMachine", {
        definition: sWait
            .next(sGetItem)
            .next(
                new sfn.Choice(stack, "Is Shop Open?")
                    .when(
                        sfn.Condition.booleanEquals("$.GetStore.Item.storeOpen", true),
                        sOrderWait.addCatch(
                            sFailed, {
                            errors: ['States.Timeout'],
                            resultPath: "$.comment"
                        })
                    )
                    .otherwise(sFailed)
                    .afterwards()
            )
            .next(sUpdateItem)
            .next(sFulfillmentWait.addCatch(
                sFailed, {
                errors: ['States.Timeout'],
                resultPath: "$.comment"
            }))
            .next(sSuccess)
    });
}

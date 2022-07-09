import * as sst from '@serverless-stack/resources'
import * as cdk from 'aws-cdk-lib'
import * as sfn from 'aws-cdk-lib/aws-stepfunctions'
import * as tasks from 'aws-cdk-lib/aws-stepfunctions-tasks'
import * as events from 'aws-cdk-lib/aws-events'

export function WaitForOrder(stack: sst.Stack, bus: events.IEventBus): tasks.EventBridgePutEvents {
    return new tasks.EventBridgePutEvents(stack, 'Wait for Order', {
        entries: [
            {
                detail: sfn.TaskInput.fromObject({
                    Message: 'Hello from Step Functions!',
                }),
                eventBus: bus,
                detailType: 'MessageFromStepFunctions',
                source: 'step.functions',
            },
        ],
        timeout: cdk.Duration.seconds(30),
    })
}

export function WaitForFulfillment(stack: sst.Stack, bus: events.IEventBus): tasks.EventBridgePutEvents {
    return new tasks.EventBridgePutEvents(stack, 'Wait for Fulfillment', {
        entries: [
            {
                detail: sfn.TaskInput.fromObject({
                    Message: 'Hello from Step Functions!',
                }),
                eventBus: bus,
                detailType: 'MessageFromStepFunctions',
                source: 'step.functions',
            },
        ],
        timeout: cdk.Duration.seconds(30),
    })
}

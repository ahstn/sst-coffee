import { StackContext, use, Api as ApiGateway } from '@serverless-stack/resources'
import * as sst from '@serverless-stack/resources'

import * as cdk from 'aws-cdk-lib'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as dynamo from 'aws-cdk-lib/aws-dynamodb'
import * as sfn from 'aws-cdk-lib/aws-stepfunctions'
import * as tasks from 'aws-cdk-lib/aws-stepfunctions-tasks'

import { OrderBus } from './event-bus'
import { IncrementOrderNumber, ShopStatus } from './tasks/dynamo'
import { ConfigTable } from './dynamo/config-table'
import { CountingTable } from './dynamo/counting-table'
import { WaitForFulfillment, WaitForOrder } from './tasks/events'

export function OrderFlow({ stack }: StackContext) {
    const bus = use(OrderBus)
    const configDB = use(ConfigTable)
    const countDB = use(CountingTable)

    const sFailed = new sfn.Fail(stack, 'Failed')
    const sSuccess = new sfn.Succeed(stack, 'Success')

    return new sfn.StateMachine(stack, 'StateMachine', {
        definition: ShopStatus(stack, configDB.cdk.table)
            .next(
                new sfn.Choice(stack, 'Is Shop Open?')
                    .when(
                        sfn.Condition.booleanEquals('$.GetStore.Item.storeOpen', true),
                        WaitForOrder(stack, bus.cdk.eventBus).addCatch(sFailed, {
                            errors: ['States.Timeout'],
                            resultPath: '$.comment',
                        }),
                    )
                    .otherwise(sFailed)
                    .afterwards(),
            )
            .next(IncrementOrderNumber(stack, countDB.cdk.table))
            .next(
                WaitForFulfillment(stack, bus.cdk.eventBus).addCatch(sFailed, {
                    errors: ['States.Timeout'],
                    resultPath: '$.comment',
                }),
            )
            .next(sSuccess),
    })
}

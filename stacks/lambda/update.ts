import { StackContext, use, Function } from '@serverless-stack/resources'
import { CountingTable } from '../dynamo/counting-table'

export function WriteFunction({ stack }: StackContext) {
    const table = use(CountingTable)

    return new Function(stack, 'HandleOrder', {
        handler: 'functions/update.main',
        timeout: 10,
        environment: {
            TABLE_NAME: table.tableName,
        },
        permissions: [table],
    })
}

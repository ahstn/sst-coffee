import { StackContext, Table } from '@serverless-stack/resources'

export function CountingTable({ stack }: StackContext) {
    return new Table(stack, 'Counting', {
        fields: {
            pk: 'string',
            IDvalue: 'number',
            metadata: 'string',
        },
        primaryIndex: {
            partitionKey: 'pk',
        },
    })
}

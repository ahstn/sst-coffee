import { StackContext, Table } from '@serverless-stack/resources'

export function ConfigTable({ stack }: StackContext) {
    return new Table(stack, 'Config', {
        fields: {
            pk: 'string',
        },
        primaryIndex: {
            partitionKey: 'pk',
        },
    })
}

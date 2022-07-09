import { App } from '@serverless-stack/resources'

import { ConfigTable } from './dynamo/config-table'
import { CountingTable } from './dynamo/counting-table'
import { OrderBus } from './event-bus'
import { OrderFlow } from './step-function'

export default function main(app: App) {
    app.setDefaultFunctionProps({
        runtime: 'nodejs16.x',
        srcPath: 'services',
    })

    app.stack(ConfigTable).stack(CountingTable).stack(OrderBus).stack(OrderFlow)
}

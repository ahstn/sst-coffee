import { App } from "@serverless-stack/resources";

import { ConfigTable } from "./dynamo/config-table";
import { OrderBus } from "./event-bus";
import { OrderFlow } from "./step-function";

export default function main(app: App) {
    app.setDefaultFunctionProps({
        runtime: "nodejs16.x",
        srcPath: "services",
    });

    app
        .stack(ConfigTable)
        .stack(OrderBus)
        .stack(OrderFlow);
}

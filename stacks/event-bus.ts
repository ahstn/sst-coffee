import { EventBus, StackContext } from "@serverless-stack/resources";

// https://docs.sst.dev/constructs/EventBus
export function OrderBus({ stack }: StackContext) {
  return new EventBus(stack, "Ordered", {
    cdk: {
        eventBus: {
          eventBusName: "OrderBus",
        },
    },
    rules: {
        rule1: {
            pattern: { source: ["awsserverlessda.serverlesspresso"] },
            targets: { }
        },
    },
  });
}

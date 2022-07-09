import { EventBus, StackContext } from "@serverless-stack/resources";

// https://github.com/serverless-stack/sst/blob/master/examples/eventbus/stacks/MyStack.ts
export function OrderBus({ stack }: StackContext) {
  return new EventBus(stack, "Ordered", {
    rules: {
      rule1: {
        pattern: {
          source: ["myevent"],
          detailType: ["Order"],
        },
      },
    },
  });
}

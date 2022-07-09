import { StackContext, Table } from "@serverless-stack/resources";

export function ConfigTable({ stack }: StackContext) {
  const table = new Table(stack, "serverlesspresso-config", {
    fields: {
      pk: "string",
    },
    primaryIndex: {
      partitionKey: "pk",
    },
  });

  return table;
}

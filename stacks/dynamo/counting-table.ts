import { StackContext, Table } from "@serverless-stack/resources";

export function CountingTable({ stack }: StackContext) {
  const table = new Table(stack, "serverlesspresso-counting", {
    fields: {
      pk: "string",
    },
    primaryIndex: {
      partitionKey: "pk",
    },
  });

  return table;
}

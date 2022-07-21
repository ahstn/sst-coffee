# Serverless SST

## 👋 Introduction

This repository aims to provide a comparison of using TypeScript and Rust Lambdas, and Step Functions with [Serverless Stack (SST)][sst].

The example project for EventBridge and Step Functions is adapted from the [Serverlesspresso Workshop | AWS] and its repo can be found here: [Serverless Coffee Workshop | GitHub].

## 🚀 Features

-   Lambda functions using Typescript 4.6 & Rust 1.59.
-   [SST] and [CDK] for deploying and configuring infrastructure.

#### Resources

-   [SST Examples | GitHub] - Official SST example repo covering various examples.
-   [Serverless Patterns] - [Serverless Land] patterns repo with general serverless examples.
-   [aws-stepfunctions | CDK Docs]
-   [aws-dynamodb | CDK Docs]

[aws-stepfunctions | cdk docs]: https://docs.aws.amazon.com/cdk/api/v1/docs/aws-stepfunctions-readme.html
[aws-dynamodb | cdk docs]: https://docs.aws.amazon.com/cdk/api/v1/docs/aws-dynamodb-readme.html
[local testing of cdk-defined step functions state machine | medium]: https://jeromevdl.medium.com/local-testing-of-cdk-defined-step-functions-state-machine-20759ad3c2a6
[sst]: https://sst.dev/
[cdk]: https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html
[function | sst constructs]: https://docs.sst.dev/constructs/Function
[topic | sst constructs]: https://docs.sst.dev/constructs/Topic
[sst examples | github]: https://github.com/serverless-stack/sst/tree/master/examples
[serverless patterns | github]: https://github.com/aws-samples/serverless-patterns
[serverless land]: https://serverlessland.com/
[serverlesspresso workshop | aws]: https://workshop.serverlesscoffee.com/
[serverless coffee workshop | github]: https://github.com/aws-samples/serverless-coffee-workshop

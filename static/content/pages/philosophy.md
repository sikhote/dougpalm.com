# Philosophy

- [Alternate Ten Commandments](/static/pdf/Alternate-Ten-Commandments.pdf)

This post will explore a simple and focused alternative to [Serverless](https://serverless.com), Claudia.JS ([Website](https://claudiajs.com), [GitHub](https://github.com/claudiajs/claudia), [Example Projects](https://github.com/claudiajs/example-projects)). Claudia.JS does not call itself a framework, but rather "a deployment utility" to ease the use of using Amazon Web Services (AWS). The world of AWS practically requires a set of tools for uploading code, programming connections between API Gateways and Lambda functions, and configuring all services in a sane manner. Claudia.JS is a toolset that focusses on making AWS easy to follow for Node.js developers.

## Creating a Simple API
Let's jump into some Claudia.JS basics, to get a feel for how easy things really are. Assuming Node.js 4.3.2 is installed and an AWS account with proper IAM and Lambda access is available, here we go:

1. Create a new folder and initialize a package.json
  ```
  mkdir claudia-testing && cd claudia-testing
  npm init
  ```

2. Use NPM to install Claudia.js globally and save the API builder to package.json
  ```
  npm i -g claudia
  npm i -S claudia-api-builder
  ```

3. Create app.js with endpoint code
  ```
  var ApiBuilder = require('claudia-api-builder');
  var api = new ApiBuilder();

  module.exports = api;

  api.get('/hello/{firstName}', function(request) {
    var firstName = request.pathParams.firstName;
    var lastName = request.queryString.lastName;

    return 'Hello, ' + firstName + ' ' + lastName +  '!';
  });
  ```

4. Create profile by adding AWS credentials to the end of the `~/.aws/credentials` file
  ```
  [claudia]
  aws_access_key_id = *******************A
  aws_secret_access_key = ***************************************J
  ```

5. Deploy! That `api-module` option should match up to the `app.js` file name.
  ```
  claudia create --profile claudia --region us-west-2 --api-module app
  ```

Step 5 will take a while, so grab a sandwich or a cup of hot chocolate. Afterwards, you will be presented with a success message, including an endpoint:

```
saving configuration
{
  "lambda": {
    "role": "claudia-testing-executor",
    "name": "claudia-testing",
    "region": "us-west-2"
  },
  "api": {
    "id": "*********d",
    "module": "app",
    "url": "https://*********d.execute-api.us-west-2.amazonaws.com/latest"
  }
}
```

To test the API, specify the `hello` endpoint, provide a `name` path parameter, add in a query string, and fire off a curl command:

```
curl https://*********d.execute-api.us-west-2.amazonaws.com/latest/hello/Human?lastName=Being
"Hello, Human Being!"
```

## What Create Does
After the "create" command, Claudia.JS created a Lambda function, a new API Gateway, a new role, and all with the proper connections. Because Claudia.JS does not use CloudFormation, AWS cannot manage all of these resources at once, but within your project folder a `claudia.json` file was created. This JSON file allows Claudia.JS to go back and update or destroy the entire ecosystem it created. Verifying this in the AWS console reveals how much work Claudia.JS has completed automatically:

![AWS Console](/static/images/thoughts/aws-console.jpg)

The API responds with proper success and error codes, thanks to Claudia.JS. The API building tool within Claudia.JS should be very familiar to Node.js API development—the endpoint is defined and the function follows. This example can be expanded with the standards HTTP methods and CRUD interactions with DynamoDB.

Lastly, to update the API, run `claudia update`; use `claudia destroy` to remove all traces of the API. Destroying the API will remove the API Gateway, Lambda function, and associated role. As long as that `claudia.json` file is kept, things are easy to manage.

## The Downsides
Of course, not everything is perfect...Claudia.JS is great at being a simple tool for deploying Node.js code to the AWS ecosystem. With that simplicity, comes the lack of support for code besides JavaScript—this will be acceptable for most, as Node.js is a popular option. Another downside to Claudia.JS is the lack of utilizing CloudFormation. [CloudFormation](https://aws.amazon.com/cloudformation) is an AWS service that puts together the pieces of AWS resources in a standardized way. While not ultimately necessary, CloudFormation has its benefits:

- All AWS services utilized are created and connected through JSON/YAML template files
- A template can be brought up, taken down, reconfigured, and duplicated through the AWS CloudFormation console
- CloudFormation goes far beyond linking only API Gateways and Lambda functions

With Claudia.JS, there are no CloudFormation JSON files to connect Lambda functions with API Gateways. Claudia.JS does have the ability to create, update, and take down AWS services, but currently the focus is on API Gateways and Lambda functions.

## Comparing to the Serverless Framework
Serverless framework seems to be the leader in implementing an AWS ecosystem. Here are some considerations that differentiate Serverless from Claudia.JS:

- Utilizes CloudFormation for managing AWS services
- Allows languages beyond JavaScript
- More examples, such as a Single Page Application(SPA) template
- Stronger community with more contributors
- New way of creating API methods and linking functions

> For developers wanting a focused and powerful way to create APIs hosted by AWS, Claudia.JS is the simplest path

Overall, the differences result in a positive experience, worth granting Serverless a nod of approval. With that said, Claudia.JS has a lot of potential. Claudia.JS could possibly transition to using CloudFormation templates, gain a few more examples (their current collection is impressive), and gain more community involvement. For developers wanting a focused and powerful way to create APIs hosted by AWS, Claudia.JS is the simplest path. For a slightly higher learning curve, but features galore, it seems hard to go wrong with Serverless.

## The Others and Final Thoughts
Claudia.JS and Serverless are contending with a few others:

- [DEEP](https://github.com/MitocGroup/deep-framework)
- [Apex](https://github.com/apex/apex)
- [Gordon](https://github.com/jorgebastida/gordon)
- [Server Application Model (SAM)](https://github.com/awslabs/serverless-application-model)

Gordon integrates CloudFormation but development has slowed; Apex is all about Lambda functions; and SAM is just getting started. All of these solutions look to ease the use of AWS; it's hard to say where things will be in a year or two. Claudia.JS brings a welcome simplicity to the AWS world and I enjoyed reading the documents and wading through the examples. I suggest giving Claudia.JS a try—it is powerful, yet easy to get started.

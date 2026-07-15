const cdk = require('aws-cdk-lib');
const dynamodb = require('aws-cdk-lib/aws-dynamodb');
const lambda = require('aws-cdk-lib/aws-lambda');
const apigateway = require('aws-cdk-lib/aws-apigateway');
const path = require('path');

class InfrastructureTestStack extends cdk.Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    const guestListTable = new dynamodb.Table(this, 'GuestList', {
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING,
      },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    })

    const guestListFunction = new lambda.Function(this, 'GuestListFunction', {
      runtime: lambda.Runtime.NODEJS_24_X,
      handler: 'handler.main',
      code: lambda.Code.fromAsset(path.join(__dirname, '../lambda')),
      environment: {
        TABLE_NAME: guestListTable.tableName,
        FRONTEND_URL: process.env.FRONTEND_URL,
        ADMIN_USERNAME: process.env.ADMIN_USERNAME,
        ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
        ADMIN_JWT_SECRET: process.env.ADMIN_JWT_SECRET,
        PUSHER_APP_ID: process.env.PUSHER_APP_ID,
        PUSHER_KEY: process.env.PUSHER_KEY,
        PUSHER_SECRET: process.env.PUSHER_SECRET,
        PUSHER_CLUSTER: process.env.PUSHER_CLUSTER,
        SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
        SENDGRID_FROM_EMAIL: process.env.SENDGRID_FROM_EMAIL,
      }
    })

    guestListTable.grantReadWriteData(guestListFunction)

    const api = new apigateway.LambdaRestApi(this, 'GuestListApi', {
      handler: guestListFunction,
      proxy: true,
    })
  }
}

module.exports = { InfrastructureTestStack }

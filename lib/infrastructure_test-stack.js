const cdk = require('aws-cdk-lib');
const dynamodb = require('aws-cdk-lib/aws-dynamodb');
const lambda = require('aws-cdk-lib/aws-lambda')
const path = require('path')

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
        name: 'email',
        type: dynamodb.AttributeType.STRING,  
      },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    })

    const guestListFunction = new lambda.Function(this, 'GuestListFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'handler.main',
      code: lambda.Code.fromAsset(path.join(__dirname, '../lambda')),
    })
  }
}

module.exports = { InfrastructureTestStack }

const cdk = require('aws-cdk-lib');
const dynamodb = require('aws-cdk-lib/aws-dynamodb');

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
  }
}

module.exports = { InfrastructureTestStack }

import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { Stack, StackProps, Duration } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

export class MyWeatherAppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

const weatherTable = new dynamodb.Table(this, 'WeatherData', {
  partitionKey: { name: 'deviceId', type: dynamodb.AttributeType.STRING },
});

const weatherProcessor = new lambda.Function(this, 'WeatherProcessor', {
  runtime: lambda.Runtime.NODEJS_14_X,
  handler: 'lambda-handler.handler',
  code: lambda.Code.fromAsset('lambda'), // Directory containing my Lambda code
  timeout: Duration.seconds(30),
  environment: {
    DYNAMODB_TABLE_NAME: weatherTable.tableName,
  },
});

weatherTable.grantReadWriteData(weatherProcessor);
  }
}

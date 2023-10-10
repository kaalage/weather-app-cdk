import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { MyWeatherAppStack } from '../lib/my-weather-app-cdk-stack';

const app = new cdk.App();
new MyWeatherAppStack(app, 'MyWeatherAppStack', {
});
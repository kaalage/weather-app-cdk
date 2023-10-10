import { DynamoDB } from 'aws-sdk';

const dynamoDB = new DynamoDB();

export const handler = async (event: any) => {
  try {
    const payloadBuffer = Buffer.from(event.body, 'base64');
    const weatherData = JSON.parse(payloadBuffer.toString('utf-8'));

    const params = {
      TableName: process.env.DYNAMODB_TABLE_NAME || '',
      Item: {
        deviceId: { S: weatherData.deviceId }, 
        timestamp: { N: `${Date.now()}` }, 
        temperature: { N: `${weatherData.temperature}` },
        humidity: { N: `${weatherData.humidity}` },
      },
    };

    await dynamoDB.putItem(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Weather data stored successfully' }),
    };
  } catch (error) {
    console.error('Error processing MQTT message:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};

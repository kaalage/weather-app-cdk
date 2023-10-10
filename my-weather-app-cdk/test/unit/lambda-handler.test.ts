import { handler } from '../../lib/lambda-handler';

describe('Lambda Function', () => {
  it('should handle MQTT message and store data', async () => {
    jest.setTimeout(10000);
    const event = {
      body: Buffer.from(JSON.stringify({ deviceId: 'device1', temperature: 25, humidity: 50 })),
    };

    const response = await handler(event);

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual({ message: 'Weather data stored successfully' });
  });

  it('should handle invalid MQTT message', async () => {
    const event = {
      body: Buffer.from('InvalidPayload'),
    };

    const response = await handler(event);

    expect(response.statusCode).toBe(500);
    expect(JSON.parse(response.body)).toEqual({ error: 'Internal server error' });
  });
});

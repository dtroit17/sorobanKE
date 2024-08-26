// backend/tests/crowdfunding.test.js
const request = require('supertest');
const app = require('../app');

describe('Crowdfunding API', () => {
  it('should create a campaign', async () => {
    const response = await request(app)
      .post('/api/crowdfunding/create')
      .send({ creator: 'user123', goal: 1000 });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Campaign Created');
    expect(response.body.output).toBeDefined();
  });

  it('should contribute to a campaign', async () => {
    const response = await request(app)
      .post('/api/crowdfunding/contribute')
      .send({ campaignId: 'campaign123', contributor: 'user123', amount: 100 });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Contribution Received');
    expect(response.body.output).toBeDefined();
  });

  it('should withdraw funds', async () => {
    const response = await request(app)
      .post('/api/crowdfunding/withdraw')
      .send({ campaignId: 'campaign123', creator: 'user123' });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Funds Withdrawn');
    expect(response.body.output).toBeDefined();
  });
});

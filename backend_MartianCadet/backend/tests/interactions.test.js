
// backend/tests/interactions.test.js
const request = require('supertest');
const app = require('../app');

describe('Interactions API', () => {
  it('should record an interaction', async () => {
    const response = await request(app)
      .post('/api/interactions')
      .send({ user: 'user123', interactionType: 'blog' });

    expect(response.status).toBe(201);
    expect(response.body.interaction.user).toBe('user123');
    expect(response.body.interaction.interactionType).toBe('blog');
  });
});

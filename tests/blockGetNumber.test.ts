import request from 'supertest';
import app from '../src/app';

describe('GET /block/get/:blockNumber', () => {
  it('Must return transaction information for the specified block', async () => {
    const blockNumber = 18060403; //Replace with desired block number
    const response = await request(app).get(`/block/get/${blockNumber}`);
    expect(response.status).toBe(200); //Check if the response status is 200 (OK)
    expect(response.body).toHaveProperty('blockNumber');
  });

  it('Must deal with blocks that do not exist', async () => {
    const blockNumber = 99999; //Replace with a block number that does not exist
    const response = await request(app).get(`/block/get/${blockNumber}`);
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('Error');
  });
});

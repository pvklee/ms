const request = require('supertest');
const app = require('../app');

const mockVenue = {
  name: 'name',
  description: 'description',
  address: 'address',
  currentUser: {
    id: 'id',
    email: 'email',
  },
};
let mockVenueId;

describe('Create venue', () => {
  it('get all responds with empty array when no venues', async() => {
    const res = await request(app)
      .get('/')
      .expect(200);
    expect(res.body).toHaveLength(0);
  });

  it('fails to create venue without params', async() => {
    await request(app)
      .post('/create')
      .send({})
      .expect(400);
  });

  it('creates a venue with correct params', async() => {
    const res = await request(app)
      .post('/create')
      .send(mockVenue)
      .expect(200);
    mockVenueId = res.body._id;
  });

  it('get all responds with array of 1 after creating venue', async() => {
    const res = await request(app).get('/');
    expect(res.body).toHaveLength(1);
  });

  it('get detail responds with 400 when provided non-existing id', async() => {
    await request(app)
      .get('/0')
      .expect(400);
  });

  it('get detail responds with details when provided existing id', async() => {
    const res = await request(app)
      .get(`/${mockVenueId}`)
      .expect(200);
    res.body = (({name, description, address, owner: {id, email}}) => ({
      name,
      description,
      address,
      currentUser: {id, email},
    }))(res.body);
    expect(res.body).toEqual(mockVenue);
  });
});

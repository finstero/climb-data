let app = require('../server.js');
let testServer = require('supertest');

describe('Test ROOT path', () => {

    it('should return 200 for /api/user/logout', async () => {
        // make a request!
        // telling testServer to start app, then make post request to this route
        const response = await testServer(app).post('/api/user/logout');
        // analyze response!
        expect(response.statusCode).toBe(200);
    })
})
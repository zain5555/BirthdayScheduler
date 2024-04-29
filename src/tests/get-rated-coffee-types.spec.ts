import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
// import { ratingDto } from './fixtures';

describe('GET /ratings/coffee-types', () => {
  let app: INestApplication;

  beforeEach(async () => {

    global.TextEncoder = require('util').TextEncoder;
    global.TextDecoder = require('util').TextDecoder;

    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  function makeHttpRequest() {
    return request(app.getHttpServer());
  }

  it('there are rated coffee types taken from ratings given before', async () => {
    // await makeHttpRequest()
    //   .post('/users')
    //   .send(ratingDto({ coffeeType: 'espresso' }));
    // await makeHttpRequest()
    //   .post('/ratings')
    //   .send(ratingDto({ coffeeType: 'Kenyan, drip' }));

    await makeHttpRequest()
      .get('/users')
      .expect(200)
      .expect((res) => {
        expect(res.body).toContain('Kenyan, drip');
        expect(res.body).toContain('espresso');
      })
      .end(function(err, res) {
        if (err) return done(err);
        console.log("rrrrrrrrr", res.body)
        return done();
      });
  });
});
function done(err?: any): void {
  throw new Error('Function not implemented.');
}


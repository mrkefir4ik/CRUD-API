import { server } from '../server';
import chai, { should } from 'chai';
import chaiHttp from 'chai-http';
process.env.NODE_ENV = 'test';

const HTTP_STATUS_CODES = {
    OK: 200,
    CREATE: 201,
    INTERNAL_SERVER_ERROR: 500,
    NOT_VALID: 400,
    NOT_FOUND: 404,
    DELETE: 204,
};

const DEFAULT_HEADERS = { 'Content-Type': 'application/json' };

const expectedResponse = [];


chai.use(chaiHttp);
// //Наш основной блок
// describe('Books', () => {
//     beforeEach((done) => { //Перед каждым тестом чистим базу
//         user.remove({}, (err) => {
//             done();
//         });
//     });
//     /*
//       * Тест для /GET
//       */
//     describe('/GET book', () => {
//         it('it should GET all the books', (done) => {
//             chai.request(server)
//                 .get('/book')
//                 .end((err, res) => {
//                     res.should.have.status(200);
//                     res.body.should.be.a('array');
//                     res.body.length.should.be.eql(0);
//                     done();
//                 });
//         });
//     });

// });
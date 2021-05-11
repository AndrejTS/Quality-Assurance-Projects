const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {

  test("Solve a puzzle with valid puzzle string: POST request to /api/solve", function (done) {
    chai
      .request(server)
      .post("/api/solve")
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(res.body.solution, '135762984946381257728459613694517832812936745357824196473298561581673429269145378');
        done();
      });
  });

  test("Solve a puzzle with missing puzzle string: POST request to /api/solve", function (done) {
    chai
      .request(server)
      .post("/api/solve")
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        puzzle: ''
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(res.body.error, 'Required field missing');
        done();
      });
  });

  test("Solve a puzzle with invalid characters: POST request to /api/solve", function (done) {
    chai
      .request(server)
      .post("/api/solve")
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        puzzle: '5..91372.3.a.8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2....a..4..8916..85.A2..A3'
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(res.body.error, 'Invalid characters in puzzle');
        done();
      });
  });

  test("Solve a puzzle with incorrect length: POST request to /api/solve", function (done) {
    chai
      .request(server)
      .post("/api/solve")
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        puzzle: '5494498'
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');
        done();
      });
  });

  test("Solve a puzzle that cannot be solved: POST request to /api/solve", function (done) {
    chai
      .request(server)
      .post("/api/solve")
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        puzzle: '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28251'
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(res.body.error, 'Puzzle cannot be solved');
        done();
      });
  });

  test("Check a puzzle placement with all fields: POST request to /api/check", function (done) {
    chai
      .request(server)
      .post("/api/check")
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        puzzle: '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51',
        coordinate: 'G7',
        value: '3'
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(res.body.valid, true);
        done();
      });
  });

  test("Check a puzzle placement with single placement conflict: POST request to /api/check", function (done) {
    chai
      .request(server)
      .post("/api/check")
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        puzzle: '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51',
        coordinate: 'G7',
        value: '4'
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(res.body.valid, false);
        assert.equal(res.body.conflict.length, 1);
        assert.equal(res.body.conflict[0], 'row');
        done();
      });
  });


  test("Check a puzzle placement with multiple placement conflicts: POST request to /api/check", function (done) {
    chai
      .request(server)
      .post("/api/check")
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        puzzle: '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51',
        coordinate: 'F4',
        value: '1'
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(res.body.valid, false);
        assert.equal(res.body.conflict.length, 2);
        assert.include(res.body.conflict, "column");
        assert.include(res.body.conflict, "region");
        done();
      });
  });

  test("Check a puzzle placement with all placement conflicts: POST request to /api/check", function (done) {
    chai
      .request(server)
      .post("/api/check")
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        puzzle: '..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1',
        coordinate: 'D5',
        value: '2'
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(res.body.valid, false);
        assert.equal(res.body.conflict.length, 3);
        assert.include(res.body.conflict, "column");
        assert.include(res.body.conflict, "region");
        assert.include(res.body.conflict, "row");
        done();
      });
  });

  test("Check a puzzle placement with missing required fields: POST request to /api/check", function (done) {
    chai
      .request(server)
      .post("/api/check")
      .set('content-type', 'application/x-www-form-urlencoded')
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(res.body.error, 'Required field(s) missing');
        done();
      });
  });

  test("Check a puzzle placement with invalid characters: POST request to /api/check", function (done) {
    chai
      .request(server)
      .post("/api/check")
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        puzzle: '82..4..6AA.16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51',
        coordinate: 'G7',
        value: '3'
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(res.body.error, 'Invalid characters in puzzle');
        done();
      });
  });

  test("Check a puzzle placement with incorrect length: POST request to /api/check", function (done) {
    chai
      .request(server)
      .post("/api/check")
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        puzzle: '82..4.',
        coordinate: 'G7',
        value: '3'
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');
        done();
      });
  });

  test("Check a puzzle placement with invalid placement coordinate: POST request to /api/check", function (done) {
    chai
      .request(server)
      .post("/api/check")
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        puzzle: '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51',
        coordinate: '5X',
        value: '3'
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(res.body.error, 'Invalid coordinate');
        done();
      });
  });

  test("Check a puzzle placement with invalid placement value: POST request to /api/check", function (done) {
    chai
      .request(server)
      .post("/api/check")
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        puzzle: '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51',
        coordinate: 'A3',
        value: 'fdsfsd'
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(res.body.error, 'Invalid value');
        done();
      });
  });

});


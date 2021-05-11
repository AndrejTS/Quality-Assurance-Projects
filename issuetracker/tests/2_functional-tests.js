const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  test("Create an issue with every field: POST request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .post("/api/issues/apitesting")
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        issue_title: 'problem', 
        issue_text: 'test text', 
        created_by: 'John', 
        assigned_to: 'Bob', 
        status_text: 'test status text'
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(res.body.issue_title, 'problem');
        assert.equal(res.body.issue_text, 'test text');
        // assert.equal(res.body.created_on, new Date().toISOString());
        // assert.equal(res.body.updated_on, new Date().toISOString());
        assert.equal(res.body.created_by, 'John');
        assert.equal(res.body.assigned_to, 'Bob');
        assert.equal(res.body.open, true);
        assert.equal(res.body.status_text, 'test status text');
        done();
      });
  });

  test("Create an issue with only required fields: POST request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .post("/api/issues/apitesting")
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        issue_title: 'problem222', 
        issue_text: 'test text text', 
        created_by: 'Alice'
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(res.body.issue_title, 'problem222');
        assert.equal(res.body.issue_text, 'test text text');
        // assert.equal(res.body.created_on, new Date().toISOString());
        // assert.equal(res.body.updated_on, new Date().toISOString());
        assert.equal(res.body.created_by, 'Alice');
        assert.equal(res.body.assigned_to, '');
        assert.equal(res.body.open, true);
        assert.equal(res.body.status_text, '');
        done();
      });
  });

  test("Create an issue with missing required fields: POST request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .post("/api/issues/apitesting")
      .set('content-type', 'application/x-www-form-urlencoded')
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(res.text, JSON.stringify({error: 'required field(s) missing'}));
        done();
      });
  });

  test("View issues on a project: GET request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .get("/api/issues/apitesting")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        done();
      });
  });

  test("View issues on a project with one filter: GET request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .get("/api/issues/apitesting")
      .query({ created_by: 'John' })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        done();
      });
  });

  test("View issues on a project with multiple filters: GET request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .get("/api/issues/apitesting")
      .query({ created_by: 'John', issue_title: 'problem' })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        done();
      });
  });

  test("Update one field on an issue: PUT request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .put("/api/issues/apitesting")
      .send()
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        done();
      });
  });

  test("Update multiple fields on an issue: PUT request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .put("/api/issues/apitesting")
      .send()
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        done();
      });
  });

  test("Update an issue with missing _id: PUT request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .put("/api/issues/apitesting")
      .send()
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        done();
      });
  });

  test("Update an issue with no fields to update: PUT request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .put("/api/issues/apitesting")
      .send()
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        done();
      });
  });

  test("Update an issue with an invalid _id: PUT request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .put("/api/issues/apitesting")
      .send()
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        done();
      });
  });

  test("Delete an issue: DELETE request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .delete("/api/issues/apitesting")
      .send()
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        done();
      });
  });

  test("Delete an issue with an invalid _id: DELETE request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .delete("/api/issues/apitesting")
      .send()
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        done();
      });
  });

  test("Delete an issue with missing _id: DELETE request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .delete("/api/issues/apitesting")
      .send()
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        done();
      });
  });

});

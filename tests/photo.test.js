const chai = require("chai");
const chaiHttp = require("chai-http");
const { base } = require("../models/photo.model");
const expect = chai.expect;
const baseURL = "localhost:3000"
// import fs from 'fs';

chai.use(chaiHttp);

describe("First Test", function(){
    it('check that server is live', function(done){
        chai.request(baseURL)
        .get('/')
        .end(function (err, res){
            expect(res).to.have.status(200);
            expect(res.body.message).to.equal("Welcome to the photo API")
            done();
        })
    })
    it('check favorite functionality',  function(done){
        chai.request(baseURL)
        .patch('/photo/60bdb35402c7b97f3d831b60/favorite')
        .send({"favorite":true})
        .end(function (err, res){
            expect(res).to.have.status(200);
            expect(res.body.favorite).to.equal(true);
            done();
        })
    })
    it('check unfavorite functionality',  function(done){
        chai.request(baseURL)
        .patch('/photo/60bdb35402c7b97f3d831b60/favorite')
        .send({"favorite":false})
        .end(function (err, res){
            expect(res).to.have.status(200);
            expect(res.body.favorite).to.equal(false);
            done();
        })
    })
})
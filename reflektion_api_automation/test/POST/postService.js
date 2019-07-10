/**
 *@author Nishant Gohel <nis.ghl@gmail.com>
 */


const chai = require('chai');
const expect = chai.expect;
const should = chai.should();

const request = require("../../utils/httpServer");
const config = require("../../config");
const header = require('../../utils/header');
const fs = require('fs')
const path = require('path')

/* to log the info, require below modules */
var log4js = require("log4js");
var log = require("../../utils/logger")
log4js.configure(log.logging());
var logger = log4js.getLogger();

describe("POST Service API ", () => {

    let baseUrl = config.baseUrl;
    let url;
    let headers = header.plainHeader();
    let data = JSON.parse(fs.readFileSync(path.join(__dirname, './payload.json')))

    
    it("verify the status code is 201 and should able to create record ", (done) => {
        logger.info("POST Service API TEST Starts")
        let uri = "/posts";
        url = baseUrl + uri;
        
        request
            .requestPromiseQuery(url, 'POST', headers ,data)
            .then((response) => {
                logger.info("url in post service is", url)
                logger.info("response in post service is", JSON.stringify(response.body))
                expect(response.statusCode).to.equal(201);
                expect(response.body).to.be.an.instanceof(Object)
                response.body.should.have.keys('id', 'title', 'body' , 'userId')
                logger.info("POST Service API TEST ENDS")
                logger.info("********************************************************************")
            })
            .then(() => done(), done)
            .catch((error) => {
                done(error);
            });
    })

})

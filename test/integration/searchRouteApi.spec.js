const chai = require("chai");
const chaiHttp = require("chai-http");
const { app } = require("../../dist/app");
const { initializeRepo } = require("../../dist/repos");

chai.use(chaiHttp);
chai.should();

describe("Search Route API", () => {
    beforeEach(() => {
        return initializeRepo();
    });

    describe("GET /search-route", () => {
        it("Invalid origin request should return appropriate 400", (done) => {
            chai.request(app)
                .get("/search-route?origin=XXX&destination=YYZ")
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.deep.equal({
                        message: "Invalid Origin"
                    });
                    done();
                });
        });

        it("Invalid destination request should return appropriate 400", (done) => {
            chai.request(app)
                .get("/search-route?origin=YYZ&&destination=XXX")
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.deep.equal({
                        message: "Invalid Destination"
                    });
                    done();
                });
        });

        it("Basic search return expected value", (done) => {
            chai.request(app)
                .get("/search-route?origin=YYZ&&destination=JFK")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.deep.equal({
                        found: true,
                        route: [{
                            "airlineDigitCode2": "AC",
                            "destination": "JFK",
                            "origin": "YYZ"
                        }]
                    });
                    done();
                });
        });

        it("Basic search return expected value", (done) => {
            chai.request(app)
                .get("/search-route?origin=YYZ&&destination=YVR")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.deep.equal({
                        found: true,
                        route: [
                        {
                            "airlineDigitCode2": "AC",
                            "destination": "JFK",
                            "origin": "YYZ",
                        },
                        {
                            "airlineDigitCode2": "UA",
                            "destination": "LAX",
                            "origin": "JFK",
                        },
                        {
                            "airlineDigitCode2": "AC",
                            "destination": "YVR",
                            "origin": "LAX",
                        }]
                    });
                    done();
                });
        });
    });
});

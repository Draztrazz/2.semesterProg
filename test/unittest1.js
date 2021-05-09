const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');

chai.use(chaiHttp);

describe('Login user function', () => {
    it('Should create a JWT as a string', (done) => { //tester for om hvad vi forventer ved et succesfuldt login forsøg
        let username = 'Niels2960';
        let password = 'pass4356789';
        chai.request('http://localhost:7071/api')

        .get(`/login?username=${username}&password=${password}`)

        .end((err, res) => {
            res.body = JSON.parse(res.text)
            console.log(res.body)
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('string');
            done();
        })
    })
    it('Should return an error message', (done) => { //tester for den forventede fejl-besked ved et forkert password input
        let username = 'Niels2960';
        let password = 'Wrongpassword25';
        chai.request('http://localhost:7071/api')

        .get(`/login?username=${username}&password=${password}`)

        .end((err, res) => {
            res.body = JSON.parse(res.text)
            console.log(res.body)
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('message', 'User does not exist.');
            done();
        })
    })
    it('Should return an error message', (done) => { //tester for den forventede fejl-besked ved et forkert brugernavn input
        let username = 'WrongNiels';
        let password = 'pass4356789';
        chai.request('http://localhost:7071/api')

        .get(`/login?username=${username}&password=${password}`)

        .end((err, res) => {
            res.body = JSON.parse(res.text)
            console.log(res.body)
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('message', 'User does not exist.');
            done();
        })
    })
    it('Should return an error', (done) => { //tester for den forventede fejl-besked ved et tomt brugernavn og password input
        let username = '';
        let password = '';
        chai.request('http://localhost:7071/api')

        .get(`/login?username=${username}&password=${password}`)

        .end((err, res) => {
            res.body = JSON.parse(res.text)
            console.log(res.body)
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('message', 'User does not exist.');
            done();
        })
    })
})
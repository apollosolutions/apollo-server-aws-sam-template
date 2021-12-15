'use strict';

const { readFileSync } = require('fs');
const { resolve } = require('path');
const app = require('../../graphql/app');
const chai = require('../../graphql/node_modules/chai');
const expect = chai.expect;
var context;

const event = readFileSync(resolve('events', 'hello_world_event.json'), {
  encoding: 'utf-8',
});
const jsonEvent = JSON.parse(event);

describe('Tests index', function () {
  it('verifies successful response', async () => {
    const result = await app.graphqlHandler(jsonEvent, context);

    expect(result).to.be.an('object');
    expect(result.statusCode).to.equal(200);
    expect(result.body).to.be.an('string');

    let response = JSON.parse(result.body);

    expect(response).to.be.an('object');
    expect(response.message).to.be.equal('hello world');
    // expect(response.location).to.be.an("string");
  });
});

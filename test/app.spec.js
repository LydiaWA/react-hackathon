/* global define, it, describe, beforeEach, document */
const express = require('express');
const path = require('path');
const Nightmare = require('nightmare');
const expect = require('chai').expect;
const axios = require('axios');
const nightmareTimeout = 16500;

let nightmare;

const app = express();
app.use(express.static(path.join(__dirname, '/../public')));
app.use(express.static(path.join(__dirname, '/../dist')));

app.listen(8888);

const url = 'http://localhost:8888';

describe('hackathon', function () {
  this.timeout(nightmareTimeout);

  beforeEach(() => {
    nightmare = new Nightmare();
  });

  it('should load successfully', () => axios.get(url).then(r => expect(r.status === 200)));
});

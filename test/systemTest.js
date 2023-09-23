const chai = require('chai');
const expect = chai.expect;

describe('My Test Suite', () => {
  it('should return true when 1 + 1 equals 2', () => {
    const result = 1 + 1;
    expect(result).to.equal(2);
  });
});
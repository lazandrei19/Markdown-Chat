var assert = require("assert"); // node.js core module

describe('Array', function(){
  describe('#indexOf()', function(){
    it('should return -1 when the value is not present', function(){
      assert.equal(-1, [1,2,3].indexOf(4)); // 4 is not present in this array so indexOf returns -1
    });
    it('should return index when the value is present', function(){
      assert.equal(1, [1,2,3].indexOf(2)); // 2 is present in this array so indexOf returns 1
    });
  });
});
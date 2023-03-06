const a = require('../charCount');
const b = require("../charCountOfFile")

describe('Number character in a string', () => {
  test('Number character in a string:"Monday"', async () => {
    expect(await a("Monday")).toBe(6);
  });
})


describe('Number character in a file', () => {
    test('Number character in a file:"a.txt"', async () => {
      expect(await b()).toBe(7);
    });
  })
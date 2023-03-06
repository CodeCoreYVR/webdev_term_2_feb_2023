const firsth1Text = require('../firsth1Text');

describe('First h1 text of url', () => {
  test('https://en.wikipedia.org/wiki/HTML', async () => {
    expect(await firsth1Text('https://en.wikipedia.org/wiki/HTML')).toBe("HTML");
  });
})


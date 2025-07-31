const assert = require('assert');
const { processAuthorData } = require('../lib/author-utils');

const obj = { name: 'John Doe', slug: 'john-doe' };
const res1 = processAuthorData(obj);
assert.strictEqual(res1.name, 'John Doe');
assert.strictEqual(res1.slug, 'john-doe');
assert.strictEqual(res1.link, '/authors/john-doe');
assert.ok(res1.isValid);

const str = 'Jane Doe';
const res2 = processAuthorData(str);
assert.strictEqual(res2.name, 'Jane Doe');
assert.strictEqual(res2.slug, 'jane-doe');
assert.strictEqual(res2.link, '/authors/jane-doe');
assert.ok(res2.isValid);

console.log('processAuthorData tests passed');

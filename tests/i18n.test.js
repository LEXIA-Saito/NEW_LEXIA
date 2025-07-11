const assert = require('assert');
const ja = require('../locales/ja.json');
const en = require('../locales/en.json');

assert.strictEqual(ja['hero.viewWork'], '制作実績を見る');
assert.strictEqual(ja['hero.connectLinkedIn'], 'LinkedInでつながる');
assert.strictEqual(en['hero.viewWork'], 'View Work');
assert.strictEqual(en['hero.connectLinkedIn'], 'Connect on LinkedIn');

console.log('i18n JSON tests passed');

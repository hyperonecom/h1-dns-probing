/* eslint-disable comma-spacing */
'use strict';
const ava = require('ava');

const records = require('../../lib/records');

ava('unique prefix of records', async t => {
    for (const prefix of Object.values(records)) {
        t.true(new Set(prefix).size === prefix.length);
    }
});

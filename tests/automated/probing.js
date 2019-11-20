/* eslint-disable comma-spacing */
'use strict';
const ava = require('ava');

const { dnsProbing } = require('../../index');
const tests = [
    ['google.com'],
    ['amazon.com'],
];

ava('unique names & types only', async t => {
    for (const [zone] of tests) {
        const records = await dnsProbing(zone);
        const names = records.map(x => `${x.name}-${x.type}`);
        t.true(new Set(names).size === names.length);
    }
});

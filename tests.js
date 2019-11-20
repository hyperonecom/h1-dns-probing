/* eslint-disable comma-spacing */
'use strict';

const dns = require('./lib/dns');

// Before using the following examples, verify current answers using "dig".
const tests = [
    [ '_xmpp-server._tcp.gmail.com.' , 'SRV'   , ['8.8.8.8'] ],
    [ 'pop.siecobywatelska.pl'       , 'A'     , ['8.8.8.8'] ],
    [ 'pop.siecobywatelska.pl.'      , 'A'     , ['8.8.8.8'] ],
    [ 'pop.siecobywatelska.pl.'      , 'CNAME' , ['8.8.8.8'] ],
    [ 'pop.siecobywatelska.pl'       , 'CNAME' , ['8.8.8.8'] ],
    [ 'google.com'                   , 'A'     , ['8.8.8.8'] ],
];

const main = async () => {
    for (const test of tests) {
        const socket = dns();
        console.log(await socket.query(...test));
        await socket.destroy();
    }
};

main().catch(err => {
    console.error(err);
    console.error(err.stack);
    process.exit(1);
});

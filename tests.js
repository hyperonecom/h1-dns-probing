'use strict';

const dns = require('./dns')();

const main = async () => {
    // Before using the following examples, verify current answers using "dig".
    console.log(await dns.query('_xmpp-server._tcp.gmail.com.', 'SRV', ['8.8.8.8']));
    console.log(await dns.query('pop.siecobywatelska.pl', 'A', ['8.8.8.8']));
    console.log(await dns.query('pop.siecobywatelska.pl.', 'A', ['8.8.8.8']));
    console.log(await dns.query('pop.siecobywatelska.pl.', 'CNAME', ['8.8.8.8']));
    console.log(await dns.query('pop.siecobywatelska.pl', 'CNAME', ['8.8.8.8']));
    console.log(await dns.query('google.com', '8.8.8.8'));
};

main().then(console.log).catch(err => {
    console.log(err);
    console.log(err.stack);
    process.exit(1);
});

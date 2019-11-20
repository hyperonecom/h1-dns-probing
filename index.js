'use strict';

const records = require('./lib/records');
const dns = require('./lib/dns');

const dnsProbing = async (zone) => {
    const socket = dns();
    const rrset = [];
    const q = [];
    for (const [rrtype, prefixes] of Object.entries(records)) {
        prefixes.map(async prefix => {
            const name = `${prefix}${zone}`;
            try {
                const response = await socket.query(name, rrtype);
                if (response.record.length > 0) {
                    rrset.push(response);
                }
            } catch (err) {
                console.log({ err, name, rrtype });
            }
        }).map(x => q.push(x));
    }
    await Promise.all(q);
    await socket.destroy();
    return rrset;
};

module.exports = {
    dnsProbing,
};

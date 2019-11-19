
const dns = require('./dns')();

const dnsProbing = () => {
    const rrset = [];
    for (const [rrtype, prefixes] of Object.entries(records)) {
        prefixes.map(async prefix => {
            const name = `${prefix}${ctx.params.zone}`;
            try {
                const response = await dns.query(name, rrtype);
                if (response.record.length > 0) {
                    rrset.push(response);
                }
            } catch (err) {
                console.log({ err, name, rrtype });
            }
        }).map(x => q.push(x));
    }
    await Promise.all(q);
    return rrset;
};

module.exports = {
    dnsProbing,
}
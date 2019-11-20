'use strict';

const dnsSocket = require('dns-socket');

module.exports = (options = {}) => {
    const socket = dnsSocket();
    options.ns = options.ns || ['8.8.8.8', '1.1.1.1'];

    const queryNameserver = (name, rrtype, nss) => new Promise(async (resolve, reject) => {
        const ns = nss || options.ns;
        socket.query({
            questions: [{
                type: rrtype,
                name,
            }],
        }, 53, ns, (err, res) => {
            if (err) return reject(err);
            return resolve(res);
        });
    });

    const directAnswers = (res) => res.answers
        .filter(answer =>
            answer.name === res.questions[0].name &&
            answer.type === res.questions[0].type
        );

    const query = async (name, rrtype, nss) => {
        const type = rrtype.toUpperCase();
        const response = await queryNameserver(name, rrtype, nss);
        let record = [];

        if (['A', 'AAAA'].includes(type)) {
            record = directAnswers(response)
                .map(x => x.data)
                .map(content => ({ content }));
        } else if (type === 'CAA') {
            record = directAnswers(response)
                .map(x => x.data)
                .map(x => `${x.flags} ${x.tag} "${x.value}"`)
                .map(content => ({ content }));
        } else if (['CNAME', 'NS'].includes(type)) {
            record = directAnswers(response)
                .map(x => x.data)
                .map(x => `${x}.`)
                .map(content => ({ content }));
        } else if (type === 'MX') {
            record = directAnswers(response)
                .map(x => x.data)
                .map(x => `${x.preference} ${x.exchange}.`)
                .map(content => ({ content }));
        } else if (type === 'TXT') {
            record = directAnswers(response)
                .map(x => x.data)
                .flat(2)
                .map(x => x.toString('utf-8'))
                .map(content => ({ content }));
        } else if (type === 'SRV') {
            record = directAnswers(response)
                .map(x => x.data)
                .map(x => `${x.priority} ${x.weight} ${x.port} ${x.target}.`)
                .map(content => ({ content }));
        } else {
            throw new Error(`Unsupported rrtype: ${type}`);
        }

        return {
            name,
            type,
            ttl: 300,
            record,
        };
    };

    return {
        query,
        destroy: () => new Promise(resolve => socket.destroy(resolve)),
    };
};

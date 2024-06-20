import axios from 'axios';
import fs from 'fs';


import config from '../config.js'
 async function genEmail() {
    const email = await axios.get(config.tmail_url+'/api/email/ufufefe/'+config.tmail_apikey);
    return email.data;
}

async function fetchEmail(email) {
    try {
    const fetch = await axios.get(`${config.tmail_url}/api/messages/${email}/${config.tmail_apikey}`);
    const verificationCode = fetch.data[0].subject.match(/\d+/)[0];
    if (verificationCode === undefined) {
        return undefined;
    }
    return verificationCode;
}
catch (e) {
    return undefined;
}
}
function generateName() {
    return new Promise((resolve, reject) => {
        fs.readFile('username.txt', 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                const lines = data.split('\n').map(line => line.trim()).filter(line => line !== '');
                if (lines.length < 2) {
                    reject(new Error('Not enough lines in the file to generate a name.'));
                } else {
                    const randomLine = lines[Math.floor(Math.random() * lines.length)];
                  //  const randomLine2 = lines[Math.floor(Math.random() * lines.length)];
                    resolve(`${randomLine}`);
                }
            }
        });
    });
}
export { genEmail, fetchEmail, generateName };

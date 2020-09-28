const https = require('https')

let url = process.env.LOCAL_AQI_URL;

exports.handler = async function(event) {
    const promise = new Promise(function(resolve, reject) {
        https.get(url, (res) => {
              let rawData = '';
              res.on('data', (chunk) => { rawData += chunk; });
              res.on('end', () => {
                try {
                  const parsedData = JSON.parse(rawData);
                  console.log(parsedData);
                  resolve(parsedData);
                } catch (e) {
                  console.error(e.message);
                }
              });
            res.on('error', (e) => {
                reject(Error(e));
            });
        });
    });
    return promise;
};
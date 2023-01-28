const server = require('http').createServer();

const delay = time => new Promise(res => setTimeout(res, time));

const random = (min, max) => Math.floor(Math.random() * max) + min;

const summaries = ["Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"];

server.on('request', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200, {
        'Content-Type': 'application/json',
        'Transfer-Encoding': 'chunked'
    });

    res.write('[\n');

    for (let i = 0; i < 10; i++) {
        await delay(1000);

        var date = new Date();
        date.setDate(date.getDate() + i);

        res.write(JSON.stringify({
            id: i,
            date,
            temperatureC: random(-20, 55),
            summary: summaries[random(0, summaries.length)]
        }));

        res.write(',\n');
    }

    res.end(']');
});

server.listen(5105);
var redis = require("redis");
const redisClient = require("./redisClient");
//var client = redis.createClient();

async function createRedisClient () {
    const client = createClient();

    //read and write
    client.set("my_key", "Hey, hello World!");
    client.get("my_key", function(err, reply) {
        console.log(reply);
    });

    //multi- read and write
    client.mSet('header', 0, 'left', 0, 'article', 0, 'right',0,'footer',0);
    client.mGet(['header','left','article','right','footer'],
        function(err, value) {
            console.log(value);
    });

    //client.quit();

    // client.on('connect', () => console.log('Connected to REDIS!'));
    // client.on('error', (err) => console.log('Error connecting to REDIS: ', err));

    await client.connect();

    redisClient.then((client) => { 
    // do something with the client
    client.set("Hello", "Await World");
    // this also works, if we don't want to use await
    client.set("Hello", "Real World").then(()=> { 
        // can do something here 
    });

    client.quit();
});

    return client;
}

export default createRedisClient();





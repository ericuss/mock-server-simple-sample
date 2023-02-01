var mockServerClient = require('mockserver-client').mockServerClient;
const { setTimeout } = require('timers/promises');

var iso_server_host = 'localhost';
var iso_server_port = 1080;


var sampleEndpoint = () => {
    var path = '/api/sample';
    var content = { name: "User001" };

    var expectationBuilder = {
        "httpRequest": {
            "method": "GET",
            "path": `${path}`
        },
        "httpResponse": {
            "body": content
        }
    };


    mockServerClient(iso_server_host, iso_server_port)
        .mockAnyResponse(expectationBuilder)
        .then(
            () => {
                console.log("requested endpoint");
            },
            (error) => console.log(error)
    );
}

var sampleEndpoint2 = () => {
mockServerClient("localhost", 1080)
  .mockAnyResponse({
    "httpRequest": {
      "method": "GET",
      "path": "/view/cart",
    },
    "httpResponse": {
      "body": "some_response_body"
    }
  })
  .then(
    function () {
      console.log("expectation created");
    },
    function (error) {
      console.log(error);
    }
  );
}


var main = () => {
    console.log("seeding endpoints")
    sampleEndpoint();
    sampleEndpoint2();
    setTimeout(() => console.log("bye"), 5000);
}

var bootstrapper = () => {
    mockServerClient(iso_server_host, iso_server_port).reset().then(
        () => main(),
        () => setTimeout(bootstrapper, 10000)
    )
}

bootstrapper();

async function sleep(t) {
    await new Promise(resolve => setTimeout(resolve, t));
}

sleep(10000);
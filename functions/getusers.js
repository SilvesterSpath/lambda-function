exports.handler = function (event, context, callback) {
  console.log('event', event);

  if (event.httpMethod === 'POST') {
    try {
      const parsedBody = JSON.parse(event.body);
      const { name } = parsedBody;
      callback(null, {
        statusCode: 200,
        body: 'Hello ' + name,
      });
    } catch (error) {
      // Handle parsing errors (e.g., invalid JSON)
      console.error('Error parsing JSON:', error);
      callback(error);
    }
  } else {
    // Handle GET requests differently (e.g., send a different response)
    callback(null, {
      statusCode: 200,
      body: 'Try it in postman',
    });
  }
};

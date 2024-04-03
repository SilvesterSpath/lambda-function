exports.handler = function (event, context, callback) {
  console.log('event', event);

  const { name } = JSON.parse(event.body);
  console.log('parsed ', name);

  /*   callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  }); */

  callback(null, {
    statusCode: 200,
    body: 'Hello ' + name,
  });
};

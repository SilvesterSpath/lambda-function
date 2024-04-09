const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

exports.handler = function (event, context, callback) {
  const API_URL = 'https://api.github.com/users';
  const API_ID = process.env.GITHUB_CLIENT_ID;
  const API_SECRET = process.env.GITHUB_CLIENT_SECRET;

  const URL = `${API_URL}?client_id=${API_ID}&client_secret=${API_SECRET}`;

  // Send user response
  const send = (body) => {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(body),
    });
  };

  // Perform API call
  const getUsers = async () => {
    try {
      const response = await axios.get(URL);
      console.log('response', response.data);
      send(response.data);
    } catch (error) {
      console.error(error);
      send(error);
    }
  };

  // Make sure the method is GET
  if (event.httpMethod === 'GET') {
    getUsers();
  } else {
    send({ error: 'Method not allowed' });
  }
};

/* exports.handler = function (event, context, callback) {
  console.log('event', event);

  if (event.httpMethod === 'POST') {
    console.log(process.env.GITHUB_CLIENT_ID);
    try {
      const parsedBody = JSON.parse(event.body);
      const { name } = parsedBody;
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({ msg: 'Hello' + name }),
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
}; */

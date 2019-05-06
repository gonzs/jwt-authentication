export const getUsersService = request => {
  const GET_USERS_API_ENDPOINT = 'http://localhost:5000/api/v1/users';

  const parameters = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: request.payload,
    },
  };

  return fetch(GET_USERS_API_ENDPOINT, parameters)
    .then(response => {
      return response.json();
    })
    .then(json => {
      return json;
    });
};

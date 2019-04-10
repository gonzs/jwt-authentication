export const dashboardService = request => {
  const DASHBOARD_API_ENDPOINT = 'http://localhost:3000/api/v1/dashboard';

  const parameters = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: request.payload,
    },
  };

  return fetch(DASHBOARD_API_ENDPOINT, parameters)
    .then(response => {
      return response.json();
    })
    .then(json => {
      return json;
    });
};

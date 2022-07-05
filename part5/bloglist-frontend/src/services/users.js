import axios from 'axios';
const baseUrl = '/api/users';

const getUsername = async credentials => {
  const response = await axios.get(baseUrl, credentials);
  return response.data;
};

export default { getUsername };
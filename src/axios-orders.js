import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-builder-86ac9-default-rtdb.firebaseio.com/',
});

export default instance;

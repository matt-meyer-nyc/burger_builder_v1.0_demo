import axios from 'axios';

const instance = axios.create({

  baseURL: 'https://react-burger-builder-a485f.firebaseio.com/'

});

export default instance;

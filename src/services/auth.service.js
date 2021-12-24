// Authentication Service

import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

class AuthService {
  login(cpf, password) {
    return axios
      .post(API_URL + "signin", { cpf, password })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(cpf, username, designation, email, password) {
    return axios.post(API_URL + 'signup',  {
      cpf,
      username,
      designation,
      email,
      password
    });
  }
}

export default new AuthService();
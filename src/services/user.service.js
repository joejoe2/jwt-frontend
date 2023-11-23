import api from './api';
import authHeader from './auth-header';

class UserService {
  getProfile() {
    return api.get('/api/user/profile', { headers: authHeader() })
      .then(response => {
        return response.data;
      });
  }
}

export default new UserService();
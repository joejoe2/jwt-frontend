import api from './api';
import authHeader from './auth-header';

class AdminService {
    getUserList(page, size) {
        return api.get('/api/admin/getUserList', { headers: authHeader(), params: { page: page, size: size } })
            .then(response => {
                return response.data;
            });
    }

    changeRoleOf(userId, role) {
        return api.post('/api/admin/changeRoleOf', { id: userId, role: role }, { headers: authHeader() })
            .then(response => {
                return response;
            });
    }

    activateUser(userId) {
        return api.post('/api/admin/activateUser', { id: userId }, { headers: authHeader() })
            .then(response => {
                return response;
            });
    }

    deactivateUser(userId) {
        return api.post('/api/admin/deactivateUser', { id: userId }, { headers: authHeader() })
            .then(response => {
                return response;
            });
    }
}

export default new AdminService();
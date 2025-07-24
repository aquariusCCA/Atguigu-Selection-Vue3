import request from '@/utils/request'

enum API {
    GETUSERS = '/users/1',
}

export const getUsers = () => {
    return request.post(API.GETUSERS);
};

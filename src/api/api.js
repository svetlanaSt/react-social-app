import * as axios from 'axios';

const axiosInstanse = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "4a8dd4f5-7770-4997-bc6a-37b7bd18c1cc"
    }
});

export const getUsers = (currentPage, pageSize) => {
    return axiosInstanse.get(`users/?page=${currentPage}&count=${pageSize}`)
        .then(response => response.data)
};

export const unFollowUser = (id) => {
    return axiosInstanse.delete(`/follow/${id}`)
        .then(response => response.data)
};

export const followUser = (id) => {
    return axiosInstanse.post(`follow/${id}`)
        .then(response => response.data)
};

export const authMe = () => {
    return axiosInstanse.get(`auth/me`)
        .then(response => response.data)
};

export const getProfile = (userId) => {
    return axiosInstanse.get(`profile/${userId}`)
        .then(response => response.data)
};

export const getStatus = (userId) => {
    return axiosInstanse.get(`profile/status/${userId}`)
        .then(response => response.data)
};

export const updateStatus = (status) => {
    return axiosInstanse.put(`profile/status/`, { status })
        .then(response => response.data)
};

export const login = (email, password, rememberMe) => {
    return axiosInstanse.post(`auth/login`, { email, password, rememberMe })
        .then(response => response.data)
};

export const logout = () => {
    return axiosInstanse.delete(`auth/login`)
        .then(response => response.data)
};
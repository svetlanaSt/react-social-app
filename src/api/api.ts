import { ResultCodeEnum, UserType } from '../types';
import axios, { AxiosResponse } from 'axios';
import { ProfileType } from '../types';

const axiosInstanse = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "4a8dd4f5-7770-4997-bc6a-37b7bd18c1cc"
    }
});

export type ResponseType<D = {}>= {
    data: D,
    messages: Array<string>,
    resultCode: ResultCodeEnum
};

type GetItemsUsersType = {
    items: Array<UserType>,
    totalCount: number,
    error: string | null
};

export const getUsers = (currentPage: number, pageSize: number, term: string = '') => {
    return axiosInstanse.get<GetItemsUsersType>(`users/?page=${currentPage}&count=${pageSize}&term=${term}`)
        .then((response: AxiosResponse<any>) => response.data.items)
};

export const unFollowUser = (id: number) => {
    return axiosInstanse.delete<ResponseType>(`/follow/${id}`)
        .then((response: AxiosResponse<any>)=> response.data)
};

export const followUser = (id: number) => {
    return axiosInstanse.post<ResponseType>(`follow/${id}`)
        .then((response: AxiosResponse<any>) => response.data)
};

export type MeResponseDataType = {
    id: number,
    email: string, 
    assword: string, 
    login: string
};

export const authMe = () => {
    return axiosInstanse.get<ResponseType<MeResponseDataType>>(`auth/me`)
        .then((response: AxiosResponse<any>) => response.data)
};

export const getProfile = (userId: number) => {
    return axiosInstanse.get<ProfileType>(`profile/${userId}`)
        .then((response: AxiosResponse<any>) => response.data)
};

export const getStatus = (userId: number) => {
    return axiosInstanse.get<string>(`profile/status/${userId}`)
        .then((response: AxiosResponse<any>) => response.data)
};


export const updateStatus = (status: string) => {
    return axiosInstanse.put<ResponseType>(`profile/status/`, { status })
        .then((response: AxiosResponse<any>) => response.data)
};

export const login = (email: string, password: string, rememberMe: boolean) => {
    return axiosInstanse.post<ResponseType<{userId: number}>>(`auth/login`, { email, password, rememberMe })
        .then((response: AxiosResponse<any>) => response.data)
};

export const logout = () => {
    return axiosInstanse.delete<ResponseType>(`auth/login`)
        .then((response: AxiosResponse<any>) => response.data)
};
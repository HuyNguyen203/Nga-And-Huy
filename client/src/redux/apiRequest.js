import axios from 'axios';
import axiosInstance from './axiosInstance';
import { loginFailure, loginStart, loginSuccess } from './authSlice';
import config from '~/config';
import { getUsersStart, getUsersSuccess, getUsersFailure } from './userSlice';

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axiosInstance.post('/auth/login', user);
        dispatch(loginSuccess(res.data));
        console.log(res.data);
        if (res.data.admin) {
            navigate(config.routes.users);
        } else {
            navigate(config.routes.roles);
        }
    } catch (err) {
        dispatch(loginFailure());
    }
};

export const getAllUsers = async (accessToken, dispatch) => {
    dispatch(getUsersStart());
    try {
        const res = await axiosInstance.get('/user', {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(getUsersSuccess(res.data));
    } catch (err) {
        dispatch(getUsersFailure());
    }
};

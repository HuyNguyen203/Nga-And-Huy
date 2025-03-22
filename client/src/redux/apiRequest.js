import axiosInstance from './axiosInstance';
import {
    loginFailed,
    loginStart,
    loginSuccess,
    logoutStart,
    logoutSuccess,
    registerFailed,
    registerStart,
    registerSuccess,
    chooseRoleStart,
    chooseRoleSuccess,
    chooseRoleFail,
} from './authSlice';
import config from '~/config';
import {
    getUsersStart,
    getUsersSuccess,
    getUsersFailed,
    deleteUsersStart,
    deleteUsersSuccess,
    deleteUsersFaile,
} from './userSlice';

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axiosInstance.post('/auth/login', user);
        dispatch(loginSuccess(res.data));

        if (res.data.admin) {
            navigate(config.routes.users);
        } else {
            navigate(config.routes.roles);
        }
    } catch (err) {
        dispatch(loginFailed());
    }
};

export const registerUser = async (user, dispatch) => {
    dispatch(registerStart());
    try {
        await axiosInstance.post('/auth/register', user);
        dispatch(registerSuccess());
    } catch (error) {
        dispatch(registerFailed());
    }
};

export const getAllUsers = async (accessToken, dispatch, axiosJWT) => {
    dispatch(getUsersStart());
    try {
        const res = await axiosJWT.get('/user/', {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(getUsersSuccess(res.data));
    } catch (err) {
        dispatch(getUsersFailed());
    }
};

export const deleteUser = async (accessToken, dispatch, id, axiosJWT) => {
    dispatch(deleteUsersStart());
    try {
        const res = await axiosJWT.delete('user/' + id, {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(deleteUsersSuccess(res.data));
    } catch (error) {
        dispatch(deleteUsersFaile(error.response.data));
    }
};

export const updateUserRole = async (accessToken, dispatch, id, navigate, newRole) => {
    dispatch(chooseRoleStart());
    try {
        const res = await axiosInstance.put(
            `/user/${id}/role`,
            { roleName: newRole },
            {
                headers: {
                    token: `Bearer ${accessToken}`,
                },
            },
        );
        dispatch(chooseRoleSuccess(res.data));
        navigate(config.routes.lophocphan);
    } catch (err) {
        dispatch(chooseRoleFail());
    }
};

export const logOut = async (dispatch, id, navigate, accessToken, axiosJWT) => {
    dispatch(logoutStart());
    try {
        await axiosJWT.post('/auth/logout', id, {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(logoutSuccess());
        navigate('/');
    } catch (error) {
        dispatch(loginFailed());
    }
};

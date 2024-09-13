import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: {
            allUsers: null,
            isFetching: false,
            error: false,
        },
        msg: '',
    },
    reducers: {
        getUsersStart: (state) => {
            state.users.isFetching = true;
        },
        getUsersSuccess: (state, action) => {
            state.users.isFetching = false;
            state.users.allUsers = action.payload;
        },
        getUsersFailed: (state) => {
            state.users.isFetching = false;
            state.users.error = true;
        },
        deleteUsersStart: (state) => {
            state.users.isFetching = true;
        },
        deleteUsersSuccess: (state, action) => {
            state.users.isFetching = false;
            state.msg = action.payload;
        },
        deleteUsersFaile: (state, action) => {
            state.users.isFetching = false;
            state.users.error = true;
            state.msg = action.payload;
        },
        // chooseRoleStart: (state) => {
        // state.users.isFetching = true;
        // },
        // chooseRoleSuccess: (state) => {
        // state.users.isFetching = false;
        // state.msg = action.payload;
        // },
        // chooseRoleDelete: (state) => {
        // state.users.isFetching = false;
        // state.users.error = true;
        // },
    },
});

export const {
    getUsersStart,
    getUsersSuccess,
    getUsersFailed,
    deleteUsersStart,
    deleteUsersSuccess,
    deleteUsersFaile,
    chooseRoleStart,
    chooseRoleSuccess,
    chooseRoleDelete,
} = userSlice.actions;
export default userSlice.reducer;

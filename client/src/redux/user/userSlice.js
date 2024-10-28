import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: null,
    error: null,
    loading: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        startUpdateUser: (state) => {
            state.loading = false;
        },
        updateUserSucc: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
        },
        updateUserError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        deleteUserStart: (state) => {
            state.loading = true;
        },
        deleteUserSuccessFull: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
        },
        deleteuserFailed: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
        },
        signOutUserStart: (state) => {
            state.loading = true;
        },
        signOutUserSuccessFull: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
        },
        signOutUserFailed: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const { signInStart, signInSuccess, signInFailure, startUpdateUser, updateUserSucc, updateUserError, deleteUserStart, deleteUserSuccessFull, deleteuserFailed, signOutUserStart, signOutUserSuccessFull, signOutUserFailed } = userSlice.actions

export default userSlice.reducer
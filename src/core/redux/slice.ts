import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SliceState {
    // Global State
    loading?: boolean;
}

const initialState: SliceState = {
    loading: true,
    // Global State
};

const appSlice = createSlice({
    name: 'appSlice',
    initialState,
    reducers: {
        // Global Actions
    },
});

export const { reducer, actions } = appSlice;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddressModel, UserModel } from 'model';
import { TicketSelectModel } from '../model/event-detail/ticketSelect';

interface SliceState {
    // Global State
    ticket?: TicketSelectModel[];
    ticketSelected?: TicketSelectModel[];
    loading?: boolean;
    isOnline?: boolean;
    userInfo?: UserModel;
    address?: AddressModel[];
    selectedAddess?: AddressModel;
}

const initialState: SliceState = {
    ticket: [],
    loading: true,
    ticketSelected: [],
    isOnline: true,
    userInfo: null,
    address: [],
    selectedAddess: null,
    // Global State
};

const appSlice = createSlice({
    name: 'appSlice',
    initialState,
    reducers: {
        getTickets: (state, action: PayloadAction<TicketSelectModel[]>) => {
            state.ticket = action.payload;
            state.loading = false;
        },
        changeTicket: (state, action: PayloadAction<TicketSelectModel>) => {
            const checkItem = state.ticket.length > 0 && state.ticket.findIndex(i => i.id === action.payload.id);
            if (typeof checkItem === 'boolean' || checkItem < 0) {
                const ticketNew = [...state.ticket, action.payload];
                state.ticket = ticketNew;
            } else {
                const ticketNew = [...state.ticket];
                ticketNew[checkItem] = action.payload;
                state.ticket = ticketNew;
            }
        },
        removeTicket: (state, action) => {
            const checkItem = state.ticket.length > 0 && state.ticket.findIndex(i => i.id === action.payload);
            state.ticket[checkItem].amount_selected = Number(0);
        },
        removeAllTicket: (state, action) => {
            state.ticket = action.payload;
        },
        onChangeTicketSelected: (state, action: PayloadAction<TicketSelectModel[]>) => {
            state.ticketSelected = action.payload;
        },
        onHandleNetworkChange: (state, action: PayloadAction<boolean>) => {
            state.isOnline = action.payload;
        },
        getUserInfo: (state, action: PayloadAction<UserModel>) => {
            state.userInfo = action.payload;
        },
        getAddess: (state, action: PayloadAction<AddressModel[]>) => {
            state.address = action.payload;
            state.selectedAddess = action.payload?.find(address => address?.is_default);
        },
        handleSelectedAddess: (state, action: PayloadAction<AddressModel>) => {
            state.selectedAddess = action.payload;
        },
        // Global Actions
    },
});

export const { reducer, actions } = appSlice;

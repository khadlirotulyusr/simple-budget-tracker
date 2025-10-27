// Action Types
export const ADDTRANSACTION = 'ADDTRANSACTION';
export const EDITTRANSACTION = 'EDITTRANSACTION';
export const DELETETRANSACTION = 'DELETETRANSACTION';

// Action Creators
export const addTransaction = (payload) => ({
    type: ADDTRANSACTION,
    payload
});

export const editTransaction = (payload) => ({
    type: EDITTRANSACTION,
    payload
});

export const deleteTransaction = (id) => ({
    type: DELETETRANSACTION,
    payload: id,
});

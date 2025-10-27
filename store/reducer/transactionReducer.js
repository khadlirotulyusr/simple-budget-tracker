import { ADDTRANSACTION, EDITTRANSACTION, DELETETRANSACTION } from "../action/transactionAction";
const initialState = {
    datasTrx: []
};

export default function transactionReducer(state = initialState, action) {
    switch (action.type) {
        case ADDTRANSACTION:
            return { ...state, datasTrx: [...state.datasTrx, action.payload] };
        case EDITTRANSACTION:
            const trxId = action.payload.trxId;
            const updatedTrx = action.payload;
            console.log('payoad edit:', action.payload);
            return {
                ...state, datasTrx: state.datasTrx.map((el) =>
                    el.trxId === trxId ? { ...el, ...updatedTrx } : el
                )
            };
        case DELETETRANSACTION:
            console.log('payload delete:', action.payload);
            return { ...state, datasTrx: state.datasTrx.filter((el) => el.trxId !== action.payload) };
        default:
            return state;
    }
}

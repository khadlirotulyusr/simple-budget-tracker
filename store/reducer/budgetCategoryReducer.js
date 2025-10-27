import { ADDCATEGORY, EDITCATEGORY, DELETECATEGORY } from '../action/budgetCategoryAction';
const initialState = {
    datas: []
};

export default function budgetCategoryReducer(state = initialState, action) {
    switch (action.type) {
        case ADDCATEGORY:
            return { ...state, datas: [...state.datas, action.payload] };
        case EDITCATEGORY:
            const categoryId = action.payload.categoryId;
            const updatedCategory = action.payload;
            console.log('payoad edit:', action.payload);
            return {
                ...state, datas: state.datas.map((el) =>
                    el.categoryId === categoryId ? { ...el, ...updatedCategory } : el
                )
            };
        case DELETECATEGORY:
            console.log('payload delete:', action.payload);
            return { ...state, datas: state.datas.filter((el) => el.categoryId !== action.payload) };
        default:
            return state;
    }
}

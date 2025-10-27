import { combineReducers } from "redux";
import budgetCategoryReducer from "./budgetCategoryReducer";
import transactionReducer from "./transactionReducer";
export default combineReducers({
    budgetCategoryReducer,
    transactionReducer,
});

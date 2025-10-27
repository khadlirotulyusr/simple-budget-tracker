// Action Types
export const ADDCATEGORY = 'ADDCATEGORY';
export const EDITCATEGORY = 'EDITCATEGORY';
export const DELETECATEGORY = 'DELETECATEGORY';

// Action Creators
export const addCategory = (payload) => ({
    type: ADDCATEGORY,
    payload
});

export const editCategory = (payload) => ({
    type: EDITCATEGORY,
    payload
});

export const deleteCategory = (id) => ({
    type: DELETECATEGORY,
    payload: id,
});

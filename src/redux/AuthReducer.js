import { authActionType } from "./AuthAction";
const authState = [];

const authReducer = (state = authState, action) => {
    switch (action.type) {
        case authActionType.ADD:
            state.push(action.payload);
            return [...state];
        case authActionType.DELETE:
            state.splice(action.payload, 1);
            return [...state];
        default:
            return state;
    }
};

export default authReducer;
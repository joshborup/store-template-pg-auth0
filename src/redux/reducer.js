const initialState = {
	user: null
};

export const SET_USER = "SET_USER";

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { ...state, user: action.payload };
		default:
			return state;
	}
}

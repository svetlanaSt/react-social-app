import { authThunkCreator } from "./auth-reducer";

const SET_INITIALASED = 'SET_INITIALASED';

let initialState = {
  initialised: false
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INITIALASED:
      return {
        ...state,
        initialised: true
      };
    default:
      return state;
  }
};

export const initialasedSucces = () => ({
  type: SET_INITIALASED
});


export const initialiseApp = () => {
  return (dispatch) => {
    let promise = dispatch(authThunkCreator());
    promise.then(() => {
      dispatch(initialasedSucces());
    })
  }
};


export default appReducer;

import { authThunkCreator } from "./auth-reducer";

const SET_INITIALASED = 'SET_INITIALASED';

export type InitialStateType = {
  initialised: boolean
}

let initialState: InitialStateType = {
  initialised: false
};

const appReducer = (state = initialState, action: any): InitialStateType=> {
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

type InitialasedSuccesActionType = {
  type: typeof SET_INITIALASED
};

export const initialasedSucces = (): InitialasedSuccesActionType => ({
  type: SET_INITIALASED
});


export const initialiseApp = () => {
  return (dispatch: any) => {
    let promise = dispatch(authThunkCreator());
    promise.then(() => {
      dispatch(initialasedSucces());
    })
  }
};


export default appReducer;

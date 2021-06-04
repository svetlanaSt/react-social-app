import { authThunkCreator } from "./auth-reducer";

const SET_INITIALASED = 'SET_INITIALASED';



let initialState = {
  initialised: false
};

export type AppInitialStateType = typeof initialState;
  


const appReducer = (state = initialState, action: ActionsTypes): AppInitialStateType=> {
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

type InferValueTypes<T> = T extends { [key: string]: infer U} ? U : never;

type ActionsTypes = ReturnType<InferValueTypes<typeof actions>>;


export const actions = {
    initialasedSucces: () => ({
    type: SET_INITIALASED
  } as const)
};

export const initialiseApp = () => {
  return (dispatch: any) => {
    let promise = dispatch(authThunkCreator());
    promise.then(() => {
      dispatch(actions.initialasedSucces());
    })
  }
};


export default appReducer;

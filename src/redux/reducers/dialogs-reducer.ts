import { MessageType, UserType } from "../../types";

const ADD_MESSAGE = "dialog/ADD-MESSAGE";

let initialState = {
  users: [
    { id: 1, name: "Alex" },
    { id: 2, name: "Kseniya" },
    { id: 3, name: "Ann" },
    { id: 4, name: "Serge" },
    { id: 5, name: "Andrew" },
  ] as Array<UserType>,
  messages: [
    { id: 1, message: "Hi" },
    { id: 2, message: "Hello" },
    { id: 3, message: "ILY" },
  ] as Array<MessageType>,
};

export type DialogsStateType = typeof initialState;

const dialogsReducer = (state = initialState,  action: ActionsTypes): DialogsStateType => {
  switch (action.type) {
    case ADD_MESSAGE:
      let newMessage = {
        id: 4,
        message: action.text,
      };
      return {
        ...state,
        messages: [...state.messages, newMessage],
      };
    default:
      return state;
  }
};

type InferValueTypes<T> = T extends { [key: string]: infer U} ? U : never;

type ActionsTypes = ReturnType<InferValueTypes<typeof actions>>;

export const actions = {
  addMessageActionCreato: (text: string) => ({
    type: ADD_MESSAGE,
    text,
  } as const)
};

export default dialogsReducer;

const ADD_MESSAGE = 'dialog/ADD-MESSAGE';

let initialState = {
  users: [
    { id: 1, name: 'Alex' },
    { id: 2, name: 'Kseniya' },
    { id: 3, name: 'Ann' },
    { id: 4, name: 'Serge' },
    { id: 5, name: 'Andrew' }
  ],
  messages: [
    { id: 1, message: 'Hi' },
    { id: 2, message: 'Hello' },
    { id: 3, message: 'ILY' }
  ],
};

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:

      let newMessage = {
        id: 4,
        message: action.text
      };

      return {
        ...state,
        messages: [...state.messages, newMessage]
      };
    default:
      return state;
  }
};

export const addMessageActionCreator = (text) => ({
  type: ADD_MESSAGE,
  text
});


export default dialogsReducer;
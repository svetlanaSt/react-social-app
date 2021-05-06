import dialogsReducer from "./reducers/dialogs-reducer";
import profileReducer from "./reducers/profile-reducer";

let store = {
  _state: {
    profile: {
      posts: [
        { id: 1, text: 'Hello' },
        { id: 2, text: 'Wat`s up?' }
      ],
      newPostText: 'hey'
    },
    dialogs: {
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
      newMessageText: 'yo'
    },
  },

  getState() {
    return this._state;
  },

  _callSubscriber() {
    console.log('yo');
  },

  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) {
    this._state.profile = profileReducer(this._state.profile, action);
    this._state.dialogs = dialogsReducer(this._state.dialogs, action);

    this._callSubscriber();
  }
};









export default store;



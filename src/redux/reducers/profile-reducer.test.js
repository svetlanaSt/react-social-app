import profileReducer, { addPostMessageActionCreator } from "./profile-reducer";

it('new post should be added', () => {
  let action = addPostMessageActionCreator('it-post');

  let state = {
    posts: [
      { id: 1, text: 'Hello' },
      { id: 2, text: 'Wat`s up?' }
    ]
  };

  let newState = profileReducer(state, action);

  expect(newState.posts.length).toBe(3);
  expect(newState.posts[2].text).toBe('it-post');
});
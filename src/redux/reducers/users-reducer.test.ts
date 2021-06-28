import usersReducer, { actions, UserStateType } from "./users-reducer";

let state: UserStateType;

describe('user-reducer test', () => {
  beforeEach(() => {
    state = {
      users: [
        {
          id: 1,
          name: "Ann",
          followed: false,
          photos: { small: null, large: null },
          status: "yes",
        },
        {
          id: 2,
          name: "Ien",
          followed: true,
          photos: { small: null, large: null },
          status: "hello",
        },
        {
          id: 3,
          name: "Max",
          followed: false,
          photos: { small: null, large: null },
          status: "hi",
        },
      ],
      pageSize: 5,
      totalUsersCount: 0,
      currentPage: 1,
      isFetching: false,
      followingInProgress: [],
      filter: {
        term: ''
      }
    };
  });
  it('a', () => {
    const newState = usersReducer(state, actions.toggleFollow(2, false));
    expect(newState.users[1].followed).toBeFalsy();
  });

  it('b', () => {
    const newState = usersReducer(state, actions.setCurrentPageAC(4));
    expect(newState.currentPage).toBe(4);
  });
});

  
export const getUser = (state) => {
    return state.users.users;
};

export const getPageSize = (state) => {
    return state.users.pageSize;
};

export const getFilter = (state) => {
    return state.users.filter;
};

export const getTotalUsersCount = (state) => {
    return state.users.totalUsersCount;
};

export const getCurrentPage = (state) => {
    return state.users.currentPage;
};

export const getIsFetching = (state) => {
    return state.users.isFetching;
};

export const getIsfollowingInProgress = (state) => {
    return state.users.followingInProgress;
};
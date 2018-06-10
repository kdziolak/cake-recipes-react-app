export function signIn(user) {
  return dispatch => {
    dispatch({
      type: "SIGNIN",
      payload: user
    });
  };
}
export function signOut() {
  return dispatch => {
    dispatch({
      type: "SIGNOUT",
      payload: null
    });
  };
}

const login = (
  state = {
    login: false
  },
  action = {}
) => {
  switch (action.type) {
    case "SIGNIN": {
      state = {
        ...state,
        login: true
      };
      break;
    }
    case "SIGNOUT": {
      state = {
        ...state,
        login: false
      };
      break;
    }
  }

  return state;
};

export default login;

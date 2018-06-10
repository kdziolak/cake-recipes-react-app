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
  }

  return state;
};

export default login;

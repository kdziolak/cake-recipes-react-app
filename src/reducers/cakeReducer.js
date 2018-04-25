const cakes = (
  state = [
    {
      cakeName: "",
      prepareDescription: "",
      shortDescription: "",
      image: "",
      time: "",
      level: "",
      ingArray: []
    }
  ],
  action = {}
) => {
  switch (action.type) {
    case "GET_CAKES":
      state = [
        ...state,
        {
          id: action.payload.ID_Cake,
          cakeName: action.payload.cakeName,
          prepareDescription: action.payload.prepareDescription,
          shortDescription: action.payload.shortDescription,
          image: action.payload.image,
          time: action.payload.time,
          level: action.payload.level,
          ingArray: action.payload.ingArray
        }
      ];
      break;
    case "RESET_STATE":
      state = action.payload;
      break;
    case "FILTER_CAKES_BY_CAKE_NAME":
      state = state.filter(
        el =>
          el.cakeName.toLowerCase().search(action.payload.toLowerCase()) !== -1
      );
      break;
    case "FILTER_CAKES_BY_TIME":
      state = state.filter(
        el => el.time.toLowerCase().search(action.payload.toLowerCase()) !== -1
      );
      break;
    case "FILTER_CAKES_BY_LEVEL":
      state = state.filter(
        el => el.level.toLowerCase().search(action.payload.toLowerCase()) !== -1
      );
      break;
  }
  return state;
};

export default cakes;

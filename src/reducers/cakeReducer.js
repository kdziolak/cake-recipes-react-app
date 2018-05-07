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
          ingArray: action.payload.ingArray,
          favorite: action.payload.favorite
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
    case "FILTER_CAKES_BY_TIME": {
      let arr = state.slice();
      state = [];
      action.payload.map(el => {
        arr.map(elem => {
          if (el === elem.time) {
            state = [...state, elem];
          }
        });
      });
      break;
    }
    case "FILTER_CAKES_BY_LEVEL": {
      let arr = state.slice();
      state = [];
      action.payload.map(el => {
        arr.map(elem => {
          if (el === elem.level) {
            state = [...state, elem];
          }
        });
      });
      break;
    }
    case "MY_FAVORITE_CAKES":
      let arr = state.slice();
      arr.map(el => {
        if (el.id === action.payload.ID_Cake) {
          el.favorite = action.payload.favorite;
        }
      });
      state = arr;
      break;
  }
  return state;
};

export default cakes;

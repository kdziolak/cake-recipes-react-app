const cakes = (
  state = [
    {
      cakeName: "",
      prepareDescription: "",
      shortDescription: "",
      image: "",
      time: "",
      level: "",
      ingArray: [],
      favorite: false
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
      action.payload.checkboxTimeState.map(el => {
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
      console.log(action.payload.checkboxLevelState);
      action.payload.checkboxLevelState.map(el => {
        arr.map(elem => {
          if (el === elem.level) {
            state = [...state, elem];
          }
        });
      });
      break;
    }
    case "MY_FAVORITE_CAKES": {
      let arr = state.slice();
      state = [];
      let val = "";
      arr.map((el, i) => {
        if (el.cakeName === action.payload.cakeName) {
          val = el;
        }
      });
      let index = arr.indexOf(val);
      arr[index] = action.payload;
      console.log(arr);
      state = [...arr, action.payload];
      break;
    }
  }
  return state;
};

export default cakes;

const ingredients = (
  state = {
    editButton: -1,
    ingredientName: "",
    ingredientsArray: []
  },
  action = {}
) => {
  switch (action.type) {
    case "ADD_INGREDIENT":
      state = {
        ...state,
        ingredientsArray: [...state.ingredientsArray, action.payload]
      };
      break;
    case "REMOVE_INGREDIENT":
      state = {
        ...state,
        ingredientsArray: state.ingredientsArray.filter(
          el => el !== action.payload
        )
      };
      break;
    case "EDIT_INGREDIENT": {
      let { text, index } = action.payload;
      if (text === "Edytuj") {
        state = {
          ...state,
          editButton: index
        };
      } else {
        let arr = state.ingredientsArray.slice();
        arr[index] = state.ingredientName;
        state = {
          ...state,
          editButton: null,
          ingredientsArray: arr
        };
      }
      break;
    }
    case "CHANGE_INGREDIENT":
      state = {
        ...state,
        ingredientName: action.payload
      };
      break;
  }
  return state;
};

export default ingredients;

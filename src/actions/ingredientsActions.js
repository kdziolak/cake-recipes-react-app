
export function addNewIngredient(value) {
  return {
    type: "ADD_INGREDIENT",
    payload: value
  };
}

export function removeIngredient(value) {
  return {
    type: "REMOVE_INGREDIENT",
    payload: value
  };
}

export function editIngredient(text, index) {
  return {
    type: "EDIT_INGREDIENT",
    payload: { text, index }
  };
}

export function toChangeIngredientName(e) {
  return {
    type: "CHANGE_INGREDIENT",
    payload: e.target.value
  };
}


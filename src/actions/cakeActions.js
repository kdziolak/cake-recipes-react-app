import fire from "../firebase";

export function addToCakesList(
  cakeName,
  prepareDescription,
  shortDescription,
  image,
  time,
  level,
  ingArray
) {
  return dispatch => {
    let newRecipe = fire
      .database()
      .ref("Recipes")
      .push();
    let id = newRecipe.key;
    newRecipe.set({
      ID_Cake: id,
      cakeName,
      shortDescription,
      prepareDescription,
      image,
      time,
      level,
      ingArray
    });
  };
}

export function getCakes() {
  return dispatch => {
    let db = fire.database().ref("Recipes");
    db.on("child_added", snap => {
      dispatch({
        type: "GET_CAKES",
        payload: snap.val()
      });
    });
  };
}

export function resetStateCakesList() {
  return dispatch => {
    dispatch({
      type: "RESET_STATE",
      payload: []
    });
  };
}

export function filterCakesByCakeName(value) {
  return {
    type: "FILTER_CAKES_BY_CAKE_NAME",
    payload: value
  };
}
export function filterCakesByTime(value) {
  return {
    type: "FILTER_CAKES_BY_TIME",
    payload: value
  };
}
export function filterCakesByLevel(value) {
  return {
    type: "FILTER_CAKES_BY_LEVEL",
    payload: value
  };
}

export function addToFavorite(cakeName, state) {
  return dispatch => {
    let db = fire.database().ref("Recipes");
    db.on("value", snap => {
      snap.forEach(el => {
        if (el.val().cakeName === cakeName) {
          console.log(snap.child(el.val().ID_Cake));
          dispatch({
            type: "MY_FAVORITE_CAKES",
            payload: el.val()
          });
        }
      });
    });
    // db.on("child_added", snap => {
    //   if (snap.val().cakeName === cakeName && snap.val().favorite !== state) {
    //     db.child(snap.val().ID_Cake).update({
    //       favorite: state
    //     });
    //     dispatch({
    //       type: "MY_FAVORITE_CAKES",
    //       payload: snap.val()
    //     });
    //   }
    // });
  };
}

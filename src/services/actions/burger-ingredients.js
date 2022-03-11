import { HTTP_METHOD, HEADERS } from '../../utils/constants';

export const SET_INGREDIENTS = 'SET_INGREDIENTS';
export const SET_SORTED_INGREDIENTS = 'SET_SORTED_INGREDIENTS';

export const setIngredients = (url) => async (dispatch) => {
  try {
    const res = await fetch(url, {
      method: HTTP_METHOD.get,
      headers: HEADERS,
    });

    if (!res.ok) {
      throw res;
    }

    const { data } = await res.json();

    dispatch({ type: SET_INGREDIENTS, payload: data });
  } catch (e) {
    console.error(e);
  }
};

export const setSortedIngredients = (payload) => ({
  type: SET_SORTED_INGREDIENTS,
  payload,
});

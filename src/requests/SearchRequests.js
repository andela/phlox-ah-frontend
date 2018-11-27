import axios from 'axios';
import { asyncActions } from '../util/AsyncUtil';
import { SEARCH_ARTICLES } from '../actionTypes';
import { articleConstant } from '../constants/Constants';

export const searchArticles = payload => (dispatch) => {
  dispatch(asyncActions(SEARCH_ARTICLES).loading(true));
  axios.get(`${articleConstant.SEARCH_ARTICLES_URL}${payload.query}`)
    .then((response) => {
      if (response.status === 200) {
        console.log(payload.searchBy, '[[[[[[[[[[[[[[[[[');
        if (payload.searchBy === 'tag') {
          dispatch(asyncActions(SEARCH_ARTICLES).success(response.data.searchResult[0].Articles));
          return null;
        }
        dispatch(asyncActions(SEARCH_ARTICLES).success(response.data.searchResult));
      }
    })
    .catch((error) => {
      if (error.response.status === 404) {
        dispatch(asyncActions(SEARCH_ARTICLES).failure(true, 'Sorry, the search returned no results'));
        return null;
      }
      dispatch(asyncActions(SEARCH_ARTICLES).failure(true, 'Aww something wrong, try again later'));
    });
};

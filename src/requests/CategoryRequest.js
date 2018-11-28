
// import axios from 'axios';

// import { asyncActions } from '../util/AsyncUtil';
// import { GET_ALL_CATEGORY, GET_CATEGORY_ARTICLE } from '../actionTypes';
// import { categoryConstant } from '../constants/Constants';

// export const getAllCategory = () => (dispatch) => {
//   axios.get(`${categoryConstant.CATEGORY_URL}/categories`)
//     .then((response) => {
//       console.log('RESPONSE: ', response);
//       dispatch(asyncActions(GET_ALL_CATEGORY).success(response.data));
//       dispatch(asyncActions(GET_ALL_CATEGORY).loading(false));
//     })
//     .catch(error => dispatch(asyncActions(GET_ALL_CATEGORY)
//       .failure(true, error)));
// };

// export const getCategoryArticle = name => (dispatch) => {
//   axios.get(`${categoryConstant.CATEGORY_URL}/${name}/articles`)
//     .then((response) => {
//       console.log('RESPONSE: ', response);
//       // dispatch(asyncActions(GET_CATEGORY_ARTICLE).success(response.data));
//     })
//     .catch(error => dispatch(asyncActions(GET_CATEGORY_ARTICLE)
//       .failure(true, error)));
// };

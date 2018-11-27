import axios from 'axios';

import { reportConstant } from '../constants/Constants';
import { asyncActions } from '../util/AsyncUtil';
import { REPORT_ARTICLE } from '../actionTypes';

export const createReport = (articleSlug, title, body) => (dispatch) => {
  dispatch(asyncActions(REPORT_ARTICLE).loading(true));
  return axios.post(reportConstant(articleSlug).REPORT_ARTICLE_URL, { title, body })
    .then((response) => {
      dispatch(asyncActions(REPORT_ARTICLE).loading(false));
      dispatch(asyncActions(REPORT_ARTICLE).success(response.data));
      return response;
    })
    .catch((error) => {
      dispatch(asyncActions(REPORT_ARTICLE).loading(false));
      dispatch(asyncActions(REPORT_ARTICLE)
        .failure(true, error.response.data.message));
    });
};

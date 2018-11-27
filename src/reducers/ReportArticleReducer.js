import { REPORT_ARTICLE } from '../actionTypes';
import { asyncActionName } from '../util/AsyncUtil';

const initialState = {
  report: {},
  error: null,
  message: '',
  success: false,
  loading: false
};

const ReportArticleReducer = (state = initialState, action) => {
  switch (action.type) {
    case asyncActionName(REPORT_ARTICLE).success:
      return {
        ...state,
        report: action.payload.report,
        message: action.payload.message,
        success: action.payload.success
      };
    case asyncActionName(REPORT_ARTICLE).failure:
      return {
        ...state, error: action.payload.status, message: action.payload
      };
    case asyncActionName(REPORT_ARTICLE).loading:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export default ReportArticleReducer;

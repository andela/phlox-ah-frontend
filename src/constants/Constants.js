const BASE_URL = 'http://localhost:3000';
// eslint-disable-next-line
export const articleConstant = {
  ALL_ARTICLES: `${BASE_URL}/api/v1/articles/feed`
};

export const loginConstant = {
  LOGIN: `${BASE_URL}/api/v1/login`
};

export const passwordConstant = {
  FORGOT_PASSWORD_URL: `${BASE_URL}/api/v1/forgetPassword`,
  RESET_PASSWORD_URL: `${BASE_URL}/api/v1/reset_password`
};

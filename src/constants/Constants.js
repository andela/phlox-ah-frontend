const BASE_URL = 'http://localhost:3000';
export const articleConstant = {
  ALL_ARTICLES: `${BASE_URL}/api/v1/articles/feed`
};

export const loginConstant = {
  LOGIN_URL: `${BASE_URL}/api/v1/login`,
  GOOGLE_LOGIN_URL: `${BASE_URL}/api/v1/login/google`,
  FACEBOOK_LOGIN_URL: `${BASE_URL}/api/v1/login/facebook`,
  TWITTER_LOGIN_URL: 'http://127.0.0.1:3000/api/v1/login/twitter'
};

export const passwordConstant = {
  FORGOT_PASSWORD_URL: `${BASE_URL}/api/v1/forgetPassword`,
  RESET_PASSWORD_URL: `${BASE_URL}/api/v1/reset_password`
};

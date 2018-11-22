// const BASE_URL = 'https://phlox-ah-staging.herokuapp.com';

const BASE_URL = 'http://localhost:3000';

export const articleConstant = {
  ALL_ARTICLES_URL: `${BASE_URL}/api/v1/articles/feed`,
  CREATE_ARTICLES_URL: `${BASE_URL}/api/v1/articles`,
  UPDATE_ARTICLE_URL: `${BASE_URL}/api/v1/articles`,
  VIEW_ARTICLE_URL: `${BASE_URL}/api/v1/articles`,
  RATE_ARTICLE_URL: `${BASE_URL}/api/v1/articles`,
  FEATURED_ARTICLES_URL: `${BASE_URL}/api/v1/articles/featured`,
  POPULAR_ARTICLES_URL: `${BASE_URL}/api/v1/articles/popular`,
};

export const tagsConstant = {
  CREATE_TAG_URL: `${BASE_URL}/api/v1/tags`,
  GET_ALL_TAG_URL: `${BASE_URL}/api/v1/tags`
};

export const profileConstant = {
  PROFILE_URL: `${BASE_URL}/api/v1/profile`
};

export const loginConstant = {
  LOGIN_URL: `${BASE_URL}/api/v1/login`,
  GOOGLE_LOGIN_URL: `${BASE_URL}/api/v1/login/google`,
  FACEBOOK_LOGIN_URL: `${BASE_URL}/api/v1/login/facebook`,
  TWITTER_LOGIN_URL: `${BASE_URL}/api/v1/login/twitter`
};

export const categoryConstant = {
  GET_ALL_CATEGORY_URL: `${BASE_URL}/api/v1/categories`
};

export const passwordConstant = {
  FORGOT_PASSWORD_URL: `${BASE_URL}/api/v1/forgetPassword`,
  RESET_PASSWORD_URL: `${BASE_URL}/api/v1/reset_password`
};

export const signupConstant = {
  SIGNUP_URL: `${BASE_URL}/api/v1/signup`,
  VERIFY_URL: `${BASE_URL}/api/v1/users/verify`
};

export const commentConstant = articleSlug => ({
  COMMENT_URL: `${BASE_URL}/api/v1/articles/${articleSlug}/comments`,
});

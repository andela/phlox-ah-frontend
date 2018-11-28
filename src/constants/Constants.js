const BASE_URL = 'https://phlox-ah-staging.herokuapp.com/api/v1';

export const articleConstant = {
  ALL_ARTICLES_URL: `${BASE_URL}/articles/feed`,
  MY_ARTICLES_URL: `${BASE_URL}/myarticles`,
  FEATURED_ARTICLES_URL: `${BASE_URL}/articles/featured`,
  POPULAR_ARTICLES_URL: `${BASE_URL}/articles/popular`,
  ARTICLES_URL: `${BASE_URL}/articles`,
  SEARCH_ARTICLES_URL: `${BASE_URL}/search`
};

export const bookmarkConstant = {
  BOOKMARK_URL: `${BASE_URL}/bookmarks`
};

export const tagsConstant = {
  TAG_URL: `${BASE_URL}/tags`,
};

export const profileConstant = {
  PROFILE_URL: `${BASE_URL}/profile`
};

export const followUserConstant = {
  FOLLOW_USER_CONSTANT: `${BASE_URL}/profiles`,
  GET_FOLLOWINGS_CONSTANT: `${BASE_URL}/followings`,
  GET_FOLLOWERS_CONSTANT: `${BASE_URL}/followers`,
};

export const loginConstant = {
  LOGIN_URL: `${BASE_URL}/login`,
  GOOGLE_LOGIN_URL: `${BASE_URL}/login/google`,
  FACEBOOK_LOGIN_URL: `${BASE_URL}/login/facebook`,
  TWITTER_LOGIN_URL: `${BASE_URL}/login/twitter`
};

export const categoryConstant = {
  CATEGORY_URL: `${BASE_URL}/api/v1`,
  GET_ALL_CATEGORY_URL: `${BASE_URL}/categories`
};

export const passwordConstant = {
  FORGOT_PASSWORD_URL: `${BASE_URL}/forgetPassword`,
  RESET_PASSWORD_URL: `${BASE_URL}/reset_password`
};

export const signupConstant = {
  SIGNUP_URL: `${BASE_URL}/signup`,
  VERIFY_URL: `${BASE_URL}/users/verify`
};

export const commentConstant = articleSlug => ({
  COMMENT_URL: `${BASE_URL}/articles/${articleSlug}/comments`
});

export const notificationConstant = {
  OPT_IN_URL: `${BASE_URL}/notifications/optin`,
  OPT_OUT_URL: `${BASE_URL}/notifications/optout`
};

export const userConstant = username => ({
  GET_ONE_USER_URL: `${BASE_URL}/users/${username}`
});

export const reportConstant = articleSlug => ({
  REPORT_ARTICLE_URL: `${BASE_URL}/articles/${articleSlug}/reports`
});

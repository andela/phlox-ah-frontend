const BASE_URL = 'http://localhost:3000';
// eslint-disable-next-line
export const articleConstant = {
  ALL_ARTICLES_URL: `${BASE_URL}/api/v1/articles/feed`,
  CREATE_ARTICLES_URL: `${BASE_URL}/api/v1/articles`,
  UPDATE_ARTICLE_URL: `${BASE_URL}/api/v1/articles`
};

export const tagsConstant = {
  CREATE_TAG_URL: `${BASE_URL}/api/v1/tags`
};

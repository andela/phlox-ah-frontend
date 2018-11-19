const validateArticleData = (state) => {
  const { title, description, body, category } = state;
  if (title.length >= 6 && description.length >= 6 && body.length >= 6 && category !== '0') {
    return true;
  }
  return false;
};

export default validateArticleData;
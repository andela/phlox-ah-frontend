const articleFormData = (title, description, body, imgUrl, categoryId, tags) => {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  formData.append('body', body);
  formData.append('imgUrl', imgUrl);
  formData.append('categoryId', categoryId);
  formData.append('tags', JSON.stringify(tags));

  return formData;
};

export default articleFormData;

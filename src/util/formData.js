const articleFormData = (title, description, body, imgUrl, categoryId, tags) => {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  formData.append('body', body);
  formData.append('categoryId', categoryId);
  formData.append('tags', JSON.stringify(tags));
  if(typeof imgUrl !== 'string'){
    formData.append('imgUrl', imgUrl);
  }

  return formData;
};

export default articleFormData;

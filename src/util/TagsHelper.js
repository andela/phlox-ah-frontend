export const TagObjectToString = (lists) => {
  const newLists = lists.map(list => list.text);

  return newLists;
};

export const convertIdToString = tags => tags.map(tag => ({ id: tag.name, text: tag.name }));

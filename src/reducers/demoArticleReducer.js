const initialState = { articles: [{ title: 'The first article', body: 'The body' }] };

const demoArticleReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'All_Articles':
      state = { articles: [...state.articles, action.payload] };
      break;
    default:
      break;
  }
  return state;
};

export default demoArticleReducer;

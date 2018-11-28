export const articleStore = {
  search: {
    loading: true,
    success: true,
    failure: false,
    searchResult: [
      {
        id: 3,
        title: 'Second article by nelso',
        body: 'The second article by Nelson v Second article by Nelson.The second article by Nelson.<p><br></p>',
        slug: 'Second-article-by-nelson-09afb545-4110-4656-8378-c6b6f192eb92',
        description: 'Description of second article by nelson',
        imgUrl: 'https://res.cloudinary.com/dafcdw02e/image/upload/v1542892294/phlox/1542892286288_adult-agent-approval-684385.jpg',
        readTime: 1,
        ratingAverage: 0,
        ArticlesTags: {
          articleId: 3,
          tagId: 1,
          createdAt: '2018-11-22T13:11:20.097Z',
          updatedAt: '2018-11-22T13:11:20.097Z'
        }
      }
    ],
    error: null
  }
};

export const articleStore = {
  article: {
    loading: true,
    success: true,
    failure: false,
    article: {
      title: 'new test article by udochukwu',
      body: 'Body here',
      description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
      imgUrl: 'https://images.pexels.com/photos/788485/pexels-photo-788485.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      readTime: 1,
      createdAt: '2018-11-12T18:16:18.630Z',
      updatedAt: '2018-11-12T18:16:18.630Z',
      User: {
        username: 'nnaji',
        Profile: {
          profileImage: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?cs=srgb&dl=beautiful-beauty-brown-eyes-1065084.jpg&fm=jpg'
        }
      },
      Tags: [
        {
          id: 1,
          name: 'tech',
          createdAt: '2018-09-22T23:00:00.000Z',
          updatedAt: '2018-09-22T23:00:00.000Z',
        },
        {
          id: 2,
          name: 'animals',
          createdAt: '2018-09-22T23:00:00.000Z',
          updatedAt: '2018-09-22T23:00:00.000Z',
        }
      ],
      likes: [],
    }
  },
  comments: {
    comment: [
      {
        id: 3,
        comment: 'you be goat oo',
        createdAt: '2018-11-21T14:00:11.810Z',
        updatedAt: '2018-11-21T14:00:11.810Z',
        articleSlug: 'new-test-article-by-udochukwu-af9329ec-e692-4fe9-8af8-d684dab47178',
        userId: 2,
        User: {
          username: 'nelson',
          email: 'nelson.nnaji@andela.com',
          Profile: null
        },
        likes: [],
        Replies: []
      }
    ]
  },
  user: {
    isAuth: true,
    loading: false
  },
  params: {
    articleslug: 'article-slxug'
  },
  bookmark: {
    bookmarks: []
  },
  report: {
    report: {},
    error: null,
    message: '',
    success: false,
    loading: false
  }
};

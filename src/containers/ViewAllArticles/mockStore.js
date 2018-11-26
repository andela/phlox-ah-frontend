export const articleStore = {
  article: {
    loading: true,
    success: true,
    failure: false,
    articles: [
      {
        id: 3,
        title: 'Second article by nelson',
        body: 'The second article by Nelson v Second article by Nelson.The second article by Nelson.<p><br></p>',
        slug: 'Second-article-by-nelson-09afb545-4110-4656-8378-c6b6f192eb92',
        description: 'Description of second article by nelson',
        imgUrl: 'https://res.cloudinary.com/dafcdw02e/image/upload/v1542892294/phlox/1542892286288_adult-agent-approval-684385.jpg',
        readTime: 1,
        userId: 2,
        categoryId: 1,
        ratingAverage: 0,
        featured: 0,
        status: 'published',
        createdAt: '2018-11-22T13:11:20.033Z',
        updatedAt: '2018-11-22T13:11:44.537Z',
        Tags: [
          {
            id: 1,
            name: 'fake news',
            createdAt: '2018-11-22T13:11:19.925Z',
            updatedAt: '2018-11-22T13:11:19.925Z',
            ArticlesTags: {
              articleId: 3,
              tagId: 1,
              createdAt: '2018-11-22T13:11:20.097Z',
              updatedAt: '2018-11-22T13:11:20.097Z'
            }
          }
        ],
        Category: {
          id: 1,
          category: 'Technology',
          createdAt: '2018-11-22T23:00:00.000Z',
          updatedAt: '2018-11-22T23:00:00.000Z'
        },
        User: {
          username: 'nelson',
          Profile: null
        },
        likes: [
          {
            id: 3,
            like: null,
            createdAt: '2018-11-22T13:12:23.783Z',
            updatedAt: '2018-11-22T13:17:11.857Z',
            articleSlug: 'Second-article-by-nelson-09afb545-4110-4656-8378-c6b6f192eb92',
            userId: 2,
            User: {
              username: 'nelson',
              email: 'nelson.nnaji@andela.com'
            }
          }
        ]
      },
      {
        id: 2,
        title: 'new test article by udochukwu',
        body: '<p>This enables you to deliver on time regardless of unforeseen blockers. Products are built on timelines. Sometimes these timelines are based on launch dates, financial projections, product roadmaps, strategic objectives .etc. Every task done and feature implemented contributes to meeting the timelines set for the overall product. In addition, features have dependencies and timelines on one feature contribute to timelines on others. If you don’t learn how to estimate timelines for delivery, it will translate to you making promises you can’t keep. Risks you didn’t foresee will always creep up and mess up your delivery timelines. Mastering the ability to estimate accurately enables you to build a great relationship with your clients /partners and to reinforce your brand as a professional developer who can be trusted.</p>\n\n<p>Every task you pick up on a team project will require you to scope it out, assign it a weight based on its complexity and estimate how long it will take you to complete it. Every bug you encounter will be a potential blocker to meeting your estimated timeline. Every new concept or technology that you need to learn on the path to implementing a feature is a potential hindrance to meeting estimated timelines. Software development is problem-solving on the clock. If you fail to master the ability to foresee and account for risks that arise in the process of building a product, you will struggle to estimate properly and constantly fail to deliver on time. You will basically be a dev who ‘talks a lot, doesn’t deliver!’</p>',
        slug: 'new-test-article-by-udochukwu-af9329ec-e692-4fe9-8af8-d684dab47178',
        description: 'Description here and here too',
        imgUrl: 'https://images.pexels.com/photos/179912/pexels-photo-179912.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        readTime: 1,
        userId: 1,
        categoryId: 1,
        ratingAverage: 4,
        featured: 0,
        status: 'published',
        createdAt: '2018-11-20T08:00:03.743Z',
        updatedAt: '2018-11-21T14:07:53.239Z',
        Tags: [],
        Category: {
          id: 1,
          category: 'Technology',
          createdAt: '2018-11-22T23:00:00.000Z',
          updatedAt: '2018-11-22T23:00:00.000Z'
        },
        User: {
          username: 'nnaji',
          Profile: null
        },
        likes: [
          {
            id: 2,
            like: false,
            createdAt: '2018-11-20T11:23:02.778Z',
            updatedAt: '2018-11-22T12:31:07.855Z',
            articleSlug: 'new-test-article-by-udochukwu-af9329ec-e692-4fe9-8af8-d684dab47178',
            userId: 2,
            User: {
              username: 'nelson',
              email: 'nelson.nnaji@andela.com'
            }
          },
          {
            id: 1,
            like: true,
            createdAt: '2018-11-20T10:47:12.913Z',
            updatedAt: '2018-11-20T11:13:16.155Z',
            articleSlug: 'new-test-article-by-udochukwu-af9329ec-e692-4fe9-8af8-d684dab47178',
            userId: 1,
            User: {
              username: 'nnaji',
              email: 'nnaji_udochukwu@yahoo.com'
            }
          }
        ]
      }
    ]
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
  }
};

import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import ViewArticle from './ViewAnArticle';

const mockStore = configureMockStore();
const store = mockStore({
  Articles: {
    loading: false,
    success: false,
    Article: {
      loading: true,
      success: false,
      failure: false,
      article: {
        title: 'new test article by udochukwu',
        body: '<p>It is a long established fact that a\n                                  reader will be distracted\n                                   by the readable content of\n                                   a page when looking at its layout. The point of using Lorem\n                                   Ipsum is that it\n                                   has a more-or-less\n                                   normal distribution of letters, as opposed to using\n                                  Content here, content here, making it look like readable English.\n                                   Many desktop publishing packages and web page\n                                   editors now use Lorem\n                                    Ipsum as their default model text, and a search for lorem\n                                    ipsum will\n                                     uncover many web sites.\n                                  </p> <p>It is a long established fact that a\n                                  reader will be distracted\n                                   by the readable content of\n                                   a page when looking at its layout. The point of using Lorem\n                                   Ipsum is that it\n                                   has a more-or-less\n                                   normal distribution of letters, as opposed to using\n                                  Content here, content here, making it look like readable English.\n                                   Many desktop publishing packages and web page\n                                   editors now use Lorem\n                                    Ipsum as their default model text, and a search for lorem\n                                    ipsum will\n                                     uncover many web sites.\n                                  </p> <p>It is a long established fact that a\n                                  reader will be distracted\n                                   by the readable content of\n                                   a page when looking at its layout. The point of using Lorem\n                                   Ipsum is that it\n                                   has a more-or-less\n                                   normal distribution of letters, as opposed to using\n                                  Content here, content here, making it look like readable English.\n                                   Many desktop publishing packages and web page\n                                   editors now use Lorem\n                                    Ipsum as their default model text, and a search for lorem\n                                    ipsum will\n                                     uncover many web sites.\n                                  </p> <p>It is a long established fact that a\n                                  reader will be distracted\n                                   by the readable content of\n                                   a page when looking at its layout. The point of using Lorem\n                                   Ipsum is that it\n                                   has a more-or-less\n                                   normal distribution of letters, as opposed to using\n                                  Content here, content here, making it look like readable English.\n                                   Many desktop publishing packages and web page\n                                   editors now use Lorem\n                                    Ipsum as their default model text, and a search for lorem\n                                    ipsum will\n                                     uncover many web sites.\n                                  </p> <p>It is a long established fact that a\n                                  reader will be distracted\n                                   by the readable content of\n                                   a page when looking at its layout. The point of using Lorem\n                                   Ipsum is that it\n                                   has a more-or-less\n                                   normal distribution of letters, as opposed to using\n                                  Content here, content here, making it look like readable English.\n                                   Many desktop publishing packages and web page\n                                   editors now use Lorem\n                                    Ipsum as their default model text, and a search for lorem\n                                    ipsum will\n                                     uncover many web sites.\n                                  </p> ',
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
    }
  }
});

let component;
let myComponent;

describe('<ViewArticle/>', () => {
  beforeEach(() => {
    component = shallow(
      <Provider store={store}>
        <ViewArticle />
      </Provider>
    );
    myComponent = component.dive({ context: { store } }).dive();
  });
  it('should render without throwing an error', () => {
    expect(component).toMatchSnapshot();
  });
});

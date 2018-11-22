import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import DeleteModal from './DeleteModal';
import DeleteReducer from '../../reducers/DeleteReducer';
import { asyncActions, DELETE } from '../BasePath';

const mockStore = configureMockStore([thunk]);
const store = mockStore({
  deleteItem: {
    loading: true,
  },
  articleslug: 'title-slug',
  hideDeleteModal: jest.fn(),
  deleteArticle: jest.fn()
});

let component;
let myComponent;

describe('<DeleteModal />', () => {
  beforeEach(() => {
    component = shallow(
      <Provider store={store}>
        <DeleteModal />
      </Provider>
    );
    myComponent = component.dive({ context: { store } }).dive();
  });
  it('should render without throwing an error', () => {
    expect(component).toMatchSnapshot();
  });
  it('should have span.warning-icon', () => {
    expect(myComponent.find('span.warning-icon').exists()).toBe(true);
  });
  it('should have div.modal-info', () => {
    expect(myComponent.find('div.modal-info').exists()).toBe(true);
  });
  it('should have div.modal-buttons', () => {
    expect(myComponent.find('div.modal-buttons').exists()).toBe(true);
  });
  it('should have span.warning-text', () => {
    expect(myComponent.find('span.warning-text').exists()).toBe(true);
  });
  it('should have button.btn.yes tag', () => {
    expect(myComponent.find('button.btn.yes').exists()).toBe(true);
  });
  it('should have button.btn.no tag', () => {
    expect(myComponent.find('button.btn.no').exists()).toBe(true);
  });
  it('should have div.delete-modal', () => {
    expect(myComponent.find('div.delete-modal').exists()).toBe(true);
  });
  it('should have Preloader component', () => {
    expect(myComponent.find('Preloader').exists()).toBe(true);
  });
  it('should have deleteItem.loading of true', () => {
    expect(myComponent.instance().props.deleteItem.loading).toBe(true);
  });
  it('should have hideDeleteModal function', () => {
    expect(myComponent.instance().hideDeleteModal).toBeDefined();
  });
  it('should have deleteArticle prop function', () => {
    expect(myComponent.instance().props.deleteArticle).toBeDefined();
  });
  it('should create an action to set loading to false', () => {
    const payload = {
      loading: false
    };
    const expectedAction = {
      type: 'DELETE_LOADING',
      payload
    };
    expect(asyncActions(DELETE).loading(payload)).toEqual(expectedAction);
    const newState = DeleteReducer({}, expectedAction);
    expect(newState).toEqual({ loading: payload });
  });
  it('should create an action to set loading to true', () => {
    const payload = {
      loading: true
    };
    const expectedAction = {
      type: 'DELETE_LOADING',
      payload
    };
    expect(asyncActions(DELETE).loading(payload)).toEqual(expectedAction);
    const newState = DeleteReducer({}, expectedAction);
    expect(newState).toEqual({ loading: payload });
  });
});

import React from 'react';
import renderer, { act, create } from 'react-test-renderer';
import App from './App';

describe('<App />', () => {
    jest.useFakeTimers();
    let tree;
it('renders ',async() => {
    await act(async() => {
      tree = renderer.create(
          <App/>
      );
    });
  });
it('has 1 child', async () => {
    await act( async () => {
     tree = renderer.create(
          <App/>
      );
    });
    tree = tree.toJSON()
     expect(tree.children.length).toBe(1);
    });
});

import React from 'react';
import renderer, {act} from 'react-test-renderer';

import FolderCard from './FolderCard';

describe('<FolderCard />', () => {
jest.useFakeTimers();
let tree;
it('renders ',async() => {
await act(async() => {
  tree = renderer.create(
      <FolderCard
      item={["PM", [101, 102]]}/>
  );
});
});
});

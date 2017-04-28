import React from 'react';
import expect from 'expect';
import { renderIntoDocument } from 'react-dom/test-utils';
import Menu from './Menu';

describe('/containers/Menu', () => {
  it('should render', () => {
    const item = renderIntoDocument(
      <Menu />
    );

    expect(item).toExist();
  });
});

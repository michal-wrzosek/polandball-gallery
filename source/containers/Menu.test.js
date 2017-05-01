import React from 'react';
import expect from 'expect';
import { describe, it } from 'mocha';
import { shallow } from 'enzyme'
import Menu from './Menu';

describe('/containers/Menu', () => {
  it('should render', () => {
    const item = shallow(<Menu />);
    expect(item).toExist();
  });
});

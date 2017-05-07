import React from 'react';
import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import { shallow } from 'enzyme';
import Loader from './Loader';

describe('components/Loader', () => {
  it('should be rendered correctly', () => {
    const loader = shallow(<Loader />);
    expect(loader).to.have.html('<div class="loader"></div>');
  });
});

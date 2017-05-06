import React from 'react';
import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Menu from './Menu';

chai.use(chaiEnzyme());

describe('containers/Menu', () => {
  const elements = [
    {
      name: 'Element 1',
      path: '/somepath1',
    },
    {
      name: 'Element 2',
      path: '/anotherpath',
    },
  ];

  it('menu elements should be rendered', () => {
    const handleClick = () => {};
    const menu = shallow(
      <Menu
        elements={ elements }
        handleClick={ handleClick }
      />
    );

    expect(menu).to.have.exactly(2).descendants('.menu__link');
  });

  it('should call handleClick() when menu element is clicked', () => {
    const handleClick = sinon.spy();
    const menu = shallow(
      <Menu
        elements={ elements }
        handleClick={ handleClick }
      />
    );

    menu.find('.menu__link-a').last().simulate('click');
    expect(handleClick).to.have.property('callCount', 1);
    expect(handleClick.args[0]).to.be.deep.equal(['/anotherpath']);
  });
});

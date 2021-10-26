import React from 'react';
import {shallow} from 'enzyme';
import HappyHourAd from './HappyHourAd';

const select = {
  title: '.title',
  promoDescription: '.promoDescription',
};

const mockProps = {
  title: 'Happy hours!',
  promoDescription: 'time is now',
};

describe('componrnt HappyHourAd', () => {
  it('should render without crashing', () => {
    const component = shallow(<HappyHourAd />);
    expect(component).toBeTruthy();
  });

  it('should render heading and description', () => {
    const component = shallow(<HappyHourAd />);
    expect(component.exists(select.title)).toEqual(true);
    expect(component.exists(select.promoDescription)).toEqual(true);
  });

  it('should render title from prop title', () => {
    const component = shallow(<HappyHourAd {...mockProps}/>);
    const renderedTitle = component.find('.title').text();
    expect(renderedTitle).toEqual(mockProps.title);
  });
});
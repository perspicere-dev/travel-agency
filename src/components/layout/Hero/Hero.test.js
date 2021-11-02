import React from 'react';
import {shallow} from 'enzyme';
import Hero from './Hero';

describe('Component Hero', () => {
  it('should render without crashing', () => {
    const component = shallow(<Hero titleText='mmmm ipsum' imageSrc='anything' />);
    expect(component).toBeTruthy();
  });

  // edge cases - jak zachowa się komponent, kiedy nie podamy propsa (lub podamy błędną wartość), a jak przy jego poprawnej wartości.
  it('should throw error without required props', () => {
    expect(() => shallow(<Hero />)).toThrow();
  });
  
  it('should render correct title and image', () => {
    const expectedTitle = '???? lorem';
    const expectedImage = 'imasssge.jpg';
    const component = shallow(<Hero titleText={expectedTitle} imageSrc={expectedImage} />); // shallow - "renderuje" komponent z jej argumentu. "renderuje kod JSX tylko testowanego komponentu. Chcąc renderwoać zagniedzone w nim uzywamy func moount - bardzoej do testow integracyjnych"
  
    const renderedTitle = component.find('.title').text();
    expect(renderedTitle).toEqual(expectedTitle);
    expect(component.find('.image').prop('src')).toEqual(expectedImage);
  });

  // czy nasz wyrenderowany wrapper komponentu otrzymuje poprawne klasy, w zależności od propsa variant.
  it('renders correct classNames', () => {
    const mockVariants = 'small dummy bnbn jgug';
    const component = shallow(<Hero titleText='Lorem' imageSrc='image.jpg' variant={mockVariants} />); //nie sprawdzamy titleText i imageSrc wiec maja przykaldowe wartosci

    // kiedy zmianiam nazwę klasy propsa 'variant' w Country na błędną -> np 'smalllala' to i tak test jest pozytywny, dlaczego?
    expect(component.hasClass('component')).toBe(true);
    expect(component.hasClass('small')).toBe(true);
    expect(component.hasClass('dummy')).toBe(true);
    console.log(component.debug());
  });

  it('should render HappyHourAd', () => {
    const expectedTitle = 'Lorem ipsum';
    const expectedImage = 'image.jpg';
    const component = shallow(<Hero titleText={expectedTitle} imageSrc={expectedImage} />);
  
    expect(component.find('HappyHourAd').length).toEqual(1);
  });
});
import React from 'react';
import {shallow} from 'enzyme';
import TripSummary from './TripSummary';

describe ('Component TripSummary', () => {
  const expectedId = 'abc';

  it('should render without crashing', () => {
    const component = shallow(<TripSummary tags={[]} id={expectedId}/>); 
    expect(component).toBeTruthy();
  });

  it('should render link to proper adrss if props id=abc', () => {
    const expectedId = 'abc';
    const generatedLink = `/trip/${expectedId}`;
    const component = shallow(<TripSummary tags={[]} id={expectedId} />);

    expect(component.find('.link').prop('to')).toEqual(generatedLink);
  });

  it('should get valid src and alt for <img>', () => {
    const expectedImgOrName = 'string';
    const component = shallow(<TripSummary tags={[]} id={expectedId} image={expectedImgOrName} name={expectedImgOrName}/>);
    expect(component.find('img').prop('src')).toEqual(expectedImgOrName);
    expect(component.find('img').prop('alt')).toEqual(expectedImgOrName);
    // console.log(component.debug());
  });

  it('should render corectly props name, cost, days', () => {
    const expectedName = 'name';
    const expectedDays = 123;
    const expectedCost = 'cost';
    const component = shallow(<TripSummary tags={[]} id={expectedId} name={expectedName} cost={expectedCost} days={expectedDays}/>);

    const renderedName = component.find('.title').text();
    const renderedDays = component.find('.details').childAt(0).text();
    const renderedCost = component.find('.details').childAt(1).text(); 
    expect(renderedName).toEqual(expectedName);
    expect(renderedDays).toEqual(expectedDays + ' days');
    expect(renderedCost).toEqual('from ' + expectedCost);
  });

  it('should throw error without requierd props', () => {
    expect(() => shallow(<TripSummary tags={[]} />)).toThrow();
  });
  const arrOfTags = ['one', 'two', 'three'];
  it('shoul render proper tags', () => {
    const component = shallow(<TripSummary tags={arrOfTags} id={expectedId}/>);
    // const renderedDiv = component.find('.tags');

    for(let i = 0; i < arrOfTags.length; i++ ) {
      expect(component.find('.tag').at(i).text()).toEqual(arrOfTags[i]);
    }
  });
  
});
    

// czy generowany jest link do poprawnego adresu, np. '/trip/abc', jeśli props id ma wartość 'abc',
// czy <img> ma poprawne src i alt,
// czy poprawnie renderują się propsy name, cost i days,
// czy jest wywoływany błąd w przypadku braku któregokolwiek z propsów: id, image, name, cost i days.
// Pamiętaj też, że jako selektor w metodzie .find możesz wykorzystać również nazwy tagów (np. article) oraz nazwy komponentów (np. Link). Używaj ich jednak tylko jeśli element nie ma klasy i możesz założyć, że jest to jedyny element tego typu w komponencie.
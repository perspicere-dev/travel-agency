import React from 'react';
import {shallow} from 'enzyme';
import TripSummary from './TripSummary';

describe ('Component TripSummary', () => {
  it('should render without crashing', () => {
    const expectedId = 'abc';
    const component = shallow(<TripSummary tags={[]} id={expectedId}/>); 
    expect(component).toBeTruthy();
    console.log(component.debug());

  });

  it('should render link to proper adrss if props id=abc', () => {
    const expectedId = 'abc';
    const generatedLink = `/trip/${expectedId}`;
    const component = shallow(<TripSummary tags={[]} id='abc' />);

    expect(component.find('.link').prop('to')).toEqual(generatedLink);
  });
});
    

// czy generowany jest link do poprawnego adresu, np. '/trip/abc', jeśli props id ma wartość 'abc',
// czy <img> ma poprawne src i alt,
// czy poprawnie renderują się propsy name, cost i days,
// czy jest wywoływany błąd w przypadku braku któregokolwiek z propsów: id, image, name, cost i days.
// Pamiętaj też, że jako selektor w metodzie .find możesz wykorzystać również nazwy tagów (np. article) oraz nazwy komponentów (np. Link). Używaj ich jednak tylko jeśli element nie ma klasy i możesz założyć, że jest to jedyny element tego typu w komponencie.
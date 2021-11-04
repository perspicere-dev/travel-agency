import React from 'react';
import {shallow} from 'enzyme';
import DaysToSummer from './DaysToSummer';


const select = {
  title: '.title',
};

const trueDate = Date;
const mockDate = customDate => class extends Date {
  constructor(...args) {
    if(args.length){
      super(...args);
    } else {
      super(customDate);
    }
    return this;
  }
  static now(){
    return (new Date(customDate)).getTime();
  }
};


describe('componrnt DaysToSummer', () => {
  it('should render without crashing', () => {
    const component = shallow(<DaysToSummer />);
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const component = shallow(<DaysToSummer />);
    expect(component.exists(select.title)).toEqual(true);
  });

  it('should not render when summer is on', () => {

    global.Date = mockDate(`2021-07-10T11:55:55.135Z`);

    const component = shallow(<DaysToSummer />);
    expect(component).toEqual({});

    global.Date = trueDate;
  });

  it('shold render 1 day to summer', () => {

    global.Date = mockDate(`2021-06-20T11:55:55.135Z`); 

    const component = shallow(<DaysToSummer />);
    const renderedText = component.find(select.title).text();
    expect(renderedText).toEqual('1 day to summer!');

    global.Date = trueDate;
  });

  it('shold render 2 days  to summer', () => {

    global.Date = mockDate(`2021-06-19T11:55:55.135Z`); 

    const component = shallow(<DaysToSummer />);
    const renderedText = component.find(select.title).text();
    expect(renderedText).toEqual('2 days to summer!');

    global.Date = trueDate;
  });
});
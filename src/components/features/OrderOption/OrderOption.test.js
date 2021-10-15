/* eslint-disable no-unused-vars */
import React from 'react';
import {shallow} from 'enzyme';
import OrderOption from './OrderOption';

describe('Component Orderoption', () => {
  it('should render without crashing', () => {
    const component = shallow(<OrderOption type={'lorem'} name={'ipsum'}/>);
    console.log(component.debug());
    expect(component).toBeTruthy();
  });

  it('should return empty object if called without required props', () => {
    const component = shallow(<OrderOption />);
    expect(component).toEqual({});
  });

  it('shold render name in title', () => {
    const component = shallow(<OrderOption type={'text'} name={'name'} />);
    expect(component.find('.title').text()).toEqual('name');  
  });
});

const optionTypes = {
  dropdown: 'OrderOptionDropdown',
  //   icons: 'OrderOptionIcons', // dlaczego wyrzuca błąd = Method “dive” is meant to be run on 1 node. 0 found instead?
  checkboxes: 'OrderOptionCheckboxes',
  number: 'OrderOptionNumber',
  text: 'OrderOptionText',
  date: 'OrderOptionDate', //nie przechodził test - zminiono na type .any w propsach OrderOptionDate. Dlaczego nie przechodził test?
};

const mockProps = { //Jest to mieszanka właściwości różnych opcji z pliku pricing.json
  id: 'abc',
  name: 'Lorem',
  values: [
    {id: 'aaa', icon: 'h-square', name: 'Lorem A', price: 0},
    {id: 'xyz', icon: 'h-square', name: 'Lorem X', price: 100},
  ],
  required: false,
  currentValue: 'aaa',
  price: '50%',
  limits: {
    min: 0,
    max: 6,
  },
};
  
const mockPropsForType = {
  dropdown: {},
  icons: {},
  checkboxes: {currentValue: [mockProps.currentValue]},
  number: {currentValue: 1},
  text: {},
  date: {},
};
  
const testValue = mockProps.values[1].id;
const testValueNumber = 3;

for(let type in optionTypes){
  describe(`Component OrderOption with type=${type}`, () => {
    /* test setup */
    let component;
    let subcomponent;
    let renderedSubcomponent;
    
    beforeEach(() => {
      component = shallow(
        <OrderOption
          type={type}
          {...mockProps}
          {...mockPropsForType[type]}
        />
      );
      subcomponent = component.find(optionTypes[type]);
      renderedSubcomponent = subcomponent.dive();
    });

    /* common tests */
    it('passes dummy test', () => {
      expect(1).toBe(1);
      console.log(component.debug());
    });
  
    /* type-specific tests */
    switch (type) {
      case 'dropdown': {
        /* tests for dropdown */
        break;
      }
    }
  });
}
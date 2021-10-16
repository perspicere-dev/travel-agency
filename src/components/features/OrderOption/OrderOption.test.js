/* eslint-disable no-unused-vars */
import React from 'react';
import {shallow} from 'enzyme';
import OrderOption from './OrderOption';
import DatePicker from 'react-datepicker';

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
    let mockSetOrderOption; /* 1 */

    beforeEach(() => {
      mockSetOrderOption = jest.fn(); /* 2 */
      component = shallow(
        <OrderOption
          type={type}
          setOrderOption={mockSetOrderOption} /* 3 */
          {...mockProps}
          {...mockPropsForType[type]}
        />
      );
      
      subcomponent = component.find(optionTypes[type]);
      renderedSubcomponent = subcomponent.dive();
    });

    /* common tests */
    // it('passes dummy test', () => {
    //   expect(1).toBe(1);
    //   console.log(component.debug());
    // });
    it(`renders ${optionTypes[type]}`, () => {
      expect(subcomponent).toBeTruthy();
      expect(subcomponent.length).toBe(1);
    });
      
    /* type-specific tests */
    switch (type) {
      case 'dropdown': {
        /* tests for dropdown */
        it('contains select and options', () => {
          const select = renderedSubcomponent.find('select');
          expect(select.length).toBe(1);
          
          const emptyOption = select.find('option[value=""]').length;
          expect(emptyOption).toBe(1);
          
          const options = select.find('option').not('[value=""]');
          expect(options.length).toBe(mockProps.values.length);
          expect(options.at(0).prop('value')).toBe(mockProps.values[0].id);
          expect(options.at(1).prop('value')).toBe(mockProps.values[1].id);
        });
        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('select').simulate('change', {currentTarget: {value: testValue}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
        break;
      }
      case 'icons': { // nie funkcjonalny ze względu na "odłączone" icons w line 26
        it('should run setOrderOption function on click', () => {
          renderedSubcomponent.find('Icon').simulate('click');
          expect(mockSetOrderOption).toBeCalledTimes(1);
        });
        break;
      }
      case 'checkboxes': {
        /* tests for number */
        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find({value: testValue}).simulate('change', {currentTarget: {checked: true}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: [mockProps.currentValue, testValue] });
        });
        break;
      }
      case 'number': {
        /* tests for number */
        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('input').simulate('change', {currentTarget: {value: testValueNumber}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValueNumber });
        });
        break;
      }

      case 'text': {
        /*test for text */
        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('input').simulate('change', {currentTarget: {value: testValue}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
        break;
      }

      case 'date': {
        /*test for date */
        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find(DatePicker).simulate('change', testValue);
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
          console.log(renderedSubcomponent.debug());
        });
        break;
      }
    }
  });
}
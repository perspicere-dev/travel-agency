import React from 'react';
import styles from './OrderOption.scss';
import OrderOptionDropdown from './OrderOptionDropdown';
import OrderOptionIcons from './OrderOptionIcons';
import OrderOptionNumber from './OrderOptionNumber';
import OrderOptionCheckboxes from './OrderOptionCheckboxes';
import OrderOptionText from './OrderOptionText';
import PropTypes from 'prop-types';
import OrderOptionDate from './OrderOptionDate';


const optionTypes = {
  dropdown: OrderOptionDropdown,
  icons: OrderOptionIcons,
  checkboxes: OrderOptionCheckboxes,
  number: OrderOptionNumber,
  text: OrderOptionText,
  date: OrderOptionDate,

};


const OrderOption = ({name, type, id, setOrderOption, ...otherProps}) => {
  console.log('OrderOptionText', OrderOptionText);
  // console.log('OrderOption current id: ', id);
  const OptionComponent = optionTypes[type];
  //   console.log('optionTypes[type]', optionTypes[type]);
  if(!OptionComponent){
    return null;
  } else {
    return (
      <div className={styles.component}>
        <h3 className={styles.title}>{name}</h3>
        <OptionComponent
          setOptionValue={value => setOrderOption({[id]: value})}
          {...otherProps}
        />
      </div>
    );
  }
};

OrderOption.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.any,
  setOrderOption: PropTypes.func,
};

export default OrderOption;
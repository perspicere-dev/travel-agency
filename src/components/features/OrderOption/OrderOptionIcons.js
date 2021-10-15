import React from 'react';
import PropTypes from 'prop-types';
import {formatPrice} from '../../../utils/formatPrice';
import styles from './OrderOption.scss';
import Icon from '../../common/Icon/Icon';

const OrderOptionIcon = ({values, required, currentValue, setOptionValue}) => {
// console.log('setOptionValue', setOptionValue);
  //   console.log('currentValue', currentValue);


  return (
    <div className={styles.icon}>
      {required ? '' : (
        <div onClick={() => setOptionValue('')}> 
          <Icon name={'times-circle'} /> 
          none
        </div>
      )}
      {values.map(value => (
        <div key={value.id} 
          className={currentValue===value.id ? styles.iconActive : styles.icon}
          onClick={() => setOptionValue(value.id)}
        > 
          <Icon name={value.icon} /> 
          {value.name}
          {formatPrice(value.price)}
        </div>
      ))}
    </div>
  );};

OrderOptionIcon.propTypes = {
  setOptionValue: PropTypes.func,
  values: PropTypes.array,
  currentValue: PropTypes.string,
  required: PropTypes.bool,
};
  

export default OrderOptionIcon;



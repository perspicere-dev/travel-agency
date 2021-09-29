import React from 'react';
import styles from './OrderSummary';
import PropTypes from 'prop-types';
import calculateTotal from '../../../utils/calculateTotal';
import formatPrice from '../../../utils/formatPrice';

const OrderSummary = (props) => (
  <h2 className={styles.component}>Total: <strong>{formatPrice(calculateTotal(props.tripCost, props.options))}</strong></h2>
);

OrderSummary.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.object,
};

export default OrderSummary;
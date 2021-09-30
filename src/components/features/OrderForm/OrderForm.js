import React from 'react';
// import styles from './OrderForm.scss';
import PropTypes from 'prop-types';
// import ReactHtmlParser from 'react-html-parser';
import {Row, Col} from 'react-flexbox-grid';
import OrderSummary from '../OrderSummary/OrderSummary';
import pricing from '../../../data/pricing.json';
import OrderOption from '../OrderOption/OrderOption';

const OrderForm = (props) => {
  return (
    <Row>
      <div>
        {pricing.map(option => (
          <Col key={option.id} md={4}>
            <OrderOption {...option} />
          </Col>
        ))};
      </div>
      <Col xs={12}>
        <OrderSummary tripCost={props.tripCost} options={props.options} />
      </Col>
    </Row>
  );
};

OrderForm.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.object,
};

export default OrderForm;
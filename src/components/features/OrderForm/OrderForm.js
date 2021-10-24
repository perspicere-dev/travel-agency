import React from 'react';
// import styles from './OrderForm.scss';
import PropTypes from 'prop-types';
// import ReactHtmlParser from 'react-html-parser';
import {Row, Col} from 'react-flexbox-grid';
import OrderSummary from '../OrderSummary/OrderSummary';
import pricing from '../../../data/pricing.json';
import OrderOption from '../OrderOption/OrderOption';
import Button from '../../common/Button/Button';
import { formatPrice } from '../../../utils/formatPrice';
import { calculateTotal} from '../../../utils/calculateTotal';
import settings from '../../../data/settings';

const sendOrder = (options, tripCost, tripName, tripId, countryCode ) => {
  const totalCost = formatPrice(calculateTotal(tripCost, options));
  console.log('...options.name', options.name);
  const payload = {
    ...options,
    totalCost,
    tripId,
    countryCode,
    tripName,
  };

  const url = settings.db.url + '/' + settings.db.endpoint.orders;


  const fetchOptions = {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };
 
  if(options.contact == '' || options.name == ''){
    alert('please fill name and contact');
    return;
  }

  fetch(url, fetchOptions)
    .then(function(response){
      return response.json();
    }).then(function(parsedResponse){
      console.log('parsedResponse', parsedResponse);
    });
};

const OrderForm = (props) => {
  
  return (
    <Row>
      <div>
        {pricing.map((option) => (
          <Col key={option.id} md={4}>
            <OrderOption currentValue={props.options[option.id]} setOrderOption={props.setOrderOption} {...option} />
          </Col>
        ))};
      </div>
      <Col xs={12}>
        <OrderSummary tripCost={props.tripCost} options={props.options} />
      </Col>
      <Button onClick={() => sendOrder(props.options, props.tripCost, props.tripName, props.tripId, props.countryCode)}>Order now!</Button>
    </Row>
  );
};

OrderForm.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.object,
  setOrderOption: PropTypes.func,
  tripId: PropTypes.string,
  tripName: PropTypes.string,
  countryCode: PropTypes.string,
};

export default OrderForm;
import React from 'react';
import PropTypes from 'prop-types';
import styles from './DaysToSummer.scss';

class DaysToSummer extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    promoDescription: PropTypes.string,
  }

  isSummer() {
    const currentTime = new Date();
    const summerStart = new Date(Date.UTC(currentTime.getUTCFullYear(), 5, 21, 0, 0, 0, 0));
    const summerEnd = new Date(Date.UTC(currentTime.getUTCFullYear(), 8, 24, 0, 0, 0, 0));

    if (currentTime >= summerStart && currentTime < summerEnd) {
      return true;
    } else {
      return false;
    }   
  }

  makeTitleText () {

    const currentTime = new Date();
    let summerStart = new Date(Date.UTC(currentTime.getUTCFullYear(), 5, 21, 0, 0, 0, 0));

    if (currentTime > summerStart) {
      summerStart = new Date(Date.UTC(currentTime.getUTCFullYear() + 1, 5, 21, 0, 0, 0, 0));
    }

    const days = Math.ceil((summerStart.getTime() - currentTime.getTime()) / 1000 / 60 / 60 / 24);
    return days + (days == 1 ? ' day' : ' days') + ' to summer!';
  }

    
  render () {
    if (this.isSummer()){
      return null;
    }

    return ( 
      <div className={styles.component}>
        <h1 className={styles.title}>{this.makeTitleText ()}</h1>
      </div>
    ); 
  }
}

export default DaysToSummer;

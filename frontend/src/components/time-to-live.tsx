import React, { useEffect, useState } from 'react';
import Chip from '@material-ui/core/Chip';

export interface TimeToLiveProps {
  expirationTime: number;
}
const addLeadingZeros = (value: number) => {
  let stringValue = String(value);
  while (stringValue.length < 2) {
    stringValue = '0' + stringValue;
  }
  return stringValue;
};

export const TimeToLive: React.FC<TimeToLiveProps> = ({ expirationTime }) => {
  const [countDown, setCountDown] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Math.floor(Date.now() / 1000);

      const distance = expirationTime - now;

      const days = addLeadingZeros(Math.floor(distance / (60 * 60 * 24)));
      const hours = addLeadingZeros(
        Math.floor((distance % (60 * 60 * 24)) / (60 * 60))
      );
      const minutes = addLeadingZeros(Math.floor((distance % (60 * 60)) / 60));
      const seconds = addLeadingZeros(Math.floor(distance % 60));

      setCountDown(`${days} : ${hours} : ${minutes} : ${seconds}`);

      if (distance < 0) {
        setCountDown('EXPIRED');
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expirationTime]);

  return <Chip label={countDown} />;
};

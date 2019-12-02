import React, { useEffect, useState } from 'react';
import Chip from '@material-ui/core/Chip';

export interface TimeToLiveProps {
  expirationTime: number;
}

export const TimeToLive: React.FC<TimeToLiveProps> = ({ expirationTime }) => {
  const [countDown, setCountDown] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Math.floor(Date.now() / 1000);

      const distance = expirationTime - now;

      const days = Math.floor(distance / (60 * 60 * 24));
      const hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
      const minutes = Math.floor((distance % (60 * 60)) / 60);
      const seconds = Math.floor(distance % 60);

      setCountDown(`${days}d ${hours} h ${minutes} m ${seconds} s`);

      if (distance < 0) {
        setCountDown('EXPIRED');
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expirationTime]);

  return <Chip label={countDown} />;
};

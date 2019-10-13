import React, { useContext } from 'react';
import AlertContext from '../context/alerts/alertContext';

const Alert = () => {
  const alertContext = useContext(AlertContext);

  const { alert } = alertContext;

  return (
    alert && (
      <div className={`alert alert-${alert.type}`}>
        <i className="fa fa-info-circle" /> {alert.msg}
      </div>
    )
  );
};

export default Alert;

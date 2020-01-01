import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';

const Message = ({ msg, removeMessage }) => {
  const [displayStatus, setDisplayStatus] = useState(true);
  let alertType;
  if (msg.errMsg === 500) {
    alertType = 'danger';
  } else if (msg.errMsg === 400) {
    alertType = 'warning';
  } else {
    alertType = 'info';
  }

  const handleClick = () => {
    setDisplayStatus(false);
    removeMessage();
  };

  return (
    <Fragment>
      {displayStatus ? (
        <div
          className={`alert alert-${alertType} alert-dismissible fade show`}
          role="alert"
        >
          {msg.msgText}
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={handleClick}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      ) : null}
    </Fragment>
  );
};

Message.propTypes = {
  msg: PropTypes.object.isRequired
};

export default Message;

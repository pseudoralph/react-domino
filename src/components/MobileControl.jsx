import React, { useState } from 'react';
// import Draggable from 'react-beautiful-dnd';

const MobileControl = () => {
  const [isHosting, setIsHosting] = useState({
    slectionMade: false,
    hostStatus: null
  });

  const handleButtonClick = event => {
    setIsHosting({
      slectionMade: true,
      hostStatus: event.target.id
    });
  };

  return (
    <div>
      <button id="host" onClick={handleButtonClick}>
        Host
      </button>
      <button id="join" onClick={handleButtonClick}>
        Join
      </button>
      {isHosting.hostStatus ? isHosting.hostStatus : 'no slection'}
    </div>
  );
};

export default MobileControl;

import React from 'react';
import '../componentsCss/Status.css';
import StatusOption from './StatusOption';

export default function Status() {
  return (
    <div className="Status-container">
      <h2 className="Status-title">
        Status
      </h2>
      <StatusOption title="Todays Progress" />
    </div>
  );
}

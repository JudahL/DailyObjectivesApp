import React from 'react';
import Status from './Status';
import ObjectivesPanel from './ObjectivesPanel';
import '../componentsCss/Home.css';

export default function Home() {
  return (
    <React.Fragment>
      <div className="Home-status">
        <Status />
      </div>
      <div className="Home-objectives">
        <ObjectivesPanel />
      </div>
    </React.Fragment>
  );
}

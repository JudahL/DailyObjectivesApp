import React from 'react';
import '../componentsCss/Footer.css';

export default function Footer() {
  return (
    <footer className="Footer">
      <div className="Footer-container">
        <div className="Footer-column-wide">
          <div className="Footer-social">
            <div className="Footer-column">
              <a className="Footer-link" href="https://github.com/JudahL" target="_blank" rel="noopener noreferrer">
                View project on GitHub
              </a>
            </div>
          </div>
        </div>
        <div className="Footer-column-wide">
          <p className="Footer-created">
            created by judah lucas with react.js
          </p>
        </div>
      </div>
    </footer>
  );
}

import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Content from './components/Content';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import './App.css';
import './Colours.css';

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />

        {/*
          Using a route here to force component to update when
          browser location changes due to react-redux connect
          blocking updates on location change.
          (react-redux connect uses shouldComponentUpdate)
        */}
        <Route path="/" component={Content} />

        <Footer />
      </div>
    </BrowserRouter>
  );
}

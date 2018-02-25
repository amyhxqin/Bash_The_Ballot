import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import BallotForm from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<BallotForm />, document.getElementById('root'));
registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router} from "react-router-dom";
import BigCalendar from 'react-big-calendar-like-google'
import moment from 'moment'
import 'moment/locale/cs';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

ReactDOM.render(<Router><App/></Router>, document.getElementById('root'));
registerServiceWorker();

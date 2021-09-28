import logo from './logo.svg';
import Home from './Components/Home.js';
import './style/App.css';

import { BrowserRouter as Router, Route } from "react-router-dom";


function App() {
  return (
	<Router>
		<Route exact path="/" component={Home} />
	</Router>
  );
}

export default App;

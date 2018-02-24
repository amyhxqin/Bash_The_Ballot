import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Navbar extends React.Component {
  render() {
    return (
    	<div className="navbar">
		  <div className="navbar-link"> <a href="index.html">Home</a></div>
		  <div className="navbar-link"><a href="elections.html">Vote!</a></div>
		  <div className="navbar-link"><a href="contact.html">Contact us</a></div>
		  <div className="navbar-link"><a href="faq.html">FAQ</a></div>
		</div>
    	);
  }
}

class Content extends React.Component {
  render() {
    return (
    	<div className="content">
		</div>
    	);
  }
}

class Footer extends React.Component {
  render() {
    return (
    	<div className="footer">
		  <div className="footer-link"> <a href="index.html">Home</a></div>
		  <div className="footer-link"><a href="elections.html">Vote!</a></div>
		  <div className="footer-link"><a href="contact.html">Contact us</a></div>
		  <div className="footer-link"><a href="faq.html">FAQ</a></div>
		  <div className="footer-disclaimer">This project is created in the context of Hack the Valley 2. 
		  All names, events, and locations are fictionary. We reserve all rights to this project.</div>
		</div>

    	);
  }
}

class Container extends React.Component {
	render(){
		return(
			<div className="container">
				<Navbar/>,
				<Footer/>
			</div>
		);
	}
}

ReactDOM.render(
  <Container />,
  document.getElementById('root')
);
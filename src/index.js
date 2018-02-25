import React, {Component} from 'react';
import ReactDOM from "react-dom";
import { findDOMNode } from "react-dom";
import $ from "jquery";
import './index.css';
import Charts from 'react-chartjs';

//Pages without content yet:
//Candidates
//Vote!

//Pages with dummy content
//All (feel free to add/modify content)

//Sticky navigation bar with jQuery
require("jsdom").env("", function(err, window) {
    if (err) {
        console.error(err);
        return;
    }
 
    var $ = require("jquery")(window);
});

$(function(){

	var listval = $('.navbar')[0].offsetTop;   

	$(document).scroll(function() {     

		var topval = $(document).scrollTop();         
			if(topval >= listval){  
			   $('.navbar').addClass('fixed');  
			} else {  
			   $('.navbar').removeClass('fixed');  
			}  

	});  

});

//Data for the charts

const data = [

//Candidate 1
	{
		label: 'Candidate 1', //name of candidate
		value: 100, //# of votes
		color: '#FF0400' //color of portion
	},
//Candidate 2
	{
		label: 'Candidate 2', //name of candidate
		value: 200, //# of votes
		color: '#0800FF' //color of portion
	},
//Candidate 3
	{
		label: 'Candidate 3', //name of candidate
		value: 300, //# of votes
		color: '#09E02D' //color of portion
	},
//Candidate 4
	{
		label: 'Candidate 4', //name of candidate
		value: 400, //# of votes
		color: '#F80AB3' //color of portion
	}
];

//HTML for content class that varies when a navigation button is activated
//The initial value for mainContent is that of the Home page.
//After any modifications, please copy-paste this value to that of the
//function index(e).
var mainContent = (
	<div className="content">
    		<h1 align="center">Welcome to Bash the Ballot!</h1>
    		<h2 align="center">Current Number of Votes for Each Candidate</h2>
    		<div align="center">
	    		<Charts.Pie 
	    			data={data}
	    			width="300" 
	    			height="300"

	    		/>
    		</div>
    		<p align="justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
	    		Donec felis felis, fermentum aliquet dapibus sed, tempor vel dui. 
	    		Nunc turpis mauris, mattis nec volutpat sed, vulputate nec nunc.</p>
		</div>
);

//HTML for banner class
var mainBanner = (
	<div className="banner">
	<img className="banner-image" src="https://media.istockphoto.com/photos/election-vote-buttons-picture-id513643990" width ="100%"/>
	<div className="banner-text"><strong>Bash the Ballot</strong></div>
	</div>
	);
class Banner extends React.Component{
	render(){
		return mainBanner;
	}
}

class Content extends React.Component {
  render() {
    return mainContent;
  }
}


//Body of the website
class Container extends React.Component {

	//The following functions modify the content class when a corresponding navigation button is clicked.

	//Home page
	index(e) {
    e.preventDefault();
    mainContent = (
    	<div className="content">
    		<h1 align="center">Welcome to Bash the Ballot!</h1>
    		<h2 align="center">Current Number of Votes for Each Candidate</h2>
    		<div align="center">
	    		<Charts.Pie 
	    			data={data}
	    			width="300" 
	    			height="300"

	    		/>
    		</div>
    		<p align="justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
	    		Donec felis felis, fermentum aliquet dapibus sed, tempor vel dui. 
	    		Nunc turpis mauris, mattis nec volutpat sed, vulputate nec nunc.</p>
		</div>
		)


	ReactDOM.render(
  		<Container />,
  		document.getElementById('root')
	);

  	}

  	//Candidates page
  	candidates(e) {
    e.preventDefault();
    mainContent = (<div className="content">
				<h1 align="center">Candidates</h1>
		</div>)

	ReactDOM.render(
  		<Container />,
  		document.getElementById('root')
	);
	}

	//Vote! page
  	vote(e) {
    e.preventDefault();
    mainContent = (<div className="content">
				<h1 align="center">Vote!</h1>
		</div>)

	ReactDOM.render(
  		<Container />,
  		document.getElementById('root')
	);

  	}

  	//FAQ page
	faq(e) {
    e.preventDefault();
    mainContent = (<div className="content">
				<h1 align="center">FAQ</h1>
	    		<p><strong>Q: Donec a velit eget lectus pretium imperdiet vel eu justo?</strong></p>
				<p>A: Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
	    		Donec felis felis, fermentum aliquet dapibus sed, tempor vel dui. 
	    		Nunc turpis mauris, mattis nec volutpat sed, vulputate nec nunc.</p>
	    		<p><strong>Q: Donec a velit eget lectus pretium imperdiet vel eu justo?</strong></p>
				<p>A: Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
	    		Donec felis felis, fermentum aliquet dapibus sed, tempor vel dui. 
	    		Nunc turpis mauris, mattis nec volutpat sed, vulputate nec nunc.</p>
	    		<p><strong>Q: Donec a velit eget lectus pretium imperdiet vel eu justo?</strong></p>
				<p>A: Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
	    		Donec felis felis, fermentum aliquet dapibus sed, tempor vel dui. 
	    		Nunc turpis mauris, mattis nec volutpat sed, vulputate nec nunc.</p>
	    		<p><strong>Q: Donec a velit eget lectus pretium imperdiet vel eu justo?</strong></p>
				<p>A: Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
	    		Donec felis felis, fermentum aliquet dapibus sed, tempor vel dui. 
	    		Nunc turpis mauris, mattis nec volutpat sed, vulputate nec nunc.</p>
	    		<p><strong>Q: Donec a velit eget lectus pretium imperdiet vel eu justo?</strong></p>
				<p>A: Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
	    		Donec felis felis, fermentum aliquet dapibus sed, tempor vel dui. 
	    		Nunc turpis mauris, mattis nec volutpat sed, vulputate nec nunc.</p>
	    		<p><strong>Q: Donec a velit eget lectus pretium imperdiet vel eu justo?</strong></p>
				<p>A: Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
	    		Donec felis felis, fermentum aliquet dapibus sed, tempor vel dui. 
	    		Nunc turpis mauris, mattis nec volutpat sed, vulputate nec nunc.</p>
	    		<p><strong>Q: Donec a velit eget lectus pretium imperdiet vel eu justo?</strong></p>
				<p>A: Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
	    		Donec felis felis, fermentum aliquet dapibus sed, tempor vel dui. 
	    		Nunc turpis mauris, mattis nec volutpat sed, vulputate nec nunc.</p>
	    		<p><strong>Q: Donec a velit eget lectus pretium imperdiet vel eu justo?</strong></p>
				<p>A: Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
	    		Donec felis felis, fermentum aliquet dapibus sed, tempor vel dui. 
	    		Nunc turpis mauris, mattis nec volutpat sed, vulputate nec nunc.</p>
	    		<p><strong>Q: Donec a velit eget lectus pretium imperdiet vel eu justo?</strong></p>
				<p>A: Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
	    		Donec felis felis, fermentum aliquet dapibus sed, tempor vel dui. 
	    		Nunc turpis mauris, mattis nec volutpat sed, vulputate nec nunc.</p>
	    		<p><strong>Q: Donec a velit eget lectus pretium imperdiet vel eu justo?</strong></p>
				<p>A: Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
	    		Donec felis felis, fermentum aliquet dapibus sed, tempor vel dui. 
	    		Nunc turpis mauris, mattis nec volutpat sed, vulputate nec nunc.</p>
	    		<p><strong>Q: Donec a velit eget lectus pretium imperdiet vel eu justo?</strong></p>
				<p>A: Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
	    		Donec felis felis, fermentum aliquet dapibus sed, tempor vel dui. 
	    		Nunc turpis mauris, mattis nec volutpat sed, vulputate nec nunc.</p>
	    		<p><strong>Q: Donec a velit eget lectus pretium imperdiet vel eu justo?</strong></p>
				<p>A: Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
	    		Donec felis felis, fermentum aliquet dapibus sed, tempor vel dui. 
	    		Nunc turpis mauris, mattis nec volutpat sed, vulputate nec nunc.</p>
	    		<p><strong>Q: Donec a velit eget lectus pretium imperdiet vel eu justo?</strong></p>
				<p>A: Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
	    		Donec felis felis, fermentum aliquet dapibus sed, tempor vel dui. 
	    		Nunc turpis mauris, mattis nec volutpat sed, vulputate nec nunc.</p>
	    		<p><strong>Q: Donec a velit eget lectus pretium imperdiet vel eu justo?</strong></p>
				<p>A: Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
	    		Donec felis felis, fermentum aliquet dapibus sed, tempor vel dui. 
	    		Nunc turpis mauris, mattis nec volutpat sed, vulputate nec nunc.</p>
	    		<p><strong>Q: Donec a velit eget lectus pretium imperdiet vel eu justo?</strong></p>
				<p>A: Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
	    		Donec felis felis, fermentum aliquet dapibus sed, tempor vel dui. 
	    		Nunc turpis mauris, mattis nec volutpat sed, vulputate nec nunc.</p>
	    		<p><strong>Q: Donec a velit eget lectus pretium imperdiet vel eu justo?</strong></p>
				<p>A: Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
	    		Donec felis felis, fermentum aliquet dapibus sed, tempor vel dui. 
	    		Nunc turpis mauris, mattis nec volutpat sed, vulputate nec nunc.</p>
	    		<h2 align="center">More questions? Contact us at bashtheballot@gmail.com</h2>
		</div>)

	ReactDOM.render(
  		<Container />,
  		document.getElementById('root')
	);
	}

	//Structure of the whole page
	render(){
		return(
			<div className="wrap">
			<div className="container">
				<Banner/>
				<div className="navbar">
		  		<button className="navbar-link" onClick={this.index}>Home</button>
		  	   <button className="navbar-link" onClick={this.candidates}>Candidates</button>
			   <button className="navbar-link" onClick={this.vote}>Vote!</button>
			   <button className="navbar-link" onClick={this.faq}>FAQ</button>
			   </div>
			    <Content/>
			   <div className="footer">
					  <div className="footer-disclaimer">
					  <p>This is project is not built for commercial purposes. All images belong to their rightful authors. All names, events, and locations are fictionary.</p> 
					  <p>All rights reserved. 2018 ©</p></div>
			  </div>
			</div>
			</div>
		);


	}
}

//Render the whole page
ReactDOM.render(
  <Container />,
  document.getElementById('root')
);
import React, {Component} from 'react';
import ReactDOM from "react-dom";
import { findDOMNode } from "react-dom";
import $ from "jquery";
import './index.css';
import RC2 from 'react-chartjs2';
import { BrowserRouter } from 'react-router-dom';
import goose1 from './goose1.png';
import goose2 from './goose2.png';
import bird3 from './bird3.png';
import bird4 from './bird4.png';
import Charts from 'react-chartjs';

//Pages without content yet:
//Candidates
//Vote!

//Pages with dummy content
//All (feel free to add/modify content)

//IMPORTANT: to run the code, please make sure you have react-chartjs installed
//Link: https://github.com/reactjs/react-chartjs

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

var data = [

//Candidate 1 = mr waterloo goose
	{
		label: 'Mr Goose, Waterloo', //name of candidate
		value: 100, //# of votes
		color: '#A3D6F1' //color of portion
	},
//Candidate 2 = mr toronto goose
	{
		label: 'Mr Goose, Toronto', //name of candidate
		value: 200, //# of votes
		color: '#D7BDE2' //color of portion
	},
//Candidate 3
	{
		label: 'Sir Snow Bunting', //name of candidate
		value: 300, //# of votes
		color: '#A3E4D7' //color of portion
	},
//Candidate 4
	{
		label: 'Mrs Bullfinch', //name of candidate
		value: 400, //# of votes
		color: '#FAD7A0' //color of portion
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
	<img className="banner-image" src="https://www.canada.ca/content/canadasite/en/services/culture/cultural-attractions/attractions-canada-capital/parliament-hill/_jcr_content/par/adaptiveimage/image.img.jpg/1512936160913.jpg" width ="100%"/>
	<div className="banner-text">Elections Birdtown</div>
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

	constructor(props) {
		super(props);
		this.state = {items: [{"firstName": "Mr Goose", "lastName": "Waterloo", "totalVotes": 1}, 
					{"firstName": "Mr Goose", "lastName": "Toronto", "totalVotes": 1},
					{"firstName": "Sir Snow", "lastName": "Bunting", "totalVotes": 1},
					{"firstName": "Mrs", "lastName": "Bullfinch", "totalVotes": 1}, 
	]};}


	//The following functions modify the content class when a corresponding navigation button is clicked.
	
	componentDidUpdate() {
		fetch('/count')
		.then(res => res.json())
		.then(items => this.setState({ items }));
		data[0].value = this.state.items[0].totalVotes;
		data[1].value = this.state.items[1].totalVotes;
		data[2].value = this.state.items[2].totalVotes;
		data[3].value = this.state.items[3].totalVotes;
	}
	
	//Home page
	index(e) {
    e.preventDefault();
    mainContent = (
    	<div className="content">
    		<h1 align="center">Welcome to Elections Birdtown!</h1>
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


  	vote(e) {

		const url = '/vote'; //insert here later
		window.open(url, '_blank');
  	}

  	candidates(e) {
    e.preventDefault();
    mainContent = (<div className="content">
				<h1 align="center">Candidates</h1>
	    		<div className = "candidateA">
				<img src={goose1} width ="200px"/>
				<h2> Mr Goose, Waterloo </h2>
				<p>Few words explaining ideals of mr goose 
					akjfhkajdhf akjsdhafksjd akjsdfLorem ipsum dolor sit amet, consectetur adipiscing elit. 
				Donec felis felis, fermentum aliquet dapibus sed, tempor vel dui. 
				Nunc turpis mauris, mattis nec volutpat sed, vulputate nec nunc. 
				Fusce eros t</p>
	    		</div>
				<div className ="candidateB">
				<img src={goose2} width ="200px"/>
				<h2> Mr Goose, Toronto </h2>
				<p>Few words explaining ideals of mr goose o.f. toronto Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
				Donec felis felis, fermentum aliquet dapibus sed, tempor vel dui. 
				Nunc turpis mauris, mattis nec volutpat sed, vulputate nec nunc. 
				Fusce eros t</p>
			</div>
			<div className ="candidateC">
				<img src={bird3} width ="200px"/>
				<h2> Sir Snow Bunting </h2>
				<p>Few words explaining ideals of mr goose from McMaster Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
				Donec felis felis, fermentum aliquet dapibus sed, tempor vel dui. 
				Nunc turpis mauris, mattis nec volutpat sed, vulputate nec nunc. 
				Fusce eros t</p>
			</div> 
	    		<div className ="candidateD">
				<img src={bird4} width ="200px"/>
				<h2> Mrs Bullfinch </h2>
				<p>Few words explaining ideals of mr goose from McMaster Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
				Donec felis felis, fermentum aliquet dapibus sed, tempor vel dui. 
				Nunc turpis mauris, mattis nec volutpat sed, vulputate nec nunc. 
				Fusce eros t</p>
			</div> 
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
				<p>A: Lorem ipsum dolor sit amet, consectetur adipiscing :wq
	    elit. 
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

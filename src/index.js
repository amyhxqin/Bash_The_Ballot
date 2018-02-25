import React from 'react';
import ReactDOM from "react-dom";
import { findDOMNode } from "react-dom";
import $ from "jquery";
import './index.css';
import RC2 from 'react-chartjs2';
import { BrowserRouter } from 'react-router-dom';
import goose1 from './goose1.png';
import goose2 from './goose2.png';
//import goose3 from './goose3.png'
;
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


var mainContent = (
	<div className="content">
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
	    		Donec felis felis, fermentum aliquet dapibus sed, tempor vel dui. 
	    		Nunc turpis mauris, mattis nec volutpat sed, vulputate nec nunc. 
	    		Fusce eros turpis, scelerisque non augue sit amet, bibendum elementum neque. 
	    		Suspendisse fermentum odio sit amet porta posuere. Nam suscipit vel tortor sit amet pulvinar. 
	    		Donec id arcu vulputate, cursus velit sed, finibus enim. 
	    		Vestibulum sed facilisis quam, ut rhoncus justo. Donec a velit eget lectus pretium imperdiet vel eu justo. 
	    		Maecenas turpis enim, pulvinar eget bibendum in, mattis eget leo. Proin efficitur rhoncus odio quis rutrum. </p>
	</div>
);

var mainBanner = (
	<div className="banner">
	<img className="banner-image" src="https://www.canada.ca/content/canadasite/en/services/culture/cultural-attractions/attractions-canada-capital/parliament-hill/_jcr_content/par/adaptiveimage/image.img.jpg/1512936160913.jpg" width ="100%"/>
	<div className="banner-text">Elections Waterloo</div>
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

class Container extends React.Component {

	index(e) {
    e.preventDefault();
    mainContent = (<div className="content">
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
	    		Donec felis felis, fermentum aliquet dapibus sed, tempor vel dui. 
	    		Nunc turpis mauris, mattis nec volutpat sed, vulputate nec nunc. 
	    		Fusce eros turpis, scelerisque non augue sit amet, bibendum elementum neque. 
	    		Suspendisse fermentum odio sit amet porta posuere. Nam suscipit vel tortor sit amet pulvinar. 
	    		Donec id arcu vulputate, cursus velit sed, finibus enim. 
	    		Vestibulum sed facilisis quam, ut rhoncus justo. Donec a velit eget lectus pretium imperdiet vel eu justo. 
	    		Maecenas turpis enim, pulvinar eget bibendum in, mattis eget leo. Proin efficitur rhoncus odio quis rutrum. </p>
		</div>)


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
			<h2> Mr. Goose, Waterloo </h2>
	    		<p>Few words explaining ideals of mr goose 
	    			akjfhkajdhf akjsdhafksjd akjsdfLorem ipsum dolor sit amet, consectetur adipiscing elit. 
	    		Donec felis felis, fermentum aliquet dapibus sed, tempor vel dui. 
	    		Nunc turpis mauris, mattis nec volutpat sed, vulputate nec nunc. 
	    		Fusce eros t</p>
	    		</div>
	    		<div className ="candidateB">
	    		<img src={goose2} width ="200px"/>
			<h2> Mr. Goose, Toronto </h2>
	    		<p>Few words explaining ideals of mr goose o.f. toronto Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
	    		Donec felis felis, fermentum aliquet dapibus sed, tempor vel dui. 
	    		Nunc turpis mauris, mattis nec volutpat sed, vulputate nec nunc. 
	    		Fusce eros t</p>
			</div>
	    /*
			<div className ="candidateC">
	    		<img src={goose3} width ="200px"/>
			<h2> Mr. Goose, McMaster </h2>
	    		<p>Few words explaining ideals of mr goose from McMaster Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
	    		Donec felis felis, fermentum aliquet dapibus sed, tempor vel dui. 
	    		Nunc turpis mauris, mattis nec volutpat sed, vulputate nec nunc. 
	    		Fusce eros t</p>
			</div> */
    </div>)

	ReactDOM.render(
  		<Container />,
  		document.getElementById('root')
	);
	}

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

ReactDOM.render(
  <Container />,
  document.getElementById('root')
);

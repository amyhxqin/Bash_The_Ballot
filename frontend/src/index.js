import { Router, Route } from 'react-router';
import React, { Component } from 'react';
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
import request from "../node_modules/superagent/superagent";
import { Connect, SimpleSigner } from 'uport-connect'
import { QRUtil } from 'uport-connect'
import NewWindow from 'react-new-window'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

//import BallotForm from './ballot-form/src/App.js';

//IMPORTANT: to run the code, please make sure you have the following installed
//Link: https://github.com/reactjs/react-chartjs
//Link: https://github.com/rmariuzzo/react-new-window


$(function () {

	var listval = $('.navbar')[0].offsetTop;

	$(document).scroll(function () {

		var topval = $(document).scrollTop();
		if (topval >= listval) {
			$('.navbar').addClass('fixed');
		} else {
			$('.navbar').removeClass('fixed');
		}

	});

});


var data = [

	//Candidate 1 = mr waterloo goose
	{
		label: 'Mr Goose, Waterloo', //name of candidate
		value: 1, //# of votes
		color: '#A3D6F1' //color of portion
	},
	//Candidate 2 = mr toronto goose
	{
		label: 'Mr Goose, Toronto', //name of candidate
		value: 1, //# of votes
		color: '#D7BDE2' //color of portion
	},
	//Candidate 3
	{
		label: 'Sir Snow Bunting', //name of candidate
		value: 1, //# of votes
		color: '#A3E4D7' //color of portion
	},
	//Candidate 4
	{
		label: 'Mrs Bullfinch', //name of candidate
		value: 1, //# of votes
		color: '#FAD7A0' //color of portion
	}
];

//HTML for content class that varies when a navigation button is activated
//The initial value for mainContent is that of the Home page.
//After any modifications, please copy-paste this value to that of the
//function index(e).

var mainContent = (
	<div className="content">
		<h1 align="center">Welcome to Elections Birdtown!</h1>
		<p align="justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
			Donec felis felis, fermentum aliquet dapibus sed, tempor vel dui.
	    		Nunc turpis mauris, mattis nec volutpat sed, vulputate nec nunc.</p>
	</div>
);


//<h2 align="center">Current Number of Votes for Each Candidate</h2>
//<div align="center">
//<Charts.Pie 
//data={data}
//width="300" 
//height="300"

///>
//</div>

//HTML for banner class
var mainBanner = (
	<div className="banner">
		<img className="banner-image" src="https://www.canada.ca/content/canadasite/en/services/culture/cultural-attractions/attractions-canada-capital/parliament-hill/_jcr_content/par/adaptiveimage/image.img.jpg/1512936160913.jpg" width="100%" />
		<div className="banner-text">Elections Birdtown</div>
	</div>
);
class Banner extends React.Component {
	render() {
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
		this.state = { items: data };
		this.reloadGraphData = this.reloadGraphData.bind(this);
		this.vote = this.vote.bind(this);
		this.index = this.index.bind(this);
	}

	componentDidMount() {
		this.reloadGraphData();
	}

	reloadGraphData() {
		fetch('/count')
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				this.setState({ items: res });
				data[0].value = this.state.items[0].totalVotes;
				data[1].value = this.state.items[1].totalVotes;
				data[2].value = this.state.items[2].totalVotes;
				data[3].value = this.state.items[3].totalVotes;
				this.setState({ data: data });

				mainContent = (
					<div className="content">
						<h1 align="center">Welcome to Elections Birdtown!</h1>
						<h2 align="center">Number of Votes for Each Candidate</h2>
						<div align="center">
							<Charts.Pie
								data={this.state.data}
								width="300"
								height="300"

							/>
						</div>
						<p align="justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
							Donec felis felis, fermentum aliquet dapibus sed, tempor vel dui.
						Nunc turpis mauris, mattis nec volutpat sed, vulputate nec nunc.</p>
					</div>
				);
				this.forceUpdate();
			})
	}

	componentWillUnmount() {
		mainContent = (
			<div className="content">
				<h1 align="center">Welcome to Elections Birdtown!</h1>
				<p align="justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					Donec felis felis, fermentum aliquet dapibus sed, tempor vel dui.
					Nunc turpis mauris, mattis nec volutpat sed, vulputate nec nunc.</p>
			</div>
		);
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
		this.reloadGraphData();


		ReactDOM.render(
			<Container />,
			document.getElementById('root')
		);

	}
	vote(e) {
		e.preventDefault();
		//const url ='bash-the-ballot.azurewebsites.net/vote';
		//const url = 'localhost:3000/vote';
		//window.open(url, '_blank');

		const uport = new Connect('My Dashboard', {
			clientId: '2opbeBTfzsso2PtiHFhV7DhjhCZsDCQrGfx',
			network: 'rinkeby',
			signer: SimpleSigner('5f3516cc526f7e33a2a95245564d04ba478e4551f83177791bc49739d786f742')
		})

		class Name extends React.Component {
			render() {
				return (
					<div className="Name" >
						<div class="col-md-12">{this.props.name}</div>
					</div>
				);
			}
		}

		function createMarkup(text) {
			return { __html: text };
		}

		class BallotForm extends React.Component {
			constructor(props) {
				super(props);
				this.state = { selectedOption: '', items: [{ id: '', firstName: '', lastName: '' }, { id: '', firstName: '', lastName: '' }, { id: '', firstName: '', lastName: '' }, { id: '', firstName: '', lastName: '' }] };

				this.handleOptionChange = this.handleOptionChange.bind(this);
				this.handleOptionSubmit = this.handleOptionSubmit.bind(this);
				this.back = this.back.bind(this);
			}

			//http://bash-the-ballot.azurewebsites.net/candidates		
			// componentDidMount() {
			// 	fetch('/candidates') 
			// 	    .then(function(res){
			// 	        //this.setState({ items: JSON.stringify(res)});
			// 	        alert(JSON.stringify(res));
			// 	    }
			// 	   ).catch(function(error){
			// 	   		alert(error);
			// 	   });
			//   	}
			componentWillMount() {
				fetch('/candidates')
					.then(res => res.json())
					.then(items => this.setState({ items }));
			}


			handleOptionChange(event) {
				this.setState({ selectedOption: event.target.value });
			}

			handleOptionSubmit(event) {

				if (this.state.selectedOption == '') { return; }
				else if (this.state.selectedOption == this.state.items[0].lastName) { var candidate = this.state.items[0].id; }
				else if (this.state.selectedOption == this.state.items[1].lastName) { var candidate = this.state.items[1].id; }
				else if (this.state.selectedOption == this.state.items[2].lastName) { var candidate = this.state.items[2].id; }
				else if (this.state.selectedOption == this.state.items[3].lastName) { var candidate = this.state.items[3].id; }
				else { return; }

				var cred, add;
				uport.requestAddress().then((address) => {
					add = address;
					request
						.post('/vote')
						.set('Content-Type', 'application/x-www-form-urlencoded')
						.send({
							first: "Null",
							last: "Null",
							phone: "Null",
							location: "Null",
							submitted: 1,
							address: add,
							candidate: candidate
						})
						.end(function (err, res) {
						});

				})
			}


			//Ballot exit button

			back(e) {
				e.preventDefault();
				const container = Container;
				container.set
				this.props.reloadGraphData();
				ReactDOM.render(
					<Container />,
					document.getElementById('root')
				);
			}

			//<div dangerouslySetInnerHTML={createMarkup(this.state.items[0].firstName)} />

			render() {
				const title = 'BALLOT';

				return (
						<div className="ballot-container">
							<div className="title">{title}</div>
							<form onSubmit={this.handleSubmit}>
								<div className="row vertical-center">
									<Name name={this.state.items[0].firstName + ' ' + this.state.items[0].lastName} />
									<input class="col-md-2" type="radio" value={this.state.items[0].lastName}
										checked={this.state.selectedOption === this.state.items[0].lastName}
										onChange={this.handleOptionChange} />
								</div>
								<div className="row vertical-center">
									<Name name={this.state.items[1].firstName + ' ' + this.state.items[1].lastName} />
									<input class="col-md-2" type="radio" value={this.state.items[1].lastName}
										checked={this.state.selectedOption === this.state.items[1].lastName}
										onChange={this.handleOptionChange} />
								</div>
								<div className="row vertical-center">
									<Name name={this.state.items[2].firstName + ' ' + this.state.items[2].lastName} />
									<input class="col-md-2" type="radio" value={this.state.items[2].lastName}
										checked={this.state.selectedOption === this.state.items[2].lastName}
										onChange={this.handleOptionChange} />
								</div>
								<div className="row vertical-center">
									<Name name={this.state.items[3].firstName + ' ' + this.state.items[3].lastName} />
									<input class="col-md-2" type="radio" value={this.state.items[3].lastName}
										checked={this.state.selectedOption === this.state.items[3].lastName}
										onChange={this.handleOptionChange} />
								</div>
							</form>
							<div class="text-center">
								<button className="ballot-back btn btn-warning" onClick={this.back}>Exit</button>
								<button className="submit-btn btn btn-success" type="submit" onClick={this.handleOptionSubmit}>Submit</button>
							</div>
						</div>
				);
			}
		}

		mainContent = (
			<div className="content">
				<BallotForm reloadGraphData = {this.reloadGraphData}/>
			</div>
		);

		ReactDOM.render(
			<Container />,
			document.getElementById('root')
		);
	}

	candidates(e) {
		e.preventDefault();
		mainContent = (<div className="content">
			<h1 align="center">Candidates</h1>
			<div className="candidateA">
				<img src={goose1} width="200px" />
				<h2> Mr Goose, Waterloo </h2>
				<p>Honk Honk Honk! Mr Goose, from Waterloo, is here to answer all your prayers! Upset over the broken
					promises of politicans? Angry that nothing ever seems to be done? Furious that nobody ever listens?
					When you vote for Mr Goose, you're voting for change! For an innovative tomorrow!
					akjfhkajdhf akjsdhafksjd akjsdfLorem ipsum dolor sit amet, consectetur adipiscing elit.
	    Donec felis felis, fermentum aliquet dapibus sed, tempor vel dui.
				</p>
			</div>
			<div className="candidateB">
				<img src={goose2} width="200px" />
				<h2> Mr Goose, Toronto </h2>
				<p>You may be wondering why Mr Goose Toronto rarely shows his face in public, but that's because he's busy taking care of his little gooselings at home! Vote for Mr Goose Toronto and perhaps he will bless the public with pictures of his cute children.
				Few words explaining ideals of mr goose toronto Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				Donec felis felis, fermentum aliquet dapibus sed, tempor vel dui.
				</p>
			</div>
			<div className="candidateC">
				<img src={bird3} width="200px" />
				<h2> Sir Snow Bunting </h2>
				<p>Oh no! There's no more snow already? This must be the result of global warming! Vote for your Sir Snow Bunting, your local green candidate to ensure a
					brighter, more prosperous, and more eco-friendly future! He's always down to re-use, reduce and recycle! As a dedicated friend to nature,
					Sir Snow Bunting plants 10000 trees per year, and is a proud supporter of Birdtown's MeWithTrees! trees rocks water water etc.
				</p>
			</div>
			<div className="candidateD">
				<img src={bird4} width="200px" />
				<h2> Mrs Eurasian Bullfinch </h2>
				<p>Cheep cheep! Few words explaining ideals of mrs eurasian bullfinch, family values, etc Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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
	/*
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
	*/
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
	render() {
		return (
			<div className="wrap">
				<div className="container">
					<Banner />
					<div className="navbar">
						<button className="navbar-link" onClick={this.index}>Home</button>
						<button className="navbar-link" onClick={this.candidates}>Candidates</button>
						<button className="navbar-link" onClick={this.vote}>Vote!</button>
						<button className="navbar-link" onClick={this.faq}>FAQ</button>
					</div>
					<Content />
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

import request from "../node_modules/superagent/superagent";
import { Connect, SimpleSigner } from 'uport-connect'
import { QRUtil } from 'uport-connect'
import React from 'react';
import ReactDOM from 'react-dom';
import style from './App.css';

const uport = new Connect('My Dashboard', {
	     clientId: '2opbeBTfzsso2PtiHFhV7DhjhCZsDCQrGfx',
	     network: 'rinkeby',
	     signer: SimpleSigner('5f3516cc526f7e33a2a95245564d04ba478e4551f83177791bc49739d786f742')
	   })

class Name extends React.Component {
  render() {
    return (
      <div className="Name">
         <div>{this.props.name}</div>
      </div>
    );
  }
}

function createMarkup(text) {
  		return {__html: text};
		}

class BallotForm extends React.Component {
	  constructor(props) {
		      super(props);
		      this.state = {selectedOption: '', items: [{id:'',firstName:'',lastName:''},{id:'',firstName:'',lastName:''},{id:'',firstName:'',lastName:''},{id:'',firstName:'',lastName:''}]};

		      this.handleOptionChange = this.handleOptionChange.bind(this);
		      this.handleOptionSubmit = this.handleOptionSubmit.bind(this);
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
		      this.setState({selectedOption: event.target.value});
		    }

	  handleOptionSubmit(event) { 
	  		
	  		if (this.state.selectedOption == ''){return;}
	  		else if(this.state.selectedOption == 'option1') {var candidate = this.state.items[0].id;}
	  		else if(this.state.selectedOption == 'option2') {var candidate = this.state.items[1].id;}
	  		else if(this.state.selectedOption == 'option3') {var candidate = this.state.items[2].id;}
	  		else if(this.state.selectedOption == 'option4') {var candidate = this.state.items[3].id;}
	  		else {return;}

		  var cred, add;
		  uport.requestAddress().then((address) => {
		  	add = address;
			  request
		         .post('http://bash-the-ballot.azurewebsites.net/vote')
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
		         .end(function(err, res){
		    });

		  })
	  }	

	  

//<div dangerouslySetInnerHTML={createMarkup(this.state.items[0].firstName)} />

	  render() {
		      const title = 'BALLOT';

		      return (
			            <div className = "container">
				<div className = "title">{title}</div>
			      <form onSubmit={this.handleSubmit}>
			             <div className = "radio">
				          <Name name={this.state.items[0].firstName +' '+ this.state.items[0].lastName}/>
			              <input type="radio" value="option1" 
			                checked={this.state.selectedOption === 'option1'}             
			                onChange={this.handleOptionChange} />
			            </div>
			            <div className = "radio">
				          <Name name={this.state.items[1].firstName +' '+ this.state.items[1].lastName}/>
			              <input type="radio" value="option2" 
			                checked={this.state.selectedOption === 'option2'}             
			                onChange={this.handleOptionChange} />
			            </div>
			              <div className = "radio">
				          <Name name={this.state.items[2].firstName +' '+ this.state.items[2].lastName}/>
			                <input type="radio" value="option3" 
			                checked={this.state.selectedOption === 'option3'}             
			                onChange={this.handleOptionChange} />
			            </div>
			              <div className = "radio">
				          <Name name={this.state.items[3].firstName +' '+ this.state.items[3].lastName}/>
			                <input type="radio" value="option4" 
			                checked={this.state.selectedOption === 'option4'}             
			                onChange={this.handleOptionChange} />
			            </div>
			            </form>
			            <button className="submit-btn" type="submit" onClick = {this.handleOptionSubmit}>Submit</button>
			            </div>
			          );
		    }
}

//export default App;
export default BallotForm;

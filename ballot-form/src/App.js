import request from "../node_modules/superagent/superagent";
import { Connect, SimpleSigner } from 'uport-connect'
import { QRUtil } from 'uport-connect'
import React from 'react';
import ReactDOM from 'react-dom';

const uport = new Connect('My Dashboard', {
	     clientId: '2opbeBTfzsso2PtiHFhV7DhjhCZsDCQrGfx',
	     network: 'rinkeby',
	     signer: SimpleSigner('5f3516cc526f7e33a2a95245564d04ba478e4551f83177791bc49739d786f742')
	   })


class BallotForm extends React.Component {
	  constructor(props) {
		      super(props);
		      this.state = {selectedOption: ''};

		      this.handleOptionChange = this.handleOptionChange.bind(this);
		      this.handleOptionSubmit = this.handleOptionSubmit.bind(this);
		    }

	  handleOptionChange(event) {
		      this.setState({selectedOption: event.target.value});
		    }

	  handleOptionSubmit(event) { 
		  var cred, add;
		  uport.requestAddress().then((address) => {
		  	add = address;
			  request
		         .post('http://localhost:1337/vote')
		         .set('Content-Type', 'application/x-www-form-urlencoded')
		         .send({ 
				 address: add,
				 candidate: this.state.selectedOption
			 })
		         .end(function(err, res){
		    });

		  })
	  }	
	  render() {
		      const title = 'BALLOT';
		      var apiFetch =    


		      return (
			            <div className = "container">
				<div className = "title">{title}</div>
			      <form onSubmit={this.handleSubmit}>
			             <div className = "radio">
			               AKsjkjfhadsff inser
			              <input type="radio" value="option1" 
			                checked={this.state.selectedOption === 'option1'}             
			                onChange={this.handleOptionChange} />
			            </div>
			            <div className = "radio">
			               Name 2
			              <input type="radio" value="option2" 
			                checked={this.state.selectedOption === 'option2'}             
			                onChange={this.handleOptionChange} />
			            </div>
			              <div className = "radio">
			               aljdfhadskjf skjd
			                <input type="radio" value="option3" 
			                checked={this.state.selectedOption === 'option3'}             
			                onChange={this.handleOptionChange} />
			            </div>
			              <div className = "radio">
			                Rip akjfhja
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

export default BallotForm;

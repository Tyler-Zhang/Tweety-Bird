/** React Imports */
import React from 'react';
import ReactDOM from 'react-dom';

/** Other components */
import Input from 'input';
import Results from 'results';
import {analyze as analyzeAPI} from "api";


class App extends React.Component{
    constructor(){
        super();

        this.state = {
            response: false,
            responseData: null,
            queriedWord: null
        }
    }

    query(word){
        analyzeAPI(word).then(d => {
            const state = this.state;
            state.response = true;
            state.responseData = d;
            state.queriedWord = word;

            this.setState(state);
        }).catch(e => {
            console.error(e);
            alert("An error has occurred");
        })
    }

    render(){
        if(! this.state.response){
            return(
                <div class="container-fluid">
                    <div class="row">
                        <Input query={this.query.bind(this)}/>
                    </div>
                </div>
            )
        } else {
            return(
                <div class="container-fluid">
                    <div class="row">
                        <h1> Results for {this.state.queriedWord}</h1>
                    </div>
                    <div class="row">
                        <Results data={this.state.responseData}/>
                    </div>
                </div>
            )
        }
    }    
}

ReactDOM.render(<App/>, document.getElementById("root"));

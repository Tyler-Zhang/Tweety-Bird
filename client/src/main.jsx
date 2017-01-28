/** React Imports */
import React from 'react';
import ReactDOM from 'react-dom';

/** Other components */
import Input from 'input';


class App extends React.Component{
    constructor(){
        super();

        this.state = {
            response: false,
            responseData: null
        }
    }

    query(word){
        console.log(word);
    }

    render(){
        return(
            <div class="container-fluid">
                <div class="row">
                    <Input query={this.query.bind(this)}/>
                </div>
            </div>
        )
    }

    
}

ReactDOM.render(<App/>, document.getElementById("root"));

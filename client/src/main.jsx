/** React Imports */
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component{
    render(){
        return (
            <div class="container-fluid" style={{width: "100%", height: "100%"}}>
                <h1 style={{margin: "100px"}}> Enter a topic below:</h1>
                <div class="col-md-8 col-md-offset-2">
                </div>
            </div>
        )
    }
}

reactDOM.render(<App/>, document.getElementById("root"));
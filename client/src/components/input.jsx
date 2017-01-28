import React from "react";

export default class Input extends React.Component{
    
    submit(){
        let input = document.getElementById("inputText");
        let text = input.value;

        this.props.query(text);
    }

    render(){
        return (
            <div class="container-fluid" style={{width: "100%", height: "100%"}}>
                <h1 style={{margin: "100px"}}> Enter a topic below:</h1>
                <div class="col-md-8 col-md-offset-2 form-group">
                    <input id="inputText" class="form-control" type="text" placeholder="abortion"/>
                    <button class="btn btn-success center-block" onClick={() => this.submit()}> Analyze </button>
                </div>
            </div>
        )
    }
}
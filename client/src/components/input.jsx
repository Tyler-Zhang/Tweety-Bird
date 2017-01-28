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

                <h1 id="prompt">     ENTER A TOPIC BELOW:
                </h1>

                <div id="form" class="col-md-8 col-md-offset-2 form-group">

                    <input id="inputText" class="form-control" type="text" placeholder="e.g. abortion"/>

                    <button id="btnAnalyze" class="btn center-block" onClick={() => this.submit()}>
                        Analyze
                    </button>

                </div>

            </div>
        )
    }
}
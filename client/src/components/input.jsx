import React from "react";

export default class Input extends React.Component{
    
    constructor(){
        super()
        this.clicked = false;
    }
    submit(){
        if(this.clicked)
            return;
        let input = document.getElementById("inputText");
        let text = input.value;
        this.clicked = true;
        this.props.query(text);
    }

    keyListener(event){
        if(event.keyCode == 13){
            this.submit();
        }
    }

    render(){
        return (
            <div class="container-fluid" style={{width: "100%", height: "100%"}}>

                <h1 id="prompt">ENTER A <div id="topicSpan">TOPIC</div> BELOW:</h1>

                <div id="form" class="col-md-8 col-md-offset-2 form-group">

                    <input id="inputText" class="form-control" type="text" placeholder="e.g. elections" onKeyUp={this.keyListener.bind(this)}/>

                    <button id="btnAnalyze" class="btn center-block" onClick={() => this.submit()}>
                        Analyze
                    </button>

                </div>

            </div>
        )
    }
}
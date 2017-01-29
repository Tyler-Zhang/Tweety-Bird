import React from "react";

class TweetBox extends React.Component{

    /** Props: data: Tweet, gender, retweets, agree, showTweet function */
    render(){
        let color;
        if(this.props.gender == "male"){
            color = "#68a4cc"; //a type of blue
        } else color = "#dd71cd";  //a type of pink

        return(
            <div id="retweetCircles" style={{"backgroundColor": color}} onMouseOver={this.props.showTweet}>
                <span id="retweetNums">{this.props.retweets}</span>
            </div>
        )
    }
}

export default class TweetView extends React.Component{
    constructor(props){
        super();

        let positiveTweets = [];
        let negativeTweets = [];

        for(let x = 0; x < props.tweets.length; x ++){
            let currentTweet = props.tweets[x];
            if(currentTweet.level > 0.5)
                positiveTweets.push(currentTweet);
            else
                negativeTweets.push(currentTweet);
        }

        this.state = {
            positiveTweets,
            negativeTweets,
            currentTweet: null
        }
        console.log(this.state);
    }

    showTweet(tweet){
        const state = this.state;
        state.currentTweet = tweet;
        this.setState(state);
    }

    renderTweet(tweets){
        return tweets.map((t, i) => {
            return <TweetBox key={i} gender={t.gender} retweets={t.retweets} showTweet={() => this.showTweet(t)}/>
        });
    }

    renderCurrentTweet(){
        let currentTweet = this.state.currentTweet;
        if(currentTweet == null)
            return <div/>;
        else{
            let color;
            if(currentTweet.gender == "male"){
                color = "#68a4cc";
            } else color = "#dd71cd";

            return(
                <div id="retweetSpeechBox" style={{"borderColor": color}}>
                    <p style={{"fontWeight": "bold"}}> "{currentTweet.tweet}"</p>
                    <p> - {currentTweet.name}</p>
                </div>
            )
        }
    }

    render(){
        return(
            <div class="container-fluid">
                <div class="row" id="tweetTitleRow">
                    <div class="col-md-4"></div>
                    <div class="col-md-4" id="tweetTitle">Tweets</div>
                    <div class="col-md-4"></div>
                </div>

                <div class="row">
                    <div class="col-md-4"></div>
                    <div class="col-md-4">
                        {this.renderCurrentTweet()}
                    </div>
                    <div class="col-md-4"></div>
                </div>

                <div class="row" style={{"margin": "25px"}}>
                    <div class="col-md-4" style={{"textAlign": "center"}}>
                        {this.renderTweet(this.state.positiveTweets)}
                    </div>
                    <div class="col-md-2"></div>

                    <div class="col-md-2"></div>
                    <div class="col-md-4" style={{"paddingLeft": "25px"}}>
                        {this.renderTweet(this.state.negativeTweets)}
                    </div>
                </div>

            </div>
        )
    }

}
import React from "react";

class TweetBox extends React.Component{

    /** Props: data: Tweet, gender, retweets, agree, showTweet function */
    render(){
        let color;
        if(this.props.gender == "male"){
            color = "blue";
        } else color = "pink";

        return(
            <div style={{width:"50px", height:"50px", "backgroundColor": color}} onMouseOver={this.props.showTweet}> 
                <span>{this.props.retweets}</span>
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
                color = "blue";
            } else color = "pink";
            
            return(
                <div style={{backgroundColor: color}}>
                    <p> {currentTweet.tweet}</p>
                    <p> {currentTweet.name}</p>
                </div>
            )
        }
    }

    render(){
        return(
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-4">
                        {this.renderTweet(this.state.positiveTweets)}
                    </div>
                    <div class="col-md-4">
                        {this.renderCurrentTweet()}
                    </div>
                    <div class="col-md-4">
                        {this.renderTweet(this.state.negativeTweets)};
                    </div>
                </div>
            
            </div>
        )
    }

}
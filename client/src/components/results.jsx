import React from 'react';
import Chart from 'chart.js';

import TweetView from 'tweets';
import EmotionGraph from 'gEmotions';
import SentimentGenderGraph from 'gSGraph';

export default class Results extends React.Component{

    render(){

        return(
            <div class="container-fluid">
                <div class="row animated fadeInDown" id="graphCard">
                    <EmotionGraph tweets={this.props.data}/>
                </div>
                <div>
                    <SentimentGenderGraph tweets={this.props.data}/>
                </div>
                <div class="row">
                    <TweetView tweets={this.props.data}/>
                </div>
            </div>
        )
    }
}
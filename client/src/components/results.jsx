import React from 'react';
import Chart from 'chart.js';

import TweetView from 'tweets';

export default class Results extends React.Component{

    chart_emotions(){
        let data = this.props.data;


    }

    render(){
        console.log(this.props.data);

        return(
            <div class="container-fluid"> 
                <div class="row">
                    <canvas id="cEmotion" ref={() => this.chart_emotions()}/>
                </div>
                <div class="row">
                    <TweetView tweets ={this.props.data}/>
                </div>
            </div>
        )

    }

}
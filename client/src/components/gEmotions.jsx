import React from 'react';

export default class EmotionGraph extends React.Component{
    constructor(){
        super();
        this.chart = null;
    }

    formatData(){
        let totalRetweets = 0;
        let sumEmotions = new Array(5).fill(0);


        for(let x = 0; x < this.props.tweets.length; x ++){
            let currTweet = this.props.tweets[x];
            console.log(currTweet);
            let retweets = currTweet.retweets;
            totalRetweets += retweets;

            sumEmotions[0] += currTweet.tone.joy * (retweets + 1);
            sumEmotions[1] += currTweet.tone.fear * (retweets + 1);
            sumEmotions[2] += currTweet.tone.disgust * (retweets + 1);
            sumEmotions[3] += currTweet.tone.sadness * (retweets + 1);
            sumEmotions[4] += currTweet.tone.anger * (retweets + 1);
        }

        return sumEmotions;
    }

    renderChart(){
        if(this.chart)
            this.chart.destroy();

        let sumEmotions = this.formatData();
        console.log(sumEmotions);

        // joy fear disgust sadness anger
        let data = this.props.data;
        let ctx = document.getElementById("cEmotion").getContext("2d");
        let chart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: ["Joy", "Fear", "Disgust", "Sadness", "Anger"],
                datasets: [
                    {
                        data: sumEmotions,
                        backgroundColor: [
                            '#f4dc27', '#a882bc', '#77b263', '#8ab1ce', '#c9364e'
                        ],
                        borderColor: [

                        ],
                        borderWidth: 1
                    }
                ]
            },
            options: {}
        });

        this.chart = chart;
    }

    render(){
        return(
            <div class="container-fluid">
                <canvas id="cEmotion" ref={() => this.renderChart()}/>
            </div>
        )
    }

}
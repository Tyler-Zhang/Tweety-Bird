import React from 'react';
import Chart from 'chart.js';

export default class SentimentGenderGraph extends React.Component{

    renderSentimentGraph(){
        let sumAgreeScore = 0;
        this.props.tweets.forEach(v => {
            sumAgreeScore += v.agreeScore;
        });
       var g = new JustGage({
            id: "gauge",
            value: sumAgreeScore + this.props.tweets.length,
            min: this.props.tweets.length,
            max: this.props.tweets.length * 2,
            hideValue:true,
            minTxt: "Agree",
            maxTxt: "Disagree",
            customSectors: {
                percents: true,
                ranges: [{
                    color : "#43bf58",
                    lo : 0,
                    hi : 50
                },{
                    color : "#ff3b30",
                    lo : 51,
                    hi : 100
                }]
            }

        });
    }

    renderGenderGraph(){
        let maleCount = 0, femaleCount = 0;

        this.props.tweets.forEach(v => {
            if(v.gender == "male")
                maleCount ++;
            else
                femaleCount ++;
        });
        let context = document.getElementById("genderChart").getContext("2d");
        var myPieChart = new Chart(context,{
            type: 'pie',
            data: {
                labels: ["Male", "Female"],
                datasets: [
                    {
                        data: [maleCount, femaleCount],
                        backgroundColor: [
                            "#FF6384",
                            "#36A2EB"
                        ],
                        hoverBackgroundColor: [
                            "#FF6384",
                            "#36A2EB"
                        ]
                    }]
            }
        });
        console.log(myPieChart);

    }

    render(){
        return(
            <div class="container-fluid">
                <div class="row">
                    <div class="container-fluid" class="col-md-6">
                        <h1 class="row text-center"> Public Opinion </h1>
                        <div class="row"  style={{height:"500px"}} id="gauge" ref={() => this.renderSentimentGraph()}></div>
                    </div>
                    <div class="container-fluid" class="col-md-5 col-md-offset-1">
                        <h1 class="row text-center"> Gender </h1>
                        <canvas class="row" id="genderChart" ref={() => this.renderGenderGraph()}/>
                    </div>
                </div>
            </div>
        )
    }

}
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
                            "#36A2EB",
                            "#FF6384"
                        ],
                        hoverBackgroundColor: [
                            "#36A2EB",
                            "#FF6384"
                        ]
                    }]
            }
        });
        console.log(myPieChart);

    }

    render(){
        return(
            <div class="container-fluid">
                <div class="row" style={{"marginTop": "80px"}}>
                    <div id="publicOpChart" class="container-fluid" class="col-md-6">
                        <h1 class="row text-center"> Public Opinion </h1>
                        <div class="row chart-cards"  style={{height:"500px"}} id="gauge" ref={() => this.renderSentimentGraph()}></div>
                    </div>
                    <div id="genderPieChart" class="container-fluid" class="col-md-5 col-md-offset-1">
                        <h1 class="row text-center"> Gender </h1>
                        <canvas class="row chart-cards" id="genderChart" ref={() => this.renderGenderGraph()}/>
                    </div>
                </div>
            </div>
        )
    }

}
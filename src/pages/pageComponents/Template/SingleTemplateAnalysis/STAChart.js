import React from 'react';
import moment from 'moment'
import {
  Spin,
  Card,
} from 'antd'
import {Bar} from 'react-chartjs-2';
import STAFilter from './STAFilter'
export default class DashboardEmailUnsubscribeChart extends React.Component {

  randomColor = (colors) => { return colors[ parseInt(Math.random() * colors.length) ] }

  /**
   * transform analysis data which coming from api call
   * @param  {[arr]} options.analysisData  [it expect a array. which will be sorted and generated chart data and label]
   * @param  {[string]} options.key   [it will be key of the data]
   * @param  {[string]} options.label [label name. Usually when user hover on certain bar point it will pop up with respective data]
   * @return {[array]}  graphData              [it will generate for final transformed data which will be main data value for chart]
   */
  transformAnalysisData = ({analysisData, key, label, chartName }) => {
    // let analysisData = [{"_id":"2017-12","totalFeedback":2},{"_id":"2017-09","totalFeedback":6},{"_id":"2018-01","totalFeedback":4},{"_id":"2017-08","totalFeedback":2},{"_id":"2018-04","totalFeedback":2},{"_id":"2017-11","totalFeedback":6},{"_id":"2017-10","totalFeedback":10},{"_id":"2018-03","totalFeedback":2},{"_id":"2018-02","totalFeedback":6}]
    var materialColor = ['#e53935', '#d32f2f', '#c62828', '#b71c1c', '#d81b60', '#c2185b', '#ad1457', '#880e4f', '#8e24aa', '#7b1fa2', '#6a1b9a', '#4a148c', '#5e35b1', '#512da8', '#4527a0', '#311b92', '#3949ab', '#303f9f', '#283593', '#1a237e', '#1e88e5', '#1976d2', '#1565c0', '#0d47a1', '#039be5', '#0288d1', '#0277bd', '#01579b', '#00acc1', '#0097a7', '#00838f', '#006064', '#00897b', '#00796b', '#00695c', '#004d40', '#43a047', '#388e3c', '#2e7d32', '#1b5e20', '#7cb342', '#689f38', '#558b2f', '#33691e', '#c0ca33', '#afb42b', '#9e9d24', '#827717', '#fbc02d', '#f9a825', '#f57f17', '#ffb300', '#ffa000', '#ff8f00', '#ff6f00', '#fb8c00', '#f57c00', '#ef6c00', '#e65100', '#f4511e', '#e64a19', '#d84315', '#bf360c', '#6d4c41', '#5d4037', '#4e342e', '#3e2723', '#757575', '#616161', '#424242', '#212121', '#546e7a', '#455a64', '#37474f', '#263238',]
    var flatColor = ["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50", "#f1c40f", "#e67e22", "#e74c3c", "#95a5a6", "#f39c12", "#d35400", "#c0392b", "#7f8c8d", ];
    let labels = []
    let data = []
    let borderColor = []
    let backgroundColor = []
    let borderWidth = 1;
    let analysisDataSorted = analysisData.sort((a, b) => {
      let c = moment(a._id, 'YYYY/MM');
      let d = moment(b._id, 'YYYY/MM');
      return new Date(c) - new Date(d)
    })
    analysisDataSorted.forEach(obj => {
      var check = moment(obj._id, 'YYYY/MM');
      var month = check.format('MMM');
      var year  = check.format('YYYY');
      var str = `${month} ${year}`
      labels.push(str)
      data.push(obj[key])
      if (chartName === 'bar') {
        borderColor.push(this.randomColor(flatColor))
        backgroundColor.push(this.randomColor(materialColor))
      } else if (chartName === 'line') {
        borderColor = this.randomColor(materialColor)
        backgroundColor = this.randomColor(flatColor)
        // borderColor = '#348490'
        // backgroundColor = '#af3857'

        // borderColor = '#af3857'
        // backgroundColor = '#348490'
        borderWidth = 5;
      }
    })
    let dataSet = {
      label: label,
      backgroundColor,
      borderColor,
      borderWidth,
      data,
      fill: true,
    }
    // if (chartName == 'line') {
    //   dataSet = {...dataSet, ...{fill: true}}
    // }

    let graphData = {
      labels,
      datasets: [dataSet]
    }
    return graphData;
}
  render () {
    let {
      singleTemplateAnalysis:analysisData,
      singleTemplateAnalysisLoader:analysisLoader,
    } = this.props
    let barOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            padding: 25,
          }
        }],
        xAxes: [{
          maxBarThickness: 50,
        }],
      }
    }
    let analysisGraphData = this.transformAnalysisData({
        analysisData,
        key: 'totalEmailSent',
        label: 'Total Email sent',
        chartName: 'bar',
      })

    let chartContent =  analysisData.length ? <Bar
        options={barOptions}
        data={analysisGraphData}
        height={400}
      /> : <h2>No data found</h2>

    let chart = analysisLoader ? <div className="text-center" > <Spin /> </div> : chartContent
    const {fetchSingleTemplateAnalysis, template: {_id: templateId}, user: {_id: userId}} = this.props
    return (
      <Card className='my-2' title={<STAFilter
                  fetchSingleTemplateAnalysis={fetchSingleTemplateAnalysis}
                  templateId={templateId}
                  userId={userId}
                  />} >
      {chart}
      </Card>
      )

  }

}

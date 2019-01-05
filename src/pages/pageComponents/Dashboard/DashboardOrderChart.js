import React from 'react';
import {
  Spin,
  Card,
} from 'antd'
import {Line} from 'react-chartjs-2';
import moment from 'moment'
import DatePickerMonthSelectionAndOrderFilter from './DatePickerMonthSelectionAndOrderFilter'



export default class DashboardOrderChart extends React.Component {

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
    let chartColors = {
        red: 'rgb(255, 99, 132)',
        orange: 'rgb(255, 159, 64)',
        yellow: 'rgb(255, 205, 86)',
        green: 'rgb(75, 192, 192)',
        blue: 'rgb(54, 162, 235)',
        purple: 'rgb(153, 102, 255)',
        grey: 'rgb(201, 203, 207)'
      };
    let chartBgColors = {
      green: 'rgb(43, 172, 193)',
    }

    let labels = []
    let  totalOrderData = []
    let  totalEmailSentData = []
    let  totalMFNData = []
    let  totalAFNData = []

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
      totalOrderData.push(obj['totalOrder'])
      totalEmailSentData.push(obj['totalSentEmail'])
      totalAFNData.push(obj['totalAFN'])
      totalMFNData.push(obj['totalMFN'])
    })

    let orderDataSet = {
      label: 'Number Of Orders',
      borderColor: chartColors.red,
      backgroundColor: this.randomColor(materialColor),
      borderWidth: 5,
      data: totalOrderData,
      fill: false,
      pointRadius: 5,
      pointHoverRadius: 10,
    }
    let emailDataSet = {
      label: "Number Of Email Send",
      borderColor: chartColors.blue,
      backgroundColor: this.randomColor(materialColor),
      borderWidth: 5,
      data: totalEmailSentData,
      borderDash: [10, 2],
      pointRadius: 5,
      pointHoverRadius: 10,
      fill: false,
    }
    let afnDataSet = {
      label: "AFN Order",
      backgroundColor: this.randomColor(materialColor),
      borderColor: chartColors.green,
      borderWidth: 5,
      data: totalAFNData,
      pointRadius: 5,
      pointHoverRadius: 10,
      fill: false,
    }
    let mfnDataSet = {
      label: "MFN Order",
      backgroundColor: this.randomColor(materialColor),
      borderColor: chartColors.yellow,
      borderWidth: 5,
      data: totalMFNData,
      borderDash: [10, 5],
      fill: false,
      pointRadius: 5,
      pointHoverRadius: 10,
    }

    let graphData = {
      labels,
      datasets: [orderDataSet, emailDataSet, mfnDataSet, afnDataSet]
    }
    return graphData;
}
  render () {
    const {
      orderAnalysisLoader,
      orderAnalysis,
      fetchOrderAnalysis,
      user,
    } = this.props

    let orderAnalysisData = this.transformAnalysisData({
        analysisData: this.props.orderAnalysis,
        key: 'totalOrder',
        label: 'Number of Orders',
        chartName: 'line',
      })

    let lineOptions = {
      responsive: true,
      maintainAspectRatio: false,
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      scales: {
        yAxes: [{
          ticks: {
            padding: 25,
            beginAtZero: true,
          }
        }]
      }
    }
    let chartContent =  orderAnalysis.length ? <Line height={400} options={lineOptions} data={orderAnalysisData} /> : <h2>No Order found</h2>

    let chart =  orderAnalysisLoader ?
    <div className="text-center" >
      <Spin />
    </div> : chartContent

    return <Card title={<DatePickerMonthSelectionAndOrderFilter userId={user._id} title="Orders" fetchOrderAnalysis={fetchOrderAnalysis} />} >
              {chart}
            </Card>

  }

}

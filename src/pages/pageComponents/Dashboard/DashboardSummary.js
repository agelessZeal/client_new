import React, { Component } from 'react';
import ChartCard from 'components/CleanComponents/ChartCard'
import * as Functions from '../../pageData/Functions.js'
import {
  Spin,
} from 'antd'
export default class DashboardSummary extends Component {
  generateChartCard = (title, amount=0) => {
    let n1 = Functions.getRandomFromMinMax(0, amount-1)
    let n2 = Functions.getRandomFromMinMax(0, amount-1)
    if (n1 < 1) {
      n1 = 0
    }
    if (n2 < 1) {
      n2 = 0
    }

    return <ChartCard
      title={title}
      amount={amount}
      chartProps={{
        width: 120,
        height: 107,
        lines: [
          {
            values: [0, n1, n2, amount],
            colors: {
              area: Functions.randomRgbaColor(0.5),
              line: Functions.randomRgbaColor(),
            },
          },
        ],
      }}
    />
  }
  trnaformSummary = (summary) => {
    let dashboardSummary = [
      {
        name: 'totalOrder',
        number: summary.totalOrder,
        title: 'Total Order',
      },
      {
        name: 'totalEmailSent',
        number: summary.totalEmailSent,
        title: 'Total Email Sent',
      },
      {
        name: 'totalProduct',
        number: summary.totalProduct,
        title: 'Total Product',
      },
      {
        name: 'totalTemplate',
        number: summary.totalTemplate,
        title: 'Total Template',
      },
    ]
    return dashboardSummary;
  }
  render() {
    let {summary, loading} = this.props;
    let dashboardSummary = this.trnaformSummary(summary)
    return (
      loading ? <div className='text-center bg-white p-4 mb-3'> <Spin /> </div>:
      <div className="row">
      {

        dashboardSummary.map((field, i) =>
          <div key={i} className="col-xl-3">
            {this.generateChartCard(field.title, field.number)}
          </div>
          )
      }
      </div>
    );
  }
}

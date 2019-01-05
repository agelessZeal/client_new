let topLinks = [
  {
    title: 'Order',
    href: '#',
    amount: 220,
  },
  {
    title: 'Message sent',
    href: '#',
    amount: 350,
  },
  {
    title: 'Open rate',
    href: '#',
    amount: '$22',
  },
  {
    title: 'Delivery Record',
    href: '#',
    amount: 130,
  },
]
const orderFeedbackSummary = [

  {
    title: 'Order and message sent',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Message Sent',
          fill: false,
          lineTension: 0.1,
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [45, 59, 80, 81, 56, 55, 88]
        }
      ]
    }
  },
  {
    title: 'Feedback',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Feedback',
          fill: false,
          lineTension: 0.1,
          backgroundColor: [
            'tomato',
            'red',
            'teal',
            'green',
            'yellow',
            'salmon',
          ],
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [25, 59, 80, 81, 56, 75, 80]
        }
      ]
    }
  },

]



const recentFeedbacks = [
  {
    product_title: 'product one',
    link: '#',
    rating: 4,
    comment: 'good lorem ipsum dolor sit amit',
    user: {
      name: 'User one',
    }
  },
  {
    product_title: 'product two',
    link: '#',
    rating: 3,
    comment: 'avarage lorem ipsum dolor sit amit',
    user: {
      name: 'User two',
    }
  },
  {
    product_title: 'product three',
    link: '#',
    rating: 4,
    comment: 'good lorem ipsum dolor sit amit',
    user: {
      name: 'User four',
    }
  },
  {
    product_title: 'product four',
    link: '#',
    rating: 2,
    comment: 'avarage lorem ipsum dolor sit amit',
    user: {
      name: 'User four',
    }
  },
]

const topTenProducts = [
  {
    title: 'Lenovo thinkpad t480',
    link: '#',
    sku: 'jflkdf2308348',
    unitSold: 26,
    feedback: 28,
  },
  {
    title: 'Acer Spin 7',
    link: '#',
    sku: 'jflkdf2308348',
    unitSold: 26,
    feedback: 28,
  },
  {
    title: 'Motorolla Power one',
    link: '#',
    sku: 'jflkdf2308348',
    unitSold: 26,
    feedback: 28,
  },
  {
    title: 'Dell xps 9570',
    link: '#',
    sku: 'jflkdf2308248',
    unitSold: 46,
    feedback: 28,
  },
  {
    title: 'Lenovo thinkpad t480',
    link: '#',
    sku: 'jflkdf2308348',
    unitSold: 26,
    feedback: 28,
  },
  {
    title: 'Acer Spin 7',
    link: '#',
    sku: 'jflkdf2308348',
    unitSold: 26,
    feedback: 28,
  },
  {
    title: 'Motorolla Power one',
    link: '#',
    sku: 'jflkdf2308348',
    unitSold: 26,
    feedback: 28,
  },
  {
    title: 'Dell xps 9570',
    link: '#',
    sku: 'jflkdf2308248',
    unitSold: 46,
    feedback: 28,
  },
  {
    title: 'Lenovo thinkpad t480',
    link: '#',
    sku: 'jflkdf2308348',
    unitSold: 26,
    feedback: 28,
  },
  {
    title: 'Acer Spin 7',
    link: '#',
    sku: 'jflkdf2308348',
    unitSold: 26,
    feedback: 28,
  },
]
const topTenProductsColumns = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'SKU',
    dataIndex: 'sku',
    key: 'sku',
  },
  {
    title: 'Unit Sold',
    dataIndex: 'unitSold',
    key: 'unitSold',
  },
  {
    title: 'Feedback',
    dataIndex: 'feedback',
    key: 'feedback',
  },
]

const dummy =  {
  topLinks,
  orderFeedbackSummary,
  recentFeedbacks,
  topTenProducts,
  topTenProductsColumns,
}

export default dummy;

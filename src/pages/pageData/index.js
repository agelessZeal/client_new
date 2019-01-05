import moment from 'moment'
let fulfillmentChannelOptionKeys = [
  {
    title: "AFN",
    value: "AFN"
  },
  {
    title: "MFN",
    value: "MFN"
  }
]
let orderOptionKeys = [
  {
    title: "Shipped",
    value: "Shipped"
  },
  {
    title: "Pending",
    value: "Pending"
  },
  {
    title: "Unshipped",
    value: "unshipped"
  },
  {
    title: "Delivered",
    value: "delivered"
  },
  {
    title: "Canceled",
    value: "canceled"
  },
  {
    title: "Returned",
    value: "returned"
  }
]
let orderEmailsOptionKeys = [
  {
    title: 'Has Sent',
    value:  'sent_status:1'
  },
  {
    title: 'None Sent',
    value:  'sent_status:2'
  },
  {
    title: 'Is Queued',
    value:  'sent_status:0'
   }
]
let productStatusOptionKeys = [
  {
    title: 'Active',
    value:  'active'
  },
  {
    title: 'Inactive',
    value:  'inactive'
  },
]

let reviewOptionKeys = [
  {
    value: "1",
    title: "1 star rating",
  },
  {
    value: "2",
    title: "2 star rating",
  },
  {
    value: "3",
    title: "3 star rating",
  },
  {
    value: "4",
    title: "4 star rating",
  },
  {
    value: "5",
    title: "5 star rating",
  },
]
let filteringOptionsFeedback = [
  {
    title: "Reviews",
    keys: reviewOptionKeys,
  }
]
let filteringOptions = [
  {
    title: "Fulfillment Channel",
    keys: fulfillmentChannelOptionKeys
  },
  {
    title: "Order Status",
    keys: orderOptionKeys
  },
  {
    title: "Email Status",
    keys: orderEmailsOptionKeys
  }
]
let filteringOptionsProduct = [
  {
    title: "Product By review",
    keys: reviewOptionKeys
  },
  {
    title: "Product Status",
    keys: productStatusOptionKeys,
  },
]



let excludeOrderKeys = [
  {
    title: "Feedback",
    keys: [
      {
        label: "1 star feedback",
        value: 'feedback:1',
        optGroup: 'feedback',
      },
      {
        label: "2 star feedback",
        value: 'feedback:2',
        optGroup: 'feedback',
      },
      {
        label: "3 star feedback",
        value: 'feedback:3',
        optGroup: 'feedback',
      },
      {
        label: "4 star feedback",
        value: 'feedback:4',
        optGroup: 'feedback',
      },
      {
        label: "5 star feedback",
        value: 'feedback:5',
        optGroup: 'feedback',
      },
    ]
  },
  {
    title: "Reviews",
    keys: [
      {
        label: "1 star review",
        value: 'review:1',
        optGroup: 'review',
      },
      {
        label: "2 star review",
        value: 'review:2',
        optGroup: 'review',
      },
      {
        label: "3 star review",
        value: 'review:3',
        optGroup: 'review',
      },
      {
        label: "4 star review",
        value: 'review:4',
        optGroup: 'review',
      },
      {
        label: "5 star review",
        value: 'review:5',
        optGroup: 'review',
      },

    ]
  },
  {
    title: "Promotions",
    keys: [
      {
        label: "With item discount",
        value: 'promotion:item_discount',
        optGroup: 'promotion',
      },
      {
        label: "With shipping discount",
        value: 'promotion:shipping_discount',
        optGroup: 'promotion',
      },
    ]
  },
  {
    title: "Other",
    keys: [
      {
        label: "Returns",
        value: 'other:return',
        optGroup: 'other',
      },
      {
        label: "Repeat Buyers",
        value: 'other:repeat_buyer',
        optGroup: 'Other',
      }

    ]
  }
];

export const randomColor = colors => colors[ parseInt(Math.random() * colors.length) ]

/**
 * transform analysis data which coming from api call
 * @param  {[arr]} options.analysisData  [it expect a array. which will be sorted and generated chart data and label]
 * @param  {[string]} options.key   [it will be key of the data]
 * @param  {[string]} options.label [label name. Usually when user hover on certain bar point it will pop up with respective data]
 * @return {[array]}  graphData              [it will generate for final transformed data which will be main data value for chart]
 */
export const transformAnalysisData = ({analysisData, key, label, chartName }) => {
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
    if (chartName == 'bar') {
      borderColor.push(randomColor(flatColor))
      backgroundColor.push(randomColor(materialColor))
    } else if (chartName == 'line') {
      borderColor = randomColor(materialColor)
      backgroundColor = randomColor(flatColor)
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

export const draftEditorOptions = {
  //important note
  //any value changed here will be reflacted on Functions.js > replaceWithRealValue function
   variableBuyer : [
    {name: '[#buyer-name#]', desc: 'Buyer\'s full name', ext: 'Joe Bloggs'},
    {name: '[#buyer-first-name#]', desc: 'Buyer\'s first name', ext: 'Joe'},
    {name: '[#thank-you-for-feedback#]', desc: 'Thank you text for leaving feedback. (Note - only shows if good feedback left)', ext: 'Thanks so much for leaving a positive feedback on Amazon for us. It\'s greatly appreciated.'}
  ],

  orderRelated : [ {name: '[#order-date#]', desc: 'Date order was placed', ext: '2016-05-09'},
    {name: '[#order-id#]', desc: 'Buyer\'s Order ID', ext: '204-4414175-4675568'},
    {name: '[#product-name#]', desc: 'Item bought by buyer', ext: 'DVD123'},
    {name: '[#product-qty#]', desc: 'Quantity of item bought', ext: '1'},
    {name: '[#product-price#]', desc: 'Price of item bought', ext: '49.99'},
    {name: '[#product-shipping#]', desc: 'Shipping price of item bought', ext: '2.99'},
    {name: '[#product-condition#]', desc: 'Condition of item bought', ext: 'New'},
    {name: '[#order-estimated-arrival#]', desc: 'Estimated arrival date for the order', ext: '2016-05-12 (Note - FBA Only)'},
    {name: '[#my-seller-name#]', desc: 'Your seller name', ext: 'ABC Sample Widget Company'},
  ],

  shippingRelated : [
      {name: '[#shipping-address1#]', desc: 'Shipping address line 1', ext: '19 Thames Road'},
      {name: '[#shipping-address2#]', desc: 'Shipping address line 2', ext: 'Westminster'},
      {name: '[#shipping-city#]', desc: 'Shipping address city', ext: 'London'},
      {name: '[#shipping-zip/postal code#]', desc: 'Shipping address postal code', ext: 'SE1 2AE or 90210'},
      {name: '[#shipping-country#]', desc: 'Shipping address country', ext: 'United Kingdom'},
      {name: '[#shipping-courier#]', desc: 'Courier company used', ext: 'UPS or RM (Note - FBA Only)'},
      {name: '[#shipping-trackingno#]', desc: 'Tracking number used by courier company', ext: '3Q77A673212QA (Note - FBA Only)'},
      {name: '[#shipping-state#]', desc: 'Shipping state/county', ext: 'California'},
  ],

  variableLogos : [
      {name: '[#logo#]', desc: 'Company/Store logo', ext: 'Upload logo via Settings screen'},
      {name: '[#logo-amz-link#]', desc: 'Company/Store logo which links to your Amazon store', ext: 'Upload logo via Settings screen'},
  ],

  variableLinks : [
      {name: '[#feedback-link#]', desc: 'Link for buyer to leave feedback', ext: 'https://www.amazon.com/gp/feedback/leave-customer-feedback.html/?order=SAMPLE-ORDER-ID&pageSize=1'},
      {name: '[#feedback-link-5star#]', desc: 'Link for buyer to leave 5* feedback', ext: 'http://www.amazon.co.uk/gp/feedback/email-excellent-fb.html?ie=UTF8&excellent=2&isCBA=&marketplaceID=A1F83G8C2ARO7P&orderID=SAMPLE-ORDER-ID&rating=5&sellerID=YOUR-SELLER-ID'},
      {name: '[#contact-link#]', desc: 'Link for buyer to contact you via Amazon', ext: 'https://www.amazon.co.uk/ss/help/contact/?_encoding=UTF8&asin=&isCBA=&marketplaceID=A1F83G8C2ARO7P&orderID=&ref_=aag_d_sh&sellerID=YOUR-SELLER-ID'},
      {name: '[#order-link#]', desc: 'Link for buyer to view their order on Amazon', ext: 'https://www.amazon.com/gp/css/summary/edit.html?orderID=SAMPLE-ORDER-ID'},
      {name: '[#review-link#]', desc: 'Link for buyer to leave a review on Amazon', ext: 'https://www.amazon.com/review/create-review?ie=UTF8&asin=B000000001&#'},
      {name: '[#store-link#]', desc: 'Link to your store on Amazon', ext: 'https://www.amazon.co.uk/gp/aag/main/ref=olp_merch_name_4?ie=UTF8&asin=&isAmazonFulfilled=0&seller=YOUR-SELLER-ID'},
      {name: '[#product-link#]', desc: 'Link to the product on Amazon', ext: 'https://www.amazon.co.uk/gp/product/B000000001'},
      {name: '[#amazon-fba-contact-link#]', desc: 'Contact Amazon FBA', ext: 'https://www.amazon.co.uk/gp/help/customer/contact-us?ie=UTF8&orderId=SAMPLE-ORDER-ID&'},
  ],
}


const PageData = {
  filteringOptions,
  filteringOptionsFeedback,
  filteringOptionsProduct,
  excludeOrderKeys,
  transformAnalysisData,
  orderOptionKeys,
  draftEditorOptions,
}

export default PageData;
// transformAnalysisData

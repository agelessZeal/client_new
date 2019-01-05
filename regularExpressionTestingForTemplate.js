var buttonStyle = `

.amazon_button_outer {
  background: #f0c14b;
  border-color: #a88734 #9c7e31 #846a29;
  color: #111;
}
.amazon_button_inner {
  background: linear-gradient(to bottom,#f7dfa5,#f0c14b);
  box-shadow: 0 1px 0 rgba(255,255,255,.4) inset;
}
`

let example = `
      "buyer-name": item.BuyerName,
      "buyer-first-name": item.BuyerName ? item.BuyerName.split(" ").slice(0, -1).join(" ") : "",
      "thank-you-for-feedback": "Thank you text for leaving feedback. (Note - only shows if good feedback left)",
      "order-date": item.PurchaseDate,
      "order-id": item.AmazonOrderId,
      "product-name": item.orderItem[0].title,
      "product-price": item.OrderTotal.Amount,
      "product-qty": item.orderItem.reduce((a, c) => a + Number(c.qty), 0),
`



var item = {
  BuyerName: '<Polo Dev>',
  PurchaseDate: 'Jan 5, 2018',
  AmazonOrderId: 'dhi-3928323-2343',
  OrderTotal: {
    Amount: 33,
  },
  orderItem: [
    {
      title: '<some product name 1>',
      qty: 2,
    },
    {
      title: 'some product name 2',
      qty: 3,
    },
    {
      title: 'some product name 3',
      qty: 1,
    },
  ]
}


var html = `
  Lorem ipsum dolor sit amet, [#buyer-dhaka#] consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.  [#product-name#] At vero eos et accusam et [#buyer-name#] consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam [#product-qty#] et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, [#product-qty#] sed
`
var re = /\[#([a-z-\s]+)#\]/g

function replaceWithOtherText(value) {
  switch (value) {
    case 'buyer-name':
      return item.BuyerName
      break
    case 'product-name':
      return item.orderItem.title
      break
    case 'product-qty':
      return item.orderItem.reduce(((cumulative, current) => cumulative + current.qty), 0)
      break
    default:
      return generateAmazonButton('amazon', 'http://www.amazon.co.uk');
  }

}

generateAmazonButton = (text, link) => {
    let amazon_button_outer = `
        background: #f0c14b;
        border-color: #a88734 #9c7e31 #846a29;
        color: #111;
    `
    let amazon_button_inner = `
      background: linear-gradient(to bottom,#f7dfa5,#f0c14b);
      box-shadow: 0 1px 0 rgba(255,255,255,.4) inset;
      padding: .75em 1.5em;
      height: 100%;
      display: block;
      position: relative;
      overflow: hidden;
    `
    let amazon_button_inner_a = `
      font-size: 1.5em;
      color: #111;
    `
    return `<span style="${amazon_button_outer}">
        <span style="${amazon_button_inner}" >
            <a style="${amazon_button_inner_a}" href="${link}">${text}</a>
        </span>
    </span>`
}
// var replaceText = html.replace(re, replaceWithOtherText(RegExp.$1))
var replaceText = html.replace(re, function (match, contents, offset, input_string) {
  let newContent = replaceWithOtherText(contents)
  return newContent;
})
console.log(replaceText)

import React from 'react'
import ids from 'short-id'
import {
  Popover,
  Rate,
} from 'antd'
import {
  SERVER_STATIC_URL,
  CLIENT_ROOT_URL,
} from '../../ducks/types.js'

export const textTruncate = (str, length) => {
  let ending = '...';
  return str.length > length ? (str.substring(0, length - ending.length) + ending) : str;
}

export const generatePopover = (text, length, html) => {
  if (text.length < length) {
    return text;
  }else {
    let content = html ? html : text;
    return <Popover key={ids.generate()} title={null} content={content}>
    {textTruncate(text, length)}
    </Popover>
  }
}
export const generatePopoverAlreadyTruncate = (truncateText, html) => <Popover key={ids.generate()} title={null} content={html}>
      {truncateText}
    </Popover>



export const formateDate = (text) => (new Date(text)).toLocaleDateString("en-US", {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric"
})

export const genRating = (text) => <Rate allowHalf={true} value={Number(text)} disabled={true} />

export const generateAmazonButton = (text, link) => {
  let amazon_button_outer = `
      background: #f0c14b;
      border-color: #a88734 #9c7e31 #846a29;
      color: #111;
      display: inline-block;
      margin: 6px 3px;
  `
  let amazon_button_inner = `
    background: linear-gradient(to bottom,#f7dfa5,#f0c14b);
    box-shadow: 0 1px 0 rgba(255,255,255,.4) inset;
    padding: 6px 8px;
  `
  let amazon_button_inner_a = `
    color: #111;
  `
  return `<span style="${amazon_button_outer}">
      <span style="${amazon_button_inner}" >
          <a target='_blank' style="${amazon_button_inner_a}" href="${link}">${text}</a>
      </span>
  </span>`
}

export const replaceWithRealValue = (contents='', dependancy={}) => {
  let {item} = dependancy;
  let all_variables_value = {}
  if (item)  {
    all_variables_value = {
      // buyer
      "buyer-name": item.BuyerName,
      "buyer-first-name": item.BuyerName ? item.BuyerName.split(" ").slice(0, -1).join(" ") : "",
      "thank-you-for-feedback": "Thank you text for leaving feedback. (Note - only shows if good feedback left)",


      //order
      "order-date": item.PurchaseDate,
      "order-id": item.AmazonOrderId,
      "product-name": item.orderItem[0].title,
      "product-qty": item.orderItem.reduce((a, c) => a + Number(c.qty), 0),
      "product-price": item.OrderTotal.Amount,
      "product-shipping": 1,
      "product-condition": 1,
      "order-estimated-arrival": 1,
      "my-seller-name": 1,

      // shipping
      "shipping-address1": 1,
      "shipping-address2": 1,
      "shipping-city": 1,
      "shipping-zip/postal code": 1,
      "shipping-country": 1,
      "shipping-courier": 1,
      "shipping-trackingno": 1,
      "shipping-state": 1,

      // logos
      "logo": 1,
      "logo-amz-link": 1,

      // links
      "feedback-link": generateAmazonButton('feedback link', `https://www.amazon.com/gp/feedback/leave-customer-feedback.html/?order=${item.AmazonOrderId}&pageSize=1`),
      "feedback-link-5star": generateAmazonButton('feedback-link-5star', `http://www.amazon.co.uk/gp/feedback/email-excellent-fb.html?ie=UTF8&excellent=2&isCBA=&marketplaceID=A1F83G8C2ARO7P&orderID=${item.AmazonOrderId}&rating=5&sellerID=YOUR-SELLER-ID`),
      "contact-link": generateAmazonButton( 'contact-link', `https://www.amazon.co.uk/ss/help/contact/?_encoding=UTF8&asin=&isCBA=&marketplaceID=A1F83G8C2ARO7P&orderID=${item.AmazonOrderId}&ref_=aag_d_sh&sellerID=YOUR-SELLER-ID`),
      "order-link": generateAmazonButton('order-link', `https://www.amazon.com/gp/css/summary/edit.html?orderID=${item.AmazonOrderId}`),
      "review-link": generateAmazonButton('review-link', `https://www.amazon.com/review/create-review?ie=UTF8&asin=B000000001&#`),
      "store-link": generateAmazonButton('store-link', `https://www.amazon.co.uk/gp/aag/main/ref=olp_merch_name_4?ie=UTF8&asin=&isAmazonFulfilled=0&seller=YOUR-SELLER-ID`),
      "product-link": generateAmazonButton('product link', `https://www.amazon.co.uk/gp/product/B000000001`),
      "amazon-fba-contact-link ": generateAmazonButton('amazon-fba-contact-link',`https://www.amazon.co.uk/gp/help/customer/contact-us?ie=UTF8&orderId=${item.AmazonOrderId}&`),
    }
  }

  if (! dependancy.item) {
    return '__ORDER_NOT__FOUND__'
  } else if (contents in all_variables_value) {
    return all_variables_value[contents]
  }else {
    return '__CONTENT_NOT_FOUND__'
  }

}

export const generateTemplatePreviewHtml = (messageBody, dependancy={}) => {
  let regexPattern = /\[#([a-z-\s1-9]+)#\]/g
  let templateHtmlPreview = messageBody.replace(regexPattern, (match, contents, offset, input_string) => {
    return replaceWithRealValue(contents, dependancy)
  })
  return templateHtmlPreview;
}
export const range = (start, end) => {
    if(start === end) return [start];
    return [start, ...range(start + 1, end)];
}

export const randomColor = (name) => {
  var materialColor = ['#e53935', '#d32f2f', '#c62828', '#b71c1c', '#d81b60', '#c2185b', '#ad1457', '#880e4f', '#8e24aa', '#7b1fa2', '#6a1b9a', '#4a148c', '#5e35b1', '#512da8', '#4527a0', '#311b92', '#3949ab', '#303f9f', '#283593', '#1a237e', '#1e88e5', '#1976d2', '#1565c0', '#0d47a1', '#039be5', '#0288d1', '#0277bd', '#01579b', '#00acc1', '#0097a7', '#00838f', '#006064', '#00897b', '#00796b', '#00695c', '#004d40', '#43a047', '#388e3c', '#2e7d32', '#1b5e20', '#7cb342', '#689f38', '#558b2f', '#33691e', '#c0ca33', '#afb42b', '#9e9d24', '#827717', '#fbc02d', '#f9a825', '#f57f17', '#ffb300', '#ffa000', '#ff8f00', '#ff6f00', '#fb8c00', '#f57c00', '#ef6c00', '#e65100', '#f4511e', '#e64a19', '#d84315', '#bf360c', '#6d4c41', '#5d4037', '#4e342e', '#3e2723', '#757575', '#616161', '#424242', '#212121', '#546e7a', '#455a64', '#37474f', '#263238',]
  var flatColor = ["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50", "#f1c40f", "#e67e22", "#e74c3c", "#95a5a6", "#f39c12", "#d35400", "#c0392b", "#7f8c8d", ];
  let colors = [...materialColor, ...flatColor]
  if (name === 'material') {
    colors = materialColor
  } else if (name === 'flat') {
    colors = flatColor
  }
  return colors[ parseInt(Math.random() * colors.length) ];
}

export const HEX2RGB = (hex, alpha) => {
  if (!alpha) {
    alpha = 1;
  }
  if (hex.charAt(0) === '#') {
      hex = hex.substr(1);
  }
  if ((hex.length < 2) || (hex.length > 6)) {
      return false;
  }
  var values = hex.split(''),
      r,
      g,
      b;

  if (hex.length === 2) {
      r = parseInt(values[0].toString() + values[1].toString(), 16);
      g = r;
      b = r;
  } else if (hex.length === 3) {
      r = parseInt(values[0].toString() + values[0].toString(), 16);
      g = parseInt(values[1].toString() + values[1].toString(), 16);
      b = parseInt(values[2].toString() + values[2].toString(), 16);
  } else if (hex.length === 6) {
      r = parseInt(values[0].toString() + values[1].toString(), 16);
      g = parseInt(values[2].toString() + values[3].toString(), 16);
      b = parseInt(values[4].toString() + values[5].toString(), 16);
  } else {
      return false;
  }
  return `rgba(${r},${g},${b},${alpha})`;
}

export const randomRgbaColor = (alpha, name) => {
  let hex = randomColor(name)
  return HEX2RGB(hex, alpha)
}
export const getRandomFromMinMax = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}
export const generateEmailTemplateFromDatabaseData = (templateData, buyerEmail) => {
  var logo = "https://reviewkick.s3.amazonaws.com/uploads/ckeditor/pictures/15/content_amazon-logo.png";
  if(templateData.logo){
    logo = SERVER_STATIC_URL + templateData.logo;
  }
  var email_attachment = '';
  if(templateData.email_attachment){

    var attachment = SERVER_STATIC_URL + templateData.email_attachment;
    var attachment_name = templateData.email_attachment.split('/')[2];
    email_attachment = `There is an attachment with this email. Click this link to view the attachment.
                          <a href="${attachment}" target="_blank">${attachment_name}</a>
                      `;
  }
  let email_unsubscribes = '#'
  if (buyerEmail) {
    email_unsubscribes = `${SERVER_STATIC_URL}/api/unsubscribes?buyer_email=${buyerEmail}&user_id=${templateData.user_id}&temp_id=${templateData._id}&appUrl=${CLIENT_ROOT_URL}#/unsubscribe`
  }
  let htmlBody = `
        <table bgcolor="#f2f2f2" border="0" cellpadding="0" cellspacing="0" width="100%">
          <tbody>
            <tr>
              <td align="center" style="padding: 30px 34%;">
                <img class="fr-fic" src="${logo}" style="display: block; height: 77.3333px; margin: 5px auto; vertical-align: top; width: 160px;">
              </td>
            </tr>
            <tr>
              <td class="template_area" style="padding: 5px;">
                ${templateData.email_message}
              </td>
            </tr>
            <tr>
              <td align="center">&nbsp;</td>
            </tr>
            <tr>
              <td style="padding: 15px 5px;">${email_attachment}</td>
            </tr>
            <tr>
              <td style="text-align:center; padding: 15px 5px;">
              <p>You're receiving this email because we think you should need this, </p>
              <p>AND you subscribed to hear from us. If our feedbacks aren’t sparking joy,</p>
              <p>we’ll understand if you <a href="${email_unsubscribes}">unsubscribe</a>.</p></td>
            </tr>

          </tbody>
        </table>
    `;
  return htmlBody;
}

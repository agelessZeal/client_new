import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState, Modifier } from 'draft-js';
import PropTypes from 'prop-types';
import {Popover, Button, Table, Dropdown, Icon, Row, Col, Tabs} from 'antd';

const TabPane = Tabs.TabPane;

class CustomOption extends Component {
    static propTypes = {
        onChange: PropTypes.func,
        editorState: PropTypes.object,
    };

    state = {
        showPopover: false
    }

    addVariable: Function = (i): void => {
        const { editorState, onChange } = this.props;
        const contentState = Modifier.replaceText(
            editorState.getCurrentContent(),
            editorState.getSelection(),
            i,
            editorState.getCurrentInlineStyle(),
        );
        onChange(EditorState.push(editorState, contentState, 'insert-characters'));
        this.setState({
            showPopover: false
        });
    };

    handleClickChange = (visible) => {
        this.setState({
            showPopover: visible
        });
    }

    render() {
        const columns = [{
            title: 'Tag name',
            dataIndex: 'name',
            key: 'name',
            render: text => (
                <span className="insert_variable" onClick={()=>this.addVariable(text)}>{text}<Icon type="plus-circle-o" /></span>
            ),
        }, {
            title: 'Description',
            dataIndex: 'desc',
            key: 'desc',
        }, {
            title: 'Example',
            key: 'ext',
            dataIndex: 'ext'
        }];

        const variableBuyer = [{name: '[#buyer-name#]', desc: 'Buyer\'s full name', ext: 'Joe Bloggs'},
            {name: '[#buyer-first-name#]', desc: 'Buyer\'s first name', ext: 'Joe'},
            {name: '[#thank-you-for-feedback#]', desc: 'Thank you text for leaving feedback. (Note - only shows if good feedback left)',
                ext: 'Thanks so much for leaving a positive feedback on Amazon for us. It\'s greatly appreciated.'}]

        const orderRelated = [ {name: '[#order-date#]', desc: 'Date order was placed', ext: '2016-05-09'},
            {name: '[#product-name#]', desc: 'Item bought by buyer', ext: 'DVD123'}, {name: '[#order-id#]', desc: 'Buyer\'s Order ID', ext: '204-4414175-4675568'},
            {name: '[#product-qty#]', desc: 'Quantity of item bought', ext: '1'}, {name: '[#product-price#]', desc: 'Price of item bought', ext: '49.99'},
            {name: '[#product-shipping#]', desc: 'Shipping price of item bought', ext: '2.99'}, {name: '[#product-condition#]', desc: 'Condition of item bought', ext: 'New'},
            {name: '[#order-estimated-arrival#]', desc: 'Estimated arrival date for the order', ext: '2016-05-12 (Note - FBA Only)'},
            {name: '[#my-seller-name#]', desc: 'Your seller name', ext: 'ABC Sample Widget Company'},
        ]

        const shippingRelated = [{name: '[#shipping-address1#]', desc: 'Shipping address line 1', ext: '19 Thames Road'},
            {name: '[#shipping-address2#]', desc: 'Shipping address line 2', ext: 'Westminster'},
            {name: '[#shipping-city#]', desc: 'Shipping address city', ext: 'London'},
            {name: '[#shipping-zip/postal code#]', desc: 'Shipping address postal code', ext: 'SE1 2AE or 90210'},
            {name: '[#shipping-country#]', desc: 'Shipping address country', ext: 'United Kingdom'},
            {name: '[#shipping-courier#]', desc: 'Courier company used', ext: 'UPS or RM (Note - FBA Only)'},
            {name: '[#shipping-trackingno#]', desc: 'Tracking number used by courier company', ext: '3Q77A673212QA (Note - FBA Only)'},
            {name: '[#shipping-state#]', desc: 'Shipping state/county', ext: 'California'},
        ]

        const variableLogos = [
            {name: '[#logo#]', desc: 'Company/Store logo', ext: 'Upload logo via Settings screen'},
            {name: '[#logo-amz-link#]', desc: 'Company/Store logo which links to your Amazon store', ext: 'Upload logo via Settings screen'},
        ]

        const variableLinks = [
            {name: '[#feedback-link#]', desc: 'Link for buyer to leave feedback', ext: 'https://www.amazon.com/gp/feedback/leave-customer-feedback.html/?order=SAMPLE-ORDER-ID&pageSize=1'},
            {name: '[#feedback-link-5star#]', desc: 'Link for buyer to leave 5* feedback', ext: 'http://www.amazon.co.uk/gp/feedback/email-excellent-fb.html?ie=UTF8&excellent=2&isCBA=&marketplaceID=A1F83G8C2ARO7P&orderID=SAMPLE-ORDER-ID&rating=5&sellerID=YOUR-SELLER-ID'},
            {name: '[#contact-link#]', desc: 'Link for buyer to contact you via Amazon', ext: 'https://www.amazon.co.uk/ss/help/contact/?_encoding=UTF8&asin=&isCBA=&marketplaceID=A1F83G8C2ARO7P&orderID=&ref_=aag_d_sh&sellerID=YOUR-SELLER-ID'},
            {name: '[#order-link#]', desc: 'Link for buyer to view their order on Amazon', ext: 'https://www.amazon.com/gp/css/summary/edit.html?orderID=SAMPLE-ORDER-ID'},
            {name: '[#review-link#]', desc: 'Link for buyer to leave a review on Amazon', ext: 'https://www.amazon.com/review/create-review?ie=UTF8&asin=B000000001&#'},
            {name: '[#store-link#]', desc: 'Link to your store on Amazon', ext: 'https://www.amazon.co.uk/gp/aag/main/ref=olp_merch_name_4?ie=UTF8&asin=&isAmazonFulfilled=0&seller=YOUR-SELLER-ID'},
            {name: '[#product-link#]', desc: 'Link to the product on Amazon', ext: 'https://www.amazon.co.uk/gp/product/B000000001'},
            {name: '[#amazon-fba-contact-link#]', desc: 'Contact Amazon FBA', ext: 'https://www.amazon.co.uk/gp/help/customer/contact-us?ie=UTF8&orderId=SAMPLE-ORDER-ID&'},
        ]

        // const variableProduct = [{name: 'Product - Item Title(s)', value: '[[ITEM_TITLE]]'},
        //     {name: 'Product - Item Title(s) Short Version', value: '[[ITEM_TITLE_SHORT]]'}, {name: 'Product - List of Item Title(s)', value: '[[LIST_ITEMS]]'},
        //     {name: 'Product - Image', value: '[[PRODUCT_IMAGE]]'}, {name: 'Product - ASIN', value: '[[PRODUCT_ASIN]]'},
        //     {name: 'Product - SKU', value: '[[PRODUCT_SKU]]'}, {name: 'Product Review Request', value: '[[LINK_PRODUCT_REVIEW::Leave product review]]'}, {name: 'Product Review Request - Star Image', value: '[[LINK_REVIEW_REQUEST_STARS]]'},
        //     {name: 'Product Review Request - Yellow Star Image', value: '[[LINK_REVIEW_REQUEST_YELLOW_STARS]]'},
        //     {name: 'Product Review Request - Yellow Star Image (b)', value: '[[LINK_REVIEW_REQUEST_YELLOW_B_STARS]]'},
        //     {name: 'Product Review Request - Yellow Star Image (c)', value: '[[LINK_REVIEW_REQUEST_YELLOW_C_STARS]]'},
        //     {name: 'Product Review Request - Product Image', value: '[[LINK_REVIEW_REQUEST_PRODUCT_IMG]]'}]
        //
        // const variableFeedback = [{name: 'Feedback Request', value: '[[LINK_FEEDBACK_REVIEW::Leave feedback]]'}, {name: 'Feedback Request - Star Image', value: '[[LINK_FEEDBACK_REQUEST_STARS]]'},
        //     {name: 'Feedback Request - Yellow Star Image', value: '[[LINK_FEEDBACK_REQUEST_YELLOW_STARS]]'}, {name: 'Feedback Request - Yellow Star Image (b)', value: '[[LINK_FEEDBACK_REQUEST_YELLOW_B_STARS]]'},
        //     {name: 'Feedback Request - Yellow Star Image (c)', value: '[[LINK_FEEDBACK_REQUEST_YELLOW_C_STARS]]'}, {name: 'Feedback Removal', value: '[[LINK_FEEDBACK_REMOVAL::Remove feedback]]'}]
        //
        // const variables = [{name: 'Company Name (GS)', value: '[[COMPANY_NAME]]'},
        //     {name: 'Uploaded Logo Image', value: '[[LOGO_IMAGE]]'}, {name: 'Customer - Full Name', value: '[[CUSTOMER_NAME]]'},
        //     {name: 'Customer - First Name', value: '[[CUSTOMER_FIRST_NAME]]'}, {name: 'Link - Contact Seller', value: '[[LINK_CONTACT_SELLER::Contact seller]]'},
        //     ];
        //
        //
        // const variableSet2 = [
        //     {name: 'View Order', value: '[[LINK_VIEW_ORDER::View Order]]'}, {name: 'View Order - Amazon Order Id', value: '[[LINK_VIEW_AMAZON_ORDER_ID]]'},
        //     {name: 'View Order', value: '[[LINK_STOREFRONT::Visit our store]]'}, {name: 'Shipment Tracking', value: '[[LINK_SHIPMENT_TRACKING::Track your shipment]]'},
        //     ];
        const content = (
            <Tabs defaultActiveKey="1">
                <TabPane tab="Buyer Related" key="1"><Table columns={columns} dataSource={variableBuyer} pagination={false} size="small" /></TabPane>
                <TabPane tab="Order Related" key="2"><Table columns={columns} dataSource={orderRelated} pagination={false} size="small" /></TabPane>
                <TabPane tab="Shipping Related" key="3"><Table columns={columns} dataSource={shippingRelated} pagination={false} size="small" /></TabPane>
                <TabPane tab="Links" key="4"><Table columns={columns} dataSource={variableLogos} pagination={false} size="small" /></TabPane>
                <TabPane tab="My  Logos" key="5"><Table columns={columns} dataSource={variableLinks} pagination={false} size="small" /></TabPane>
            </Tabs>

        );
        const text = <span>Select Email Variables</span>;
        return (
            <Popover className="template_variable_area" placement="top" title={text} content={content} trigger="click" visible={this.state.showPopover} onVisibleChange={this.handleClickChange}>
                <Button>Insert Variables</Button>
            </Popover>
        );
    }
}


export default CustomOption;

import { useState } from "react";
import React from 'react';
import CancelOrder from "../Cancel-order/Cancel_Order";
import "./summary_cancel.css";

export default function Summary_cancel(props){
    const [cancelDisplay, setCancelDisplay] = useState("none");
    const dataDetail = props.summaryData;
    const orders = dataDetail.orders;
    console.log(orders);

    const call = () => {
      props.setSummaryDisplay("none");
      setCancelDisplay("block");
    }
  
  return (
    <>
      <div id="summary_holder" style={{ display: props.summaryDisplay }}>
        <div id="summary_page">
          <div id="summary_header">
            <h3>Summary</h3>
            <i
              className="fa-solid fa-xmark "
              onClick={() => props.setSummaryDisplay("none")}
            ></i>
          </div>

          <div className="store_addrs">
            <select>
              <option>Jp Nagar</option>
            </select>
            <dl>
              <dt>
                <b>Store Address:</b>
              </dt>
              <dd>Near Phone booth, 10th road</dd>
            </dl>
            <dl>
              <dt>
                <b>Phone:</b>
              </dt>
              <dd>91 9999999999</dd>
            </dl>
          </div>
          <div className="pg-container">
            <div className="pg-bar">
              <div
                style={{
                  color: dataDetail.status === "Cancelled" ? "red" : "green",
                  width: dataDetail.status === "Cancelled" ? "460px" : "10px",
                  backgroundColor:
                    dataDetail.status === "Cancelled" ? "red" : "green",
                  height: "10px",
                  borderRadius: "5px",
                }}
              ></div>
              <span className="piked">pickedUp</span>
              <span className="wash">
                {dataDetail.status === "Cancelled" ? "" : "Washed"}
              </span>
              <span className="iron">
                {dataDetail.status === "Cancelled" ? "" : "Ironed"}
              </span>
              <span className="del">
                {dataDetail.status === "Cancelled" ? "Cancelled" : "Delivered"}
              </span>
            </div>
          </div>

          <div className="order_details">
            <p className="summary_title_name">Order Details</p>
            <div className="summary_orderlist">
              {props.visibility &&
                orders.map((data) => {
                  return (
                    <div
                      key={data.product_type}
                      className="summary_order_container"
                    >
                      <p className="summary_prodduct_type">
                        {data.product_type}
                      </p>
                      <p className="summary_wash_type">{data.wash_type}</p>
                      <p className="summary_qty">{`${data.quantity} X ${data.price} = `}</p>
                      <p className="single_total">
                        {Number(data.quantity) * Number(data.price)}
                      </p>
                    </div>
                  );
                })}
            </div>
            <p className="summary_sub_total">
              Sub total: {dataDetail.total_price - 90}
            </p>
            <p className="summary_pickup">Pickup Charges: 90</p>
            <div className="total_price">
              Total : Rs. {dataDetail.total_price}{" "}
            </div>
          </div>
          <div className="address_holder">
            <p className="address_title">Address</p>
            <div className="address_container">
              <address>
                <p>
                  <b>Home</b>
                </p>
                <p>{localStorage.getItem("address")}</p>
              </address>
              <address>
                <p>
                  <b>Other</b>
                </p>
                <p>#223, 10th road, Jp Nagar, Bangalore</p>
              </address>
              <button className="address_btn">ADD NEW</button>
            </div>
          </div>

          <button className="summary_cancel" onClick={() => call()}>
            Cancel
          </button>
        </div>
      </div>
      <CancelOrder
        display={cancelDisplay}
        setCancelDisplay={setCancelDisplay}
        orderId={props.orderId}
        ordersDetail={props.ordersDetail}
        setOrderDetail={props.setOrderDetail}
      />
    </>
  );
}

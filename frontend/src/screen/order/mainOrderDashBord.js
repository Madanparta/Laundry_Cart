import React, { useEffect, useState } from 'react';
import "../order/mainOrderDashBord.css";
import {Link, useNavigate} from "react-router-dom";
import CancelOrder from "./Cancel-order/Cancel_Order";
import Summary from "./Summary-cancel/Summary_cancel";


const API = "http://localhost:5000/api/";

const MainOrderDashBord = () => {

  // useEffect dependency are missing... 

  const navigate = useNavigate()
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/')
        }
    },[]);

    const [ordersDetail, setOrderDetail] = useState([]);
    const [cancelDisplay, setCancelDisplay] = useState("none");
    const [summaryDisplay, setSummaryDisplay] = useState("none")
    const [orderId, setOrderId] = useState(null);
    const [summaryData, setSummaryData] = useState([]);
    const [ordersDetailVisibility, setVisibility] = useState(false);

    let token = localStorage.getItem("token");

    const cancelOrder = (orderId) => {
      setCancelDisplay("block")
      setOrderId(orderId)
      console.log("orderid::",orderId)
  }


  const summary = (orderId, data) => {
    setSummaryDisplay("block");
    setOrderId(orderId);
    setSummaryData(data);
    setVisibility(true);
  };


  useEffect(() => {
    fetch(API + "/prevorder", {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data.orders);
        setOrderDetail(data.orders);
      });
  },[]);

  return (
    <>
      <div className="main_order_dashbord_container">
        <div className="orders-container">

          {/* side bar... */}

          <div className="orders-top-bar">
            {ordersDetail.length === 0 ? (
              <>
                <span className="orders-num">
                  <b>Orders | {ordersDetail.length}</b>
                </span>
                <span>
                  <input type="text" className="search-bar"></input>
                  <i className="search-icon fa fa-search"></i>
                </span>
              </>
            ) : (
              <>
                <span className="orders-num">
                  <b>Orders | {ordersDetail.length}</b>
                </span>
                <span>
                  <Link to={"/createorder"}>
                    <button className="some-create-btn">Create</button>
                  </Link>
                </span>
                <span>
                  <input type="text" className="search-bar"></input>
                  <i className="search-icon fa fa-search"></i>
                </span>
              </>
            )}
          </div>

          {/* Mian Page Design */}

          {ordersDetail.length === 0 ? (
            <>
              <div className="zero-order-page-main">
                <p>No Order Available</p>
                <Link to={"/createorder"}>
                  <button className="create-btn">Create</button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="some-order-page-main">
                <table>
                  <thead
                    className="table-header"
                    style={{ backgroundColor: "rgb(56,55,55)" }}
                  >
                    <tr>
                      <td>OrderId</td>
                      <td>Order Date</td>
                      <td> Store Location</td>
                      <td>City</td>
                      <td>Store Phone</td>
                      <td>Total Item</td>
                      <td>Price</td>
                      <td>Status</td>
                      <td> </td>
                      <td>View</td>
                    </tr>
                  </thead>
                  <tbody className="table-body">
                    {ordersDetail.map((data, i) => {
                      return (
                        <tr className="table-body" key={i}>
                          <td>{`OR000${i + 1}`}</td>
                          <td>{data.createdAt}</td>
                          <td>Noida</td>
                          <td>Ludhiana</td>
                          <td>9875421356</td>
                          <td>{data.orders.length}</td>
                          <td>{data.total_price} </td>
                          <td
                            style={{
                              color:
                                data.status === "Cancelled" ? "red" : "black",
                            }}
                          >
                            {data.status}
                          </td>
                          <td
                            className="cancel-order"
                            onClick={() => cancelOrder(data._id)}
                          >
                            Cancel Order
                          </td>
                          <td className="view-details">
                            <i
                              className="fa-solid fa-eye"
                              onClick={() => summary(data._id, data)}
                            ></i>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}

          <CancelOrder
            display={cancelDisplay}
            setCancelDisplay={setCancelDisplay}
            orderId={orderId}
            ordersDetail={ordersDetail}
            setOrderDetail={setOrderDetail}
          />

          <Summary
            summaryDisplay={summaryDisplay}
            summaryData={summaryData}
            setSummaryDisplay={setSummaryDisplay}
            orderId={orderId}
            ordersDetail={ordersDetail}
            setOrderDetail={setOrderDetail}
            visibility={ordersDetailVisibility}
          />
        </div>
      </div>
    </>
  );
}

export default MainOrderDashBord;


import"./summary.css";
import axios from "axios";
import tick from "../../../Images/tick.png";
import { useState } from "react";

export default function Summary(props){

    const [click , setClick] = useState(false)
    const [storeSelect,setstoreSelect] = useState(false);
    const [error,setError] = useState(false);
    const{summaryHandler,handleSucess,completeData} = props;
    const handletick = ()=>{
        setClick(true)
    }

    function handleStoreSelect(e){
        if(e.target.value === "-"){
            setstoreSelect(false);
        }else{
            setstoreSelect(true);
        }
    }

    return (
      <div id="summary_holder">
        <div id="summary_page">
          <div id="summary_header">
            <h3>Summary</h3>
            <i
              className="fa-solid fa-xmark "
              onClick={() => summaryHandler(false)}
            ></i>
          </div>
          <div className="store_addrs">
            <select onChange={handleStoreSelect}>
              <option>-</option>
              <option>Jp Nagar</option>
            </select>
            <dl>
              <dt>
                <b>Store Address:</b>
              </dt>
              <dd>{storeSelect ? "Near Phone booth, 10th road" : "-"}</dd>
            </dl>
            <dl>
              <dt>
                <b>Phone:</b>
              </dt>
              <dd>{storeSelect ? "91 9999999999" : "-"}</dd>
            </dl>
          </div>
          <div className="order_details">
            <p className="summary_title_name">Order Details</p>
            <div className="summary_orderlist">
              {completeData.orders.map((data) => {
                return (
                  <div
                    key={data.product_type}
                    className="summary_order_container"
                  >
                    <p className="summary_prodduct_type">{data.product_type}</p>
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
              Sub total : <span> {completeData.total_price - 90}</span>
            </p>
            <p className="summary_pickup">
              Pickup Charges: <span> 90</span>
            </p>
            <div className="total_price">
              Total : RS {completeData.total_price}{" "}
            </div>
          </div>
          <div className="address_holder">
            <p className="address_title">Address</p>
            <div className="address_container">
              <address>
                <p>
                  <b>Home</b>
                </p>
                {click ? (
                  <img
                    src={tick}
                    className="add-tick"
                    width="20px"
                    height="20px"
                    alt="tick"
                  />
                ) : (
                  ""
                )}
                <p onClick={handletick}>{localStorage.getItem("address")}</p>
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
          {error && (
            <span className="summary_error">
              Please select store and address
            </span>
          )}
          <button
            className="summary_confirm"
            onClick={() => {
              if (storeSelect && click) {
                // setClick(false)
                handleSucess(true);
                summaryHandler(false);
                // console.log(completeData);
                async function postCall() {
                  try {
                    let url = process.env.REACT_APP_API + "/createorder";
                    await axios(url, {
                      method: "post",
                      data: completeData,
                      headers: {
                        authorization: localStorage.getItem("token"),
                      },
                    });
                  } catch (e) {}
                }
                postCall();
              } else {
                setError(true);
              }
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    );
}
import React from 'react';
import "./createrOrder.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useReducer } from "react";
import Orders from "./Orders/Orders";
import Summary from "../Summary/Summary";
import SuccessOrder from './SuccessOrder/SuccessOrder';



import {ProductRouter} from "./Operation/ProductRouter";
import {CompleteDataOperation} from "./Operation/CompleteDataOperation";

const API = "https://laundry-cart-madan.onrender.com";


const CreaterOrder = () => {

    const navigate = useNavigate();

    const initialData = {
        orders:[],
        total_price:90,
        status:"Ready to pickup"
    }

    const[completeData,setCompleteData] = useState(initialData);

    function completeDataUpdate(productData){
        CompleteDataOperation(productData,setCompleteData);
    }

    
    const[error,setError] = useState(false);

    const[success, setSuccess] = useState(false);
    
    function handleSucess(condition){
        setSuccess(condition);
    }
    
    const [summaryTg,setSummaryTg] = useState(false);
    
    function summaryHandler(condition){
        setSummaryTg(condition);
    }
    

    const [productData,productDispatcher] = useReducer(ProductRouter,[]);

    useEffect(()=>{
        const url = API +"/product";
        async function FCall(){
            try{
              const response = await axios(url,{
                  headers:{
                      authorization: localStorage.getItem('token'),
                  }
              })
            //  console.log(response.data);
             productDispatcher({type:"initLoad",payload:{data:response.data}})
  
           }
           catch(e){
              console.log(e.response.data);
              navigate("/");
           }
         }
         FCall(); 
      },[navigate]);

  return (
    <>
    <div id="creat_order_cointainer">
    <div id="title_holder">
        <h3 id="create_order_heading">Create order</h3>
        <input id="create_order_search" type="text" name="createOrderSearch" />
    </div>
    <div id="product_main_content" >
        <div className="order_title" >
            <h3 className="product_titles">Product Types</h3>
            <h3 className="product_titles">Quantity</h3>
            <h3 className="product_titles">Wash Type</h3>
            <h3 className="product_titles">Price</h3>
            <h3 className="product_titles"> </h3>
        </div>
        { productData.length !== 0 && productData.map(data=>{
                
                return <Orders 
                key ={data.id} 
                data = {data} 
                productDispatcher={productDispatcher}
                />

            })
            
        }

    </div>
    <div id="proceed_btn_section">
        {
            error && <span>please select quantity and wash type</span>
        }
        <button id="cancel_btn"
        onClick={()=>{
            navigate("/order");
        }}
        >Cancel</button>
        <button onClick={()=>{
            let flag = false;
            for(let i = 0; i < productData.length; i++){
                if(productData[i].quantity > 0 && productData[i].price > 0 ){
                    flag = true;
                    break;
                }
            }
            if(flag){
                summaryHandler(true);
                completeDataUpdate(productData)
            }else{
                setError(true);
            }

            }} 
        id="proceed_btn">Proceed</button>
    </div>
    </div>

    {/* Footer.... */}

    {summaryTg &&<div>
    <Summary 
        completeData={completeData}
        summaryHandler={summaryHandler}
        handleSucess={handleSucess}
        />
    </div>
    }
    {success &&
    <SuccessOrder/>
    }
    </>
  )
}

export default CreaterOrder
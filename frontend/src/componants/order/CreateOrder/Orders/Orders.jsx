import "./orders.css"


export default function Orders(props){
    const {data,productDispatcher} = props;
    return<div className="order_container">
        <div className="product_detail">
        <img className="product_img" src={data.icon} alt={data.product_type}/>
        <h4 className="product_heading">{data.product_type}</h4>
        <dd className="product_description">{data.description}</dd>
        </div>
        <div className="inputcontainer">
            <input className="product_input"
             type={"number"} 
             value={data.quantity}
             min={0}
             onChange={(e)=>{
                productDispatcher({type:"quantity",payload:{id:data.id,value:e.target.value}})
             }}
             />
        </div>
        <div className="washType_container">
            
            <img 
            src={`./images/icon-for-createorder/washing-machine${data.washing_types.wash.status ? "-blue" : ""}.svg` } 
            alt="wash"
            onClick={()=>{
                productDispatcher({type:"wash",payload:{id:data.id,price:data.washing_types.wash.price}})
            }}
            />
            <img 
            src={`./images/icon-for-createorder/ironing${data.washing_types.press.status ? "-blue" : ""}.svg` } 
            alt="press"
            onClick={()=>{
                productDispatcher({type:"press",payload:{id:data.id,price:data.washing_types.press.price}})
            }}
            />
            <img 
            src={`./images/icon-for-createorder/towel${data.washing_types.fold.status ? "-blue" : ""}.svg` } 
            alt="fold"
            onClick={()=>{
                productDispatcher({type:"fold",payload:{id:data.id,price:data.washing_types.fold.price}})
            }}
            />
            <img 
            src={`./images/icon-for-createorder/bleach${data.washing_types.pack.status ? "-blue" : ""}.svg` } 
            alt="pack"
            onClick={()=>{
                productDispatcher({type:"pack",payload:{id:data.id,price:data.washing_types.pack.price}})
            }}
            />
        </div>
        <div className="price_container">
            {data.quantity >0 && data.price > 0 ? <div className="price_holder">{`${data.quantity} X ${data.price}`} = <span>{`${data.quantity*data.price}`}</span></div>:"-" }
        </div>
        <div className="button_container">
        {data.quantity >0 || data.price > 0 ?             <button className="reset_btn" onClick={()=>{
                productDispatcher({type:"reset",payload:{id:data.id}})
            }} >Reset</button> 
            :
            ""}

        </div>
    </div>
}
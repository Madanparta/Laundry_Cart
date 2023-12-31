import { useNavigate } from "react-router-dom";
import "./successOrder.css";
import successImg from "../../../../Images/tick.png"

export default function SuccessOrder(props){

    const navigate = useNavigate();
    return<div className="success_holder">
        <div className="success_component">
            <img className="success_img" src={successImg} alt="tick"/>
            <h4>Your order is <br/> successfully placed</h4>
            <p>You can track the delivery in the <br/> "Orders" section</p>
            <button onClick={()=>navigate("/order")} >Go to Orders</button>
        </div>
    </div>
}

export function completeDataOperation(productData,setCompleteData){
    setCompleteData(prev=>{
        let temp = {...prev};
        let proData = [...productData];
        


        temp.orders=[];
        temp.total_price = 90;
        proData.map(data=>{

            if(data.quantity > 0 && data.price > 0){

                let washType = "";

                 
                    if( data.washing_types.pack.status){
                        washType = data.washing_types.pack.type + "," + washType;
                        
                    }
                    if(data.washing_types.fold.status){
                        washType = data.washing_types.fold.type + "," + washType;
                        
                    }
                    if(data.washing_types.press.status){
                        washType = data.washing_types.press.type + "," + washType;
                        
                    }
                    if(data.washing_types.wash.status){
                        washType = data.washing_types.wash.type + "," + washType;
                        
                    }


                 temp.orders.push({
                    product_type: data.product_type,
                    quantity:data.quantity,
                    wash_type:washType,
                    price:data.price
                 })

                temp.total_price = temp.total_price + (data.price*data.quantity);
                
            }
            return data;
        })

         

        return temp;
    })
}

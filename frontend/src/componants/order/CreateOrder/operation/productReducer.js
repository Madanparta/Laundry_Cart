export  function productReducer(state,action){

    switch(action.type){
        case "initLoad":{
            return action.payload.data;
        }
        case "quantity":{
            let temp = [...state];
            temp.map(data=>{
                if(data.id === action.payload.id){
                    data.quantity = action.payload.value;
                }
                return data;
            })
            return temp;
        }
        case "wash":{
            let temp =[...state]
            temp.map(data=>{
                if(data.id === action.payload.id){
                    
                    data.washing_types.wash.status = !data.washing_types.wash.status;
                    
                    if(data.washing_types.wash.status){
                        data.price = data.price + action.payload.price;  
                    }else{
                        data.price = data.price - action.payload.price;
                    }
                }
                return data;
            })
            return temp;
        }
        case "fold":{
            let temp =[...state]
            temp.map(data=>{
                if(data.id === action.payload.id){
                    data.washing_types.fold.status = !data.washing_types.fold.status;
                    if(data.washing_types.fold.status){
                        data.price = data.price + action.payload.price;
                    }else{
                        data.price = data.price - action.payload.price;
                        
                    }
                }
                return data;
            })
            return temp;
        }
        case "press":{
            let temp =[...state]
            temp.map(data=>{
                if(data.id === action.payload.id){
                    data.washing_types.press.status = !data.washing_types.press.status;
                    if(data.washing_types.press.status){
                        
                        data.price = data.price + action.payload.price;
                    }else{
                        data.price = data.price - action.payload.price;
                    }
                }
                return data;
            })
            return temp;
        }
        case "pack":{
            let temp =[...state]
            temp.map(data=>{
                if(data.id === action.payload.id){
                    data.washing_types.pack.status = !data.washing_types.pack.status;
                    if(data.washing_types.pack.status){
                        
                        data.price = data.price + action.payload.price;
                    }else{
                        data.price = data.price - action.payload.price;
                        
                    }
                    
                }
                return data;
            })
            return temp;
        }
        case "reset":{
            let temp = [...state];
            temp.map(data=>{
                if(data.id === action.payload.id){
                    data.quantity = 0;
                    data.price = 0;
                    data.washing_types.wash = {...data.washing_types.wash,status : false};
                    data.washing_types.press = {...data.washing_types.press,status : false};
                    data.washing_types.fold = {...data.washing_types.fold,status : false};
                    data.washing_types.pack = {...data.washing_types.pack,status : false};
                }
                return data;
            })
            
            return temp;
        }
        default:{
            return state;
        }
    }

}
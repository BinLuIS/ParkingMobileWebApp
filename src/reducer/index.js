const initialState ={
    orders: [],
    
};
export default (state = initialState, {type, payload}) => {
    switch (type){
        case "":
            return {orders: state.orders.concat(payload)};
       
    default:
        return state;
    }
    
    }

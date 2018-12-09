const initialState ={
    orders: []
};
export default (state = initialState, {type, payload}) => {
    switch (type){
        case "ADD_NEW_ORDER_REQUEST":
        return {orders: state.orders.concat(payload)};

       
    default:
        return state;
    }
    
    }

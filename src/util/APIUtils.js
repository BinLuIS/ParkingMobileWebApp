import { BASE_URL, API_BASE_URL, POLL_LIST_SIZE, ACCESS_TOKEN, CLERK_ID } from '../constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

export function login(loginRequest) {
    console.log("login /auth/signin")
    return request({
        url: API_BASE_URL + "/auth/signin",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function checkUsernameAvailability(username) {
    return request({
        url: API_BASE_URL + "/user/checkUsernameAvailability?username=" + username,
        method: 'GET'
    });
}

export function checkEmailAvailability(email) {
    return request({
        url: API_BASE_URL + "/user/checkEmailAvailability?email=" + email,
        method: 'GET'
    });
}


export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        console.log("No access token")
        return Promise.reject("No access token set.");
    }
    console.log('getAccessToken')
    console.log(localStorage.getItem(ACCESS_TOKEN))
    console.log("getCurrentUser call api /user/me")
    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}

export function getCurrentParkingClerk(userid) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/users/" + userid,
        method: 'GET'
    });
}

//requestFormPage
export function addParkOrder(order){
    return request({
        url: BASE_URL + "/orders",
        method: 'POST',
        mode: 'cors', 
        body: JSON.stringify(order)
    });
}

//pickAcceptedOrderCarPage
export function checkParkingLotParkingOrder(lotId,order){
    return request({
        url: BASE_URL + '/parkinglots/'+lotId+'/orders',
        method: 'POST',
        mode: 'cors', 
        body: JSON.stringify(order)
    });
}

//pickAcceptedOrderParkingLocationPage
export function getParkingClerksParkinglot(parkingClerkId){
    return request({
        // url: BASE_URL + '/parkingclerks/'+parkingClerkId+"/parkinglots",
        url: BASE_URL + '/parkingclerks/'+localStorage.getItem(CLERK_ID)+"/parkinglots",
        method: 'GET'
    });
}

//viewAcceptedOrderPage
export function getClerksprocessingOrders(parkingClerkId){
    return request({
        // url: BASE_URL + '/parkingclerks/'+parkingClerkId+"/orders?status=accepted,parked,pendingFetching",
        url: BASE_URL + '/parkingclerks/'+localStorage.getItem(CLERK_ID)+"/orders?status=accepted,parked,pendingFetching",
        method: 'GET'
    });
}

export function getOrderByCarNumber(carNumber){
    return request({
        url: BASE_URL + "/orders?carNumber="+carNumber,
        method: 'GET'
    });
}

export function changeOrderStatus(orderId,changeStatusRequest){
    return request({
        url: BASE_URL + "/orders/"+orderId,
        method: 'PATCH',
        mode: 'cors', 
        body: JSON.stringify(changeStatusRequest)
    });
}

//viewAllOrderPage
export function getUngrabedOrder(){
    return request({
        url: BASE_URL + "/orders?status=pendingParking",
        method: 'GET'
    });   
}

export function grabPendingOrder(parkingClerkId,changeStatusRequest){
    return request({
        // url: BASE_URL + "/parkingclerks/"+parkingClerkId+"/orders",
        url: BASE_URL + "/parkingclerks/"+localStorage.getItem(CLERK_ID)+"/orders",
        method: 'POST',
        mode: 'cors', 
        body: JSON.stringify(changeStatusRequest)
    });
}

//viewHistoryOrderPage
export function getCompletedOrder(parkingClerkId){
    return request({
        // url: BASE_URL + '/parkingclerks/'+parkingClerkId+'/orders?status=completed',
        url: BASE_URL + '/parkingclerks/'+localStorage.getItem(CLERK_ID)+'/orders?status=completed',
        method: 'GET'
    }); 
}

//viewPersonalPage
export function getParkingClerkDetail(parkingClerkId){
    return request({
        // url: BASE_URL + '/parkingclerks/'+parkingClerkId+'/orders?status=completed',
        url: BASE_URL + '/parkingclerks/'+localStorage.getItem(CLERK_ID),
        method: 'GET'
    }); 
}
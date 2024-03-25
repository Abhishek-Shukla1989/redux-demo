
const initialStateCustomer={
	fullName:"",
	nationalId:"",
	createdAt:""

}

export default function customerReducer(state = initialStateCustomer,action)
{
	switch(action.type)
	{
		case "customer/createCustomer":
		return {...state, fullName:action.payload.fullName, nationalId:action.payload.nationalId, createdAt:action.payload.createdAt}

		case "customer/updateCustomerName":
		return {...state, fullName:action.payload}

		default:
		return {...state}

	}
}
//Customer action creators

export function createCustomer(fullname,nationalId)
{
	return ({type:"customer/createCustomer", payload:{fullName:fullname, nationalId:nationalId, createdAt:new Date().toDateString()}})
}


export function updateCustomerName(fullName)
{
	return ({type:"customer/updateCustomerName",payload:{fullName:fullName}})
}


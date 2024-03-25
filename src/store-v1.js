import { combineReducers, createStore } from "redux"
const initialState = {
	balance:0,
	loanAmount:0,
	purpose:""
}

function accountReducer(state = initialState,action)
{
	switch(action.type)
	{
		case "account/deposit":
		return {...state, balance:state.balance+action.payload}

		case "account/withdrawl":
		return {...state, balance:state.balance-action.payload}

		case "account/requestLoan":
		    if(state.loanAmount>0) return state
			return {...state, loanAmount:action.payload.amount, purpose:action.payload.purpose,balance:state.balance+action.payload.amount}

	   case "account/payLoan":
			return {...state, loanAmount:0,purpose:"", balance:state.balance-state.loanAmount}

		default:
		return {...state}

	}
}


const initialStateCustomer={
	fullName:"",
	nationalId:"",
	createdAt:""

}

function customerReducer(state = initialStateCustomer,action)
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



const rootReducer = combineReducers({
	account:accountReducer,
	customer:customerReducer
})
const store = createStore(rootReducer)
/*
store.dispatch({type:"account/deposit", payload:500})

console.log(store.getState())
store.dispatch({type:"account/withdrawl", payload:200})

console.log(store.getState())

store.dispatch({type:"account/requestLoan", payload:{amount:1000, purpose:"buy car"}})

console.log(store.getState())

store.dispatch({type:"account/payLoan"})

console.log(store.getState())
*/


function deposit(amount)
{
 return {type:"account/deposit", payload:amount}
}
store.dispatch(deposit(500)) 
console.log(store.getState())


function withdraw(amount)
{
  return {type:"account/withdrawl", payload:amount}
}
store.dispatch(withdraw(200))
console.log(store.getState())


function requestLoan()
{
  return {type:"account/requestLoan", payload:{amount:1000, purpose:"buy car"}}
}
 store.dispatch(requestLoan())
 console.log(store.getState())

function returnLoan()
{
  return {type:"account/payLoan"}
}
store.dispatch(returnLoan())
console.log(store.getState())

//Customer action creators

function createCustomer(fullname,nationalId)
{
	return ({type:"customer/createCustomer", payload:{fullName:fullname, nationalId:nationalId, createdAt:new Date().toDateString()}})
}


function updateCustomerName(fullName)
{
	return ({type:"customer/updateCustomerName",payload:{fullName:fullName}})
}

store.dispatch(createCustomer("Delta", "America@12#$"))
console.log(store.getState())

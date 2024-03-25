import axios from "axios"

const initialState = {
	balance:0,
	loanAmount:0,
	purpose:"",
	isLoading:false
}

export default function accountReducer(state = initialState,action)
{
	switch(action.type)
	{
		case "account/deposit":
		return {...state,isLoading:false, balance:state.balance+action.payload}

		case "account/withdrawl":
		return {...state, balance:state.balance-action.payload}

		case "account/requestLoan":
		    if(state.loanAmount>0) return state
			return {...state, loanAmount:action.payload.amount, purpose:action.payload.purpose,balance:state.balance+action.payload.amount}

	   case "account/payLoan":
			return {...state, loanAmount:0,purpose:"", balance:state.balance-state.loanAmount}
		case "account/convertingCurrency":
				return {...state, isLoading:true}
		default:
		return {...state}

	}
}

//Account action creators
export function deposit(amount,currency)
{

	if(currency === "USD") return {type:"account/deposit", payload:amount}
	return async  function (dispatch, getState)
	{
		dispatch({type:"account/convertingCurrency"})
		console.log(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`)
      // Api call here
     const response =  await axios.get(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`)
     console.log(response.status === 200)
	 if(response.status === 200)
	 {
		dispatch({type:"account/deposit", payload:response.data.rates.USD})
	 }
	}
}


export function withdraw(amount)
{
  return {type:"account/withdrawl", payload:amount}
}


export function requestLoan(amount, purpose)
{
  return {type:"account/requestLoan", payload:{amount:amount, purpose:purpose}}
}

export function returnLoan()
{
  return {type:"account/payLoan"}
}

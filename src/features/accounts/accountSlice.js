
const initialState = {
	balance:0,
	loanAmount:0,
	purpose:""
}

export default function accountReducer(state = initialState,action)
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


export function deposit(amount)
{
 return {type:"account/deposit", payload:amount}
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

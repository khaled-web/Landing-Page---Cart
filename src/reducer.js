import CartItem from "./CartItem"

const reducer = (state, action)=>{
 //Action.ClearAll
 if(action.type === 'CLEAR_CART'){
  return {...state,cart:[]}
 }
 //Action.RemoveSingleItem
 if(action.type === 'REMOVE_SINGLE'){
  return{...state, cart:state.cart.filter((item)=>item.id !== action.payload)}
 }
 //Action.increaseSingleItem
 if(action.type === 'INCREASE'){
  const tempCart = state.cart.map((cartItem)=>{
   if(cartItem.id === action.payload){
     return{...cartItem, amount:cartItem.amount + 1}
   }
   return cartItem//import
  })
  return{...state, cart:tempCart}
 }
 //Action.decreaseSingleItem
 if(action.type==='DECREASE'){
  const tempCart = state.cart.map((cartItem)=>{
   if(cartItem.id === action.payload){
    return{...cartItem, amount:cartItem.amount -1}
   }
   return cartItem//important
  }).filter((cartItem)=>cartItem.amount!==0)//importantToRemove..Item=0
  return{...state, cart:tempCart}
 }
  //Action.CalculateTotals
  if(action.type === 'GET_TOTALS'){
   let {total, amount}=state.cart.reduce((cartTotal,cartItem)=>{
    const {price, amount}=cartItem;
    const itemTotal = price*amount;

    cartTotal.total += itemTotal
    cartTotal.amount += amount;
    return cartTotal
   },{
    total:0,
    amount:0
   })
   total = parseFloat(total.toFixed(2))
   return{...state, amount, total}
  }
  //Action.Loading
  if(action.type === 'LOADING'){
    return {...state, loading:true}
  }
  //Action.displayItemsAfterFetchingData
  if(action.type === 'DISPLAY_ITEMS'){
    return {...state, cart:action.payload,loading:false}
  }

    
 return state
}
export default reducer
import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

const initialState = {
  loading:false,
  cart:cartItems,
  total:0,
  amount:0, 
}
const AppProvider = ({ children }) => {
  //useReducerItems
  const [state, dispatch] = useReducer(reducer, initialState)
  //ReducerFunctions-clearCart
  const clearCart = ()=>{
    dispatch({type:'CLEAR_CART'})
  }
  //ReducerFunctions-RemoveSingleItem
  const removeSingleItem = (id)=>{
    dispatch({type:'REMOVE_SINGLE',payload:id})
  }
  //ReducerFunctions-increasingSingleItem
  const increase = (id)=>{
    dispatch({type:'INCREASE', payload:id})
  }
  //ReducerFunctions-decreasingSingleItem
  const decrease = (id)=>{
    dispatch({type:'DECREASE', payload:id})
  }
  //ReducerFunctions-FetchData
  const fetchData = async ()=>{  //async--fetchingData
    dispatch({type:'LOADING'})
    const response = await fetch(url)
    const cart = await response.json()
    dispatch({type:'DISPLAY_ITEMS', payload:cart})
  }
  //useEffectNo.01
  useEffect(()=>{
    fetchData()
  },[])
  //useEffectNo.02
  useEffect(()=>{
    dispatch({type:'GET_TOTALS'})//totalAtNavBar
  },[state.cart])
  return (
    <AppContext.Provider value={{...state, clearCart,removeSingleItem,increase, decrease}}>
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }

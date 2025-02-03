import React from 'react'

function ThankuPage() {
  return (
    <div><h2 className='text-success'>
        Your order has been placed successfully. Thank you for shopping with us!
        <button className='btn btn-primary' onClick={()=>{
          window.location.href='/'
        }}>Continue Shopping</button>
        </h2></div>
  )
}

export default ThankuPage
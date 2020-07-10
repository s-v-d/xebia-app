import React from 'react'

import './../styles/Cart.scss'

const Cart = ({ cart, open }) => {
  return <div className={`Cart__div ${open ? 'show' : 'hide'}`}>
    { cart.length > 0 ?
    cart.map(item => {
      return <div key={item.id} className='cart-item'>
        <div className='image-container'>
          <img src={item.image} alt={item.title} />
        </div>
        <div className='product-details'>
          <div className='title'>{item.title}</div>
          <div className='qty'>Quantity: {item.quantity}</div>
        </div>
      </div>
    })
    : <div>Cart is empty</div>
    }
  </div>
}

export default Cart

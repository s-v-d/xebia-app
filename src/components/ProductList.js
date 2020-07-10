import React, { useEffect, useState } from 'react'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'

import { getProductList, getProductFilters } from '../api/products.api'
import Cart from './Cart'

import '../styles/ProductList.scss'

const ProductList = ({ history }) => {
  const [products, setProducts] = useState([])
  const [allProducts, setAllProducts] = useState([])
  const [brand, setBrand] = useState([])
  const [selectedBrands, setSelectedBrands] = useState([])
  const [colors, setColor] = useState([])
  const [price, setPrice] = useState([])
  const [cart, setCart] = useState([])
  const [openCart, setOpenCart] = useState(false)

  const [loggedInUser, setLoggedInUser] = useState('')
  const [searchKey, setSearchKey] = useState('')

  useEffect(() => {
    getProductList().then((response) => {
      setProducts(response)
      setAllProducts(response)
    })
    getProductFilters().then((response) => {
      const brand = response.find((item) => item.type === 'BRAND')
      setBrand(get(brand, 'values', []))
      const color = response.find((item) => item.type === 'COLOUR')
      setColor(get(color, 'values', []))
      const price = response.find((item) => item.type === 'PRICE')
      setPrice(get(price, 'values', []))
    })
    const user = localStorage.getItem('loggedInUser')
    if (!isEmpty(user)) {
      setLoggedInUser(JSON.parse(user).fullName)
    }
  }, [])

  useEffect(() => {
    getProductList(searchKey).then((response) => {
      setProducts(response)
    })
  }, [searchKey])

  const onAddCart = (product) => {
    const cartItems = [...cart]
    const index = cartItems.findIndex((item) => item.id === product.id)
    if (index > -1) {
      cartItems[index].quantity++
    } else {
      cartItems.push({ ...product, quantity: product.quantity || 1 })
    }
    setCart(cartItems)
  }

  const onBrandFilterSelect = (value) => {
    const brands = [...selectedBrands]
    const index = brands.indexOf(value)
    if (index > -1) {
      brands.splice(index, 1)
    } else {
      brands.push(value)
    }
    setSelectedBrands(brands)
    if (brands.length === 0) {
      setProducts(allProducts)
    } else {
      setProducts(allProducts.filter((item) => brands.includes(item.brand)))
    }
  }

  const logout = () => {
    localStorage.removeItem('loggedInUser')
    history.push('/login')
  }

  return (
    <div className='ProductList__div'>
      <Cart cart={cart} open={openCart} />
      <div className='header-bar'>
        <h3>sCart</h3>
        <div className='search-field'>
          <input
            type='text'
            placeholder='Search Products'
            onChange={(e) => setSearchKey(e.target.value)}
            value={searchKey}
          />
        </div>
        {!isEmpty(loggedInUser) && (
          <div>
            Welcome {loggedInUser} {' '}
            <button type='button' onClick={() => setOpenCart(!openCart)}>
              Cart ({cart.length})
            </button>
            <button type='button' onClick={logout}>
              Logout
            </button>
            
          </div>
        )}
      </div>

      <div className='products'>
        <div className='filter-section'>
          Filters
          <div>
            <h5>Brand</h5>
            <div className='brand-filters'>
              {brand.map((item, i) => (
                <div key={`${item.value}-${i}`}>
                  <input
                    type='checkbox'
                    value={item.value}
                    checked={selectedBrands.includes(item.value)}
                    onChange={(e) => onBrandFilterSelect(e.target.value)}
                  />{' '}
                  {item.title}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h5>Color</h5>
            <div className='color-filters'>
              {colors.map((item, i) => (
                <div key={`${item.color}-${i}`}>
                  <input type='checkbox' value={item.color} /> {item.title}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h5>Price</h5>
            <div className='price-filters'>
              {price.map((item, i) => (
                <div key={`${item.key}-${i}`}>
                  <input type='checkbox' value={item.key} /> {item.displayValue}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='product-list'>
          {products.length > 0 ? (
            products.map((item) => {
              return (
                <div className='product-list-item' key={item.id}>
                  <div className='image-container'>
                    <img src={item.image} alt={item.title} />
                    {item.discount > 0 && (
                      <span className='discount'>{item.discount}%</span>
                    )}
                  </div>

                  <div className='product-details'>
                    <div className='align-content'>
                      <div className='title'>{item.title}</div>
                      <div
                        className='color'
                        style={{ background: item.colour.color }}
                      />
                    </div>

                    <div className='align-content'>
                      <div className='brand'>{item.brand}</div>
                      <button type='button' onClick={() => onAddCart(item)}>
                        Add
                      </button>
                    </div>

                    <div>
                      {item.price.mrp > 0 && (
                        <>
                          <strike className='mrp'>₹ {item.price.mrp}</strike>{' '}
                        </>
                      )}
                      ₹ {item.price.final_price}
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div className='no-data'>No items available</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductList

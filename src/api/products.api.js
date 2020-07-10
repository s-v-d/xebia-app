import isEmpty from 'lodash/isEmpty'

const getProductList = (searchKey) => {
  let url = 'https://xebiascart.herokuapp.com/products'
  if (!isEmpty(searchKey)) {
    url += `?title=${searchKey}`
  }
  return fetch(url).then((response) => response.json())
}

const getProductFilters = () =>
  fetch('https://xebiascart.herokuapp.com/filters')
    .then((response) => response.json())
    .then((data) => data)

export { getProductList, getProductFilters }

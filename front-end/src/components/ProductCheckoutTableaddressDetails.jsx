import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import calculatesTotalPrice from '../helpers/calculatesTotalPrice';
import MyContext from '../contexts/MyContext';
import requestCreateSales from '../services/requestCreateSales';

function ProductCheckoutTableaddressDetails() {
  const { sellers } = useContext(MyContext);
  const [address, setAddress] = useState('');
  const [addressNumber, setAddressNumber] = useState('');
  const [sellerId, setSellerId] = useState(0);
  const history = useHistory();

  useEffect(() => {
    if (sellers.length > 0) setSellerId(sellers[0].id);
  }, [sellers]);

  const finishSale = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const products = JSON.parse(localStorage.getItem('carrinho'));
    const sale = {
      userId: user.id,
      sellerId,
      totalPrice: calculatesTotalPrice(products),
      deliveryAddress: address,
      deliveryNumber: addressNumber,
      products: products.map((product) => (
        { productId: product.id, quantity: product.quantity }
      )),
    };
    const request = await requestCreateSales(sale, user.token);

    if (!request.message) {
      return history.push(`/customer/orders/${request.id}`);
    }
  };

  return (
    <div>
      <select
        data-testid="customer_checkout__select-seller"
        onChange={ ({ target }) => setSellerId(target.value) }
      >
        {sellers?.map((seller) => (
          <option key={ seller.name } value={ seller.id }>{seller.name}</option>
        ))}
      </select>
      <input
        type="text"
        data-testid="customer_checkout__input-address"
        value={ address }
        onChange={ (e) => setAddress(e.target.value) }
      />
      <input
        type="number"
        data-testid="customer_checkout__input-address-number"
        value={ addressNumber }
        onChange={ (e) => setAddressNumber(e.target.value) }
      />
      <button
        type="button"
        data-testid="customer_checkout__button-submit-order"
        onClick={ finishSale }
      >
        {' '}
        FINALIZAR PEDIDO

      </button>
    </div>
  );
}

// ProductCheckoutTableaddressDetails.propTypes = {
//   sellers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
// };

export default ProductCheckoutTableaddressDetails;

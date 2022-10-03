import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCheckoutTableRow from '../components/ProductCheckoutTableRow';
import calculatesTotalPrice from '../helpers/calculatesTotalPrice';
import Header from '../components/Header';
import requestGetByIdSale from '../services/requestGetByIdSale';
import getFromLocalStorage from '../helpers/getFromLocalStorage';
import requestUpdateSaleStatus from '../services/requestUpdateSaleStatus';
import convertToBrazilianCurrency from '../helpers/convertToBrazilianCurrency';

function CustomerOrders() {
  const [dates, setDates] = useState('');
  const [salesById, setSalesById] = useState({});
  const { id } = useParams();
  const { token } = getFromLocalStorage('user');
  const ten = 10;

  useEffect(() => {
    const handle = async () => {
      const saleById = await requestGetByIdSale(token, id);
      const date = saleById.saleDate.slice(0, ten).split('-').reverse().join('/');
      console.log(date);
      setDates(date);
      setSalesById(saleById);
    };
    handle();
  }, [token, id]);

  const updateStatus = async (status) => {
    const request = await requestUpdateSaleStatus(token, id, status);
    if (request.message) return console.log(request.message);

    const requestNewSale = await requestGetByIdSale(token, id);

    setSalesById(requestNewSale);
  };

  const renderTable = () => (
    <table className="border-separate border-spacing-2 border shadow">
      <thead>
        <tr>
          <th className="border shadow px-2 rounded">Item</th>
          <th className="border shadow px-2 rounded">Descrição</th>
          <th className="border shadow px-2 rounded">Quabtidade</th>
          <th className="border shadow px-2 rounded">Valor Unitário</th>
          <th className="border shadow px-2 rounded">Sub-total</th>
        </tr>
      </thead>
      <tbody>
        {(salesById.products) && (
          salesById.products.map((element, i) => (
            <ProductCheckoutTableRow
              key={ i }
              element={ element }
              calculatesTotalPrice={ calculatesTotalPrice }
              i={ i }
            />
          )))}
      </tbody>
    </table>
  );

  const dataIdName = 'customer_order_details__element-order-details-label-seller-name';
  const dataIdDate = 'customer_order_details__element-order-details-label-order-date';
  const idStatus = 'customer_order_details__element-order-details-label-delivery-status';

  return (
    <div>
      <Header />
      <h1>Detalhe do Pedido</h1>
      <div>
        <h2
          data-testid="customer_order_details__element-order-details-label-order-id"
        >
          {salesById?.id }
        </h2>
        <div>
          <h2
            data-testid={ dataIdName }
          >
            {salesById.seller?.name}
          </h2>
        </div>
        <h2 data-testid={ dataIdDate }>
          {dates || ''}
        </h2>
        <h2 data-testid={ idStatus }>{salesById?.status}</h2>
        <button
          type="button"
          data-testid="customer_order_details__button-delivery-check"
          onClick={ () => updateStatus('Entregue') }
          disabled={ salesById.status !== 'Em Trânsito' }
        >
          MARCAR COMO ENTREGUE
        </button>
      </div>
      {renderTable()}
      <p
        data-testid="customer_order_details__element-order-total-price"
      >
        {convertToBrazilianCurrency(salesById.totalPrice)}

      </p>
    </div>
  );
}

export default CustomerOrders;

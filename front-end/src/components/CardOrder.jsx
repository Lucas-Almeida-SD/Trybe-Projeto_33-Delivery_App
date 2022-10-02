import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import convertToBrazilianCurrency from '../helpers/convertToBrazilianCurrency';
import convertDate from '../helpers/convertDate';

export default function CardOrder(props) {
  const { sales, page } = props;

  const history = useHistory();

  const redirect = (element) => history.push(`/${page}/orders/${element.id}`);

  return (
    <div>
      {sales?.map((element, i) => (
        <div key={ i }>
          <button
            type="button"
            onClick={ () => redirect(element) }
          >
            <p data-testid={ `${page}_orders__element-order-id-${element.id}` }>
              {element.id}
            </p>
            <p data-testid={ `${page}_orders__element-delivery-status-${element.id}` }>
              {element.status}
            </p>
            <p data-testid={ `${page}_orders__element-order-date-${element.id}` }>
              {convertDate(element.saleDate)}
            </p>
            <p data-testid={ `${page}_orders__element-card-price-${element.id}` }>
              {convertToBrazilianCurrency(element.totalPrice)}
            </p>
            {(page === 'seller') && (
              <p data-testid={ `${page}_orders__element-card-address-${element.id}` }>
                {`${element.deliveryAddress}, ${element.deliveryNumber}`}
              </p>
            )}
          </button>
        </div>
      ))}

    </div>
  );
}

CardOrder.propTypes = {
  sales: PropTypes.array,
  page: PropTypes.string,
}.isRequired;

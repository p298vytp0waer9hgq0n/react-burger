import PropTypes from 'prop-types';

export const ingredientType = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
  type: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export const orderType = {
  _id: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired
};

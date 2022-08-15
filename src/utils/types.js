import PropTypes from 'prop-types';

export const ingredientType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
  type: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
});

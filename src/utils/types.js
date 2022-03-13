import PropTypes from 'prop-types';

export const ingredientPropTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

import PropTypes from 'prop-types';

export const ingredientPropTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  handleDelete: PropTypes.func,
  type: PropTypes.string.isRequired,
};

export type THttpPath = {
  [key: string]: string | ((path: string) => string);
};

export type TCommon = { [key: string]: string };

export type THttpMethod =
  | 'head'
  | 'get'
  | 'post'
  | 'patch'
  | 'put'
  | 'delete'
  | 'options';

export type THttpMethods = {
  [method in THttpMethod]: string;
};

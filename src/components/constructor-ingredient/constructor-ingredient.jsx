import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { moveIngredient } from '../../services/actions';

function ConstructorIngredient({ handleDelete, className, index, ...props }) {
  const ref = useRef(null);
  const dispatch = useDispatch();

  const [, ingredientRef] = useDrag({
    type: 'active',
    item: { index, ...props },
  });

  const [, dropSort] = useDrop({
    accept: 'active',
    drop(ingredient) {
      if (!ref.current) {
        return;
      }

      const dragIndex = ingredient.index;
      const targetIndex = index;

      if (dragIndex === targetIndex) {
        return;
      }

      dispatch(moveIngredient({ dragIndex, targetIndex }));
    },
  });

  ingredientRef(dropSort(ref));

  return (
    <li ref={ref} className={className}>
      <DragIcon type="primary" />
      <ConstructorElement
        type={undefined}
        thumbnail={props.image}
        text={props.name}
        price={props.price}
        isLocked={false}
        handleClose={() => handleDelete(props)}
      />
    </li>
  );
}

ConstructorIngredient.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  handleDelete: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default ConstructorIngredient;

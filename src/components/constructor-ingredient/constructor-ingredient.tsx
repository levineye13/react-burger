import React, { FC, ReactElement, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { moveIngredient } from '../../services/actions';
import { IIngredient } from '../../utils/interfaces';

interface IProps extends IIngredient {
  readonly className: string;
  readonly index: number;
  readonly handleDelete: (ingredient: IIngredient) => void;
}

const ConstructorIngredient: FC<IProps> = ({
  handleDelete,
  className,
  index,
  ...props
}): ReactElement => {
  const ref = useRef<HTMLLIElement>(null);
  const dispatch = useDispatch();

  const [, ingredientRef] = useDrag({
    type: 'active',
    item: { index, ...props },
  });

  const [, dropSort] = useDrop({
    accept: 'active',
    drop(ingredient: IProps): void {
      if (!ref.current) {
        return;
      }

      const dragIndex: number = ingredient.index;
      const targetIndex: number = index;

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
        handleClose={(): void => handleDelete(props)}
      />
    </li>
  );
};

export default ConstructorIngredient;

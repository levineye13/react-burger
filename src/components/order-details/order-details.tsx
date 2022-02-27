import React from 'react';

import style from './order-details.module.css';
import OrderDone from '../../images/done.jpg';

function OrderDetails() {
  return (
    <article className={`${style.article} mt-9`}>
      <h2 className={`${style.title} text text_type_digits-large`}>034536</h2>
      <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
      <img className="mt-15" src={OrderDone} alt="Заказ готов" />
      <p className="text text_type_main-default mt-15">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive mt-2 mb-15">
        Дождитесь готовности на орбитальной станции
      </p>
    </article>
  );
}

export default OrderDetails;
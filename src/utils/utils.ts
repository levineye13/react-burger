import { OrderStatus } from './constants';
export const sumByKey = (
  arr: ReadonlyArray<any> | Array<any>,
  property: string
): number => {
  return arr.reduce((sum: number, item: any) => sum + (item[property] || 0), 0);
};

export const extractToken = (
  obj: { [key: string]: any },
  field: string,
  schemaType: string
): void => {
  obj[field] = obj[field].replace(`${schemaType} `, '');
};

export const dateFormat = (date: string): string =>
  new Date(date).toLocaleDateString('ru-RU', {
    formatMatcher: 'best fit',
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  });

export const getStatusOrder = (status: string, locale: 'Ru' | 'En'): string => {
  switch (status) {
    case OrderStatus.Done.En:
      return OrderStatus.Done[locale];

    case OrderStatus.Pending.En:
      return OrderStatus.Pending[locale];

    case OrderStatus.Created.En:
      return OrderStatus.Created[locale];

    default:
      return '';
  }
};

import { isEmpty, isNumber } from 'lodash';

export const handleParams = (params) => {
  const newParams = {...params};
  const skipKeys = ['search'];
  Object.keys(newParams).forEach( key => {
    if (!skipKeys.includes(key)) {
      if (isNumber(newParams[key])) {
        newParams[key] += '';
      }
      if (isEmpty(newParams[key])) {
        delete newParams[key]
      }
    }
  })
  return newParams
}

import {isEqual} from 'lodash';

const equalityCheck = (prevProps, nextProps) => {
  return isEqual(prevProps, nextProps);
}

export default equalityCheck;
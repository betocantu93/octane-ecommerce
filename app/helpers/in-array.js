import { helper } from '@ember/component/helper';

export default helper(function inArray(params/*, hash*/) {
  let [ value, values ] = params;  

  return values.includes(value);
});

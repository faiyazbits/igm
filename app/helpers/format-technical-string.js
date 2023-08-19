import { helper } from '@ember/component/helper';

export default helper(function formatTechnicalString(params) {
  let str = params[0];

  if (str == null) {
    return null;
  }
  // Convert any [...] into <b>[...]</b>
  const ret = str.replace(/\[.*?\]/gi, '<b>$&</b>');
  if (/^Strong|STRG.*/i.test(ret)) {
    return `<span class="price-strong">${ret}</span>`;
  } else if (/^Fair.*/i.test(ret)) {
    return `<span class="price-fair">${ret}</span>`;
  }
  return ret;
});

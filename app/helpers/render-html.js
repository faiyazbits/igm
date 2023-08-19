import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/template';

export function renderHtml(params) {
  const content = params[0];
  if (content) {
    return htmlSafe(content);
  }
  return '';
}

export default helper(renderHtml);

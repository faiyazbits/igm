import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/template';

export default helper(function ([text, termToHighlight]) {
  return htmlSafe(
    text.replace(
      new RegExp(termToHighlight, 'i'),
      `<b style="font-weight: bolder;font-size: 16px;background-color:#f5fafd;color:#495c68">$&</b>`
    )
  );
});

import Component from '@glimmer/component';
import { action, set } from '@ember/object';
import { alias } from '@ember/object/computed';
import { scheduleOnce } from '@ember/runloop';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class TechnicalShowComponent extends Component {
  @service() session;
  @service() store;

  @alias('session.currentUser') user;
  @alias('commentaries.meta.total_pages') commentsTotalPages;

  constructor() {
    super(...arguments);

    scheduleOnce('afterRender', this, this.loadCommentary);
  }

  // _commentsChanged = observer('commentsPage', 'technical', function() {
  //   this.loadCommentary();
  // });

  async loadCommentary() {
    const technicalId = this.args.technical.get('id');
    const page = this.args.commentsPage;
    const comments = await this.store.query('commentary', { technical_id: technicalId, page: page });
    set(this, 'commentaries', comments);
  }
}

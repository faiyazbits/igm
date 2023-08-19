import Model, { attr, belongsTo } from '@ember-data/model';

export default class SearchResultModel extends Model {
  @belongsTo('search', { async: true, inverse: 'searchResults' }) search;
  @attr('string') searchableType;
  @belongsTo('searchable', {
    polymorphic: true,
    async: true,
    inverse: null,
  })
  searchable;

  get isDeal() {
    return this.searchableType == 'Deal';
  }

  get isStory() {
    return this.searchableType == 'Story';
  }

  get isTechnical() {
    return this.searchableType == 'Technical';
  }

  get isTechComposite() {
    return this.searchableType == 'TechnicalComposite';
  }

  get routeForLink() {
    const isDeal = this.isDeal;
    const isStory = this.isStory;
    const isTechnical = this.isTechnical;
    const isTechComposite = this.isTechComposite;

    if (isStory) {
      return 'stories.show';
    } else if (isDeal) {
      return 'deal.index';
    } else if (isTechnical) {
      return 'technicals.show';
    } else if (isTechComposite) {
      return 'technical-composite';
    }
  }
}

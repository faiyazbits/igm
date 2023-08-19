import Model, { attr } from '@ember-data/model';


export default class DestinationLinkModel extends Model {
  @attr('string') category;
  @attr() destinationNames;
  @attr('string') linkName;
  @attr('string') routeName;


  get period() {
    const linkNameMapping = {
      'CREDIT EUROPE NEW EMTNS DAILY': 'daily',
      'CREDIT EUROPE WKLY EMTNS': 'weekly',
      'CREDIT EUROPE MONTHLY EMTNS': 'monthly',
    };
    const linkName = this.linkName;

    return linkNameMapping[linkName];
  }
}

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { alias } from '@ember/object/computed';

export default class MtnsController extends Controller {
@service notify;
@service store;



  queryParams = ['destinations', 'title', 'period'];
  destinations = [];
  title = null
  period = null
  per = 20;

  @alias('model.meta.total_pages') totalPages;

  @action
 async exportData(sendInCSV, sendInExcel, sendInXLSX) {
    const hasExported = this.hasExported;

    if (sendInCSV || sendInExcel || sendInXLSX) {
      if (hasExported) {
        this.notify.alert('You have already exported these deals.');
      } else {
        this.hasExported = true;
        const destinations = this.destinations;;
        const store = this.store;
        const params = {
          exportName: "Mtn",
          params: {
            destinations: destinations,
            sendInCSV: sendInCSV,
            sendInExcel: sendInExcel,
            sendInXLSX: sendInXLSX,
            title: this.title,
            period: this.period
          }
        };
        this.notify.success("Beginning export. You'll receive an email soon.");
        const exporting = store.createRecord('export', params);
        await exporting.save();
      }
    } else {
      this.notify.info('Please select one or any formats in which to export the results.');
    }
  }

}

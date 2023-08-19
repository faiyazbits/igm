import Component from '@glimmer/component';
import { action } from '@ember/object';
import UiPopoverComponent from '../ui-popover/component';
import { tracked } from '@glimmer/tracking';

export default class DownloadPopoverComponent extends UiPopoverComponent {
  sendInCSV = false;
  sendInExcel = false;
  sendInXLSX = false;
  @tracked isOpen = false;

  get truncateExport() {
    return this.totalCount > 5000;
  }

  @action
  toggle() {
    this.isOpen = !this.isOpen;
  }

  @action
  send() {
    const sendInCSV = this.sendInCSV;
    const sendInExcel = this.sendInExcel;
    const sendInXLSX = this.sendInXLSX;
    this.args.exportData(sendInCSV, sendInExcel, sendInXLSX);
    this.isOpen = false;
  }
}

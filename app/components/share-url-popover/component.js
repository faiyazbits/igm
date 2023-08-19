import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import UiPopoverComponent from '../ui-popover/component';

export default class ShareUrlPopoverComponent extends UiPopoverComponent {
  get shareUrl() {
    return window.location.href;
  }
}
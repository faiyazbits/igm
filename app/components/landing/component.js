
import Component from '@glimmer/component';
import { service } from '@ember/service';
import { oneWay } from '@ember/object/computed';
import { tracked } from '@glimmer/tracking'

export default class LandingComponent extends Component {

  @service('landing-page-schema') landingPageSchema;

  @oneWay('args.category') argsCategory;
  @oneWay('args.name') argsNames;

  @tracked schema;
  @tracked category;
  @tracked name;


  get componentParams() {
    const schema = this.landingPageSchema;
    const category = this.argsCategory;
    const name = this.argsNames;

    return schema[category][name];
  }

  get componentsToRender() {
    const componentParams = this.componentParams;
    const length = componentParams.left.length;

    let result = [];

    for (let i = 0; i < length; i++) {
      const leftComponent = componentParams.left[i];
      const rightComponent = componentParams.right[i];
      const component = {};

      if (rightComponent === undefined || rightComponent.extendLeft !== true) {
        component.leftComponent = leftComponent;
        component.rightComponent = rightComponent;
      } else {
        component.extendLeft = true;
        component.fullWidthComponent = leftComponent;
      }
      result.push(component);
    }
    return result;
  }



}

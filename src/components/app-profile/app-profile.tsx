import { Component, Prop, State, h } from '@stencil/core';
import { sayHello } from '../../helpers/utils';

var serializeForm = function (formData) {
  var obj = {};
  // var formData = new FormData(form);
  for (var key of formData.keys()) {
    obj[key] = formData.get(key);
  }
  return obj;
};

@Component({
  tag: 'app-profile',
  styleUrl: 'app-profile.css'
})
export class AppProfile {
  @Prop() name: string;

  @State() state = false;

  private formEl: HTMLSlFormElement;

  componentDidLoad() {
    this.formEl.addEventListener('sl-submit', (e: CustomEvent<{ formData: FormData; formControls: HTMLElement[] }>) =>
      console.log('All fields are valid!', e.detail, serializeForm(e.detail.formData))
    );
  }

  formattedName(): string {
    if (this.name) {
      return this.name.substr(0, 1).toUpperCase() + this.name.substr(1).toLowerCase();
    }
    return '';
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/" />
          </ion-buttons>
          <ion-title>Profile: {this.name}</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding">
        <p>
          {sayHello()}! My name is {this.formattedName()}. My name was passed in through a route param!
        </p>

        <ion-item>
          <ion-label>Setting ({this.state.toString()})</ion-label>
          <ion-toggle checked={this.state} onIonChange={ev => (this.state = ev.detail.checked)} />
        </ion-item>
        <sl-form ref={el => (this.formEl = el)} class="input-validation-required">
          <sl-input name="name" label="Name" required></sl-input>

          <sl-select label="Favorite Animal" clearable required>
            <sl-menu-item value="birds">Birds</sl-menu-item>
            <sl-menu-item value="cats">Cats</sl-menu-item>
            <sl-menu-item value="dogs">Dogs</sl-menu-item>
            <sl-menu-item value="other">Other</sl-menu-item>
          </sl-select>

          <sl-textarea name="comment" label="Comment" required></sl-textarea>

          <ion-item>
            <ion-label>Ionic input</ion-label>
            <ion-input required />
          </ion-item>

          <sl-checkbox required>Check me before submitting</sl-checkbox>

          <sl-button type="primary" submit>
            Submit
          </sl-button>
        </sl-form>
      </ion-content>
    ];
  }
}

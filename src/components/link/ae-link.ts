import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { tailwindStyles } from '../../styles/tailwind';

@customElement('ae-link')
export class AeLink extends LitElement {
  static styles = [
    tailwindStyles,
    css`
      :host {
        display: inline-block;
      }
    `
  ];

  @property({ type: String, reflect: true })
  href?: string;

  @property({ type: String, reflect: true })
  target?: string;

  @property({ type: String, reflect: true })
  rel?: string;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  private _onClick = (e: MouseEvent) => {
    if (!this.disabled) return;
    e.preventDefault();
    e.stopPropagation();
  };

  render() {
    const classes = {
      'text-blue-700 underline underline-offset-4 transition-colors': true,
      'hover:text-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2':
        true,
      'opacity-50 cursor-not-allowed pointer-events-none': this.disabled
    };

    const computedRel =
      this.rel ??
      (this.target === '_blank' ? 'noopener noreferrer' : undefined);

    return html`<a
      part="link"
      class=${classMap(classes)}
      href=${ifDefined(this.disabled ? undefined : this.href)}
      target=${ifDefined(this.target)}
      rel=${ifDefined(computedRel)}
      aria-disabled=${this.disabled ? 'true' : 'false'}
      tabindex=${ifDefined(this.disabled ? '-1' : undefined)}
      @click=${this._onClick}
      ><slot></slot
    ></a>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ae-link': AeLink;
  }
}

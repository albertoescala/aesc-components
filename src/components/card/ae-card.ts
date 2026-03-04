import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { tailwindStyles } from '../../styles/tailwind';

@customElement('ae-card')
export class AeCard extends LitElement {
  static styles = [
    tailwindStyles,
    css`
      :host {
        display: block;
      }
    `
  ];

  render() {
    const ariaLabel = this.getAttribute('aria-label');
    const ariaLabelledby = this.getAttribute('aria-labelledby');

    return html`<article
      part="card"
      class="rounded-lg border border-slate-200 bg-white p-4 text-slate-900 shadow-sm"
      aria-label=${ifDefined(ariaLabel ?? undefined)}
      aria-labelledby=${ifDefined(ariaLabelledby ?? undefined)}
    >
      <header part="header" class="mb-3">
        <slot name="header"></slot>
      </header>
      <div part="body">
        <slot></slot>
      </div>
      <footer part="footer" class="mt-3">
        <slot name="footer"></slot>
      </footer>
    </article>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ae-card': AeCard;
  }
}

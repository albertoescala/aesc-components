import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { tailwindStyles } from '../../styles/tailwind';

@customElement('ae-breadcrumb')
export class AeBreadcrumb extends LitElement {
  static styles = [
    tailwindStyles,
    css`
      :host {
        display: block;
      }

      ::slotted(li) {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
      }

      ::slotted(a) {
        color: rgb(30 64 175);
        text-decoration: underline;
        text-underline-offset: 4px;
      }

      ::slotted([aria-current='page']) {
        color: rgb(15 23 42);
        text-decoration: none;
        font-weight: 500;
      }
    `
  ];

  @property({ type: String, attribute: 'aria-label' })
  ariaLabel = 'Breadcrumb';

  render() {
    const label = ifDefined(this.ariaLabel || undefined);

    return html`<nav part="nav" aria-label=${label}>
      <ol part="list" class="flex flex-wrap items-center gap-2 text-sm text-slate-700">
        <slot></slot>
      </ol>
    </nav>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ae-breadcrumb': AeBreadcrumb;
  }
}


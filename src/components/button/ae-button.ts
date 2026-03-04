import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { tailwindStyles } from '../../styles/tailwind';

export type AeButtonVariant = 'primary' | 'secondary' | 'ghost';
export type AeButtonSize = 'sm' | 'md' | 'lg';

@customElement('ae-button')
export class AeButton extends LitElement {
  static styles = [
    tailwindStyles,
    css`
      :host {
        display: inline-block;
      }
    `
  ];

  @property({ type: String, reflect: true })
  variant: AeButtonVariant = 'primary';

  @property({ type: String, reflect: true })
  size: AeButtonSize = 'md';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  render() {
    const classes = {
      'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors': true,
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2': true,
      'opacity-50 pointer-events-none': this.disabled,
      'h-8 px-3 text-sm': this.size === 'sm',
      'h-10 px-4 text-sm': this.size === 'md',
      'h-12 px-6 text-base': this.size === 'lg',
      'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600': this.variant === 'primary',
      'bg-slate-100 text-slate-900 hover:bg-slate-200 focus-visible:ring-slate-400':
        this.variant === 'secondary',
      'bg-transparent text-slate-900 hover:bg-slate-100 focus-visible:ring-slate-400': this.variant === 'ghost'
    };

    return html`<button part="button" class=${classMap(classes)} ?disabled=${this.disabled}>
      <slot></slot>
    </button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ae-button': AeButton;
  }
}

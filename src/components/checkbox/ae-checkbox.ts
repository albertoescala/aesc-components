import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { tailwindStyles } from '../../styles/tailwind';

@customElement('ae-checkbox')
export class AeCheckbox extends LitElement {
  static styles = [
    tailwindStyles,
    css`
      :host {
        display: inline-block;
      }
    `
  ];

  @property({ type: Boolean, reflect: true })
  checked = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  required = false;

  @property({ type: String, reflect: true })
  name?: string;

  @property({ type: String, reflect: true })
  value?: string;

  private get _input() {
    return this.shadowRoot?.querySelector('input') ?? null;
  }

  focus(options?: FocusOptions) {
    this._input?.focus(options);
  }

  blur() {
    this._input?.blur();
  }

  private _onChange = () => {
    const input = this._input as HTMLInputElement | null;
    this.checked = Boolean(input?.checked);
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  };

  private _onInput = () => {
    this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
  };

  render() {
    const checkboxClasses = {
      'h-4 w-4 rounded border border-slate-300 text-blue-600 transition-colors': true,
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2':
        true,
      'opacity-50 cursor-not-allowed': this.disabled
    };

    return html`<label part="label" class="inline-flex items-center gap-2 text-sm text-slate-900">
      <input
        part="input"
        class=${classMap(checkboxClasses)}
        type="checkbox"
        .checked=${this.checked}
        name=${ifDefined(this.name)}
        value=${ifDefined(this.value)}
        ?disabled=${this.disabled}
        ?required=${this.required}
        @change=${this._onChange}
        @input=${this._onInput}
      />
      <span part="text"><slot></slot></span>
    </label>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ae-checkbox': AeCheckbox;
  }
}


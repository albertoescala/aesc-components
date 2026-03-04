import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { tailwindStyles } from '../../styles/tailwind';

@customElement('ae-input')
export class AeInput extends LitElement {
  static styles = [
    tailwindStyles,
    css`
      :host {
        display: block;
      }
    `
  ];

  @property({ type: String })
  label?: string;

  @property({ type: String, attribute: 'helper-text' })
  helperText?: string;

  @property({ type: String, attribute: 'error-text' })
  errorText?: string;

  @property({ type: String, reflect: true })
  value = '';

  @property({ type: String, reflect: true })
  name?: string;

  @property({ type: String, reflect: true })
  type = 'text';

  @property({ type: String, reflect: true })
  placeholder?: string;

  @property({ type: String, reflect: true })
  autocomplete?: string;

  @property({ type: String, reflect: true })
  inputmode?: string;

  @property({ type: String, reflect: true })
  pattern?: string;

  @property({ type: Number, reflect: true })
  minlength?: number;

  @property({ type: Number, reflect: true })
  maxlength?: number;

  @property({ type: String, reflect: true })
  min?: string;

  @property({ type: String, reflect: true })
  max?: string;

  @property({ type: String, reflect: true })
  step?: string;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  required = false;

  @property({ type: Boolean, reflect: true })
  readonly = false;

  private readonly _id =
    globalThis.crypto?.randomUUID?.() ?? `ae-input-${Math.random().toString(16).slice(2)}`;

  private get _helperId() {
    return `${this._id}-help`;
  }

  private get _errorId() {
    return `${this._id}-error`;
  }

  focus(options?: FocusOptions) {
    this._input?.focus(options);
  }

  blur() {
    this._input?.blur();
  }

  private get _input() {
    return this.shadowRoot?.querySelector('input') ?? null;
  }

  private _onInput = () => {
    this.value = this._input?.value ?? '';
    this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
  };

  private _onChange = () => {
    this.value = this._input?.value ?? '';
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  };

  render() {
    const hasError = Boolean(this.errorText);
    const describedBy = [this.helperText ? this._helperId : null, hasError ? this._errorId : null]
      .filter(Boolean)
      .join(' ')
      .trim();

    const inputClasses = {
      'w-full rounded-md border px-3 py-2 text-sm text-slate-900 transition-colors': true,
      'bg-white placeholder:text-slate-400': true,
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2': true,
      'border-slate-300 focus-visible:ring-blue-600': !hasError,
      'border-red-500 focus-visible:ring-red-600': hasError,
      'opacity-50 cursor-not-allowed bg-slate-50': this.disabled
    };

    return html`
      ${this.label
        ? html`<label
            part="label"
            for=${this._id}
            class="mb-1 block text-sm font-medium text-slate-900"
            >${this.label}</label
          >`
        : null}
      <input
        part="input"
        id=${this._id}
        class=${classMap(inputClasses)}
        .value=${this.value}
        type=${this.type}
        name=${ifDefined(this.name)}
        placeholder=${ifDefined(this.placeholder)}
        autocomplete=${ifDefined(this.autocomplete)}
        inputmode=${ifDefined(this.inputmode)}
        pattern=${ifDefined(this.pattern)}
        minlength=${ifDefined(this.minlength)}
        maxlength=${ifDefined(this.maxlength)}
        min=${ifDefined(this.min)}
        max=${ifDefined(this.max)}
        step=${ifDefined(this.step)}
        aria-invalid=${hasError ? 'true' : 'false'}
        aria-describedby=${ifDefined(describedBy || undefined)}
        ?disabled=${this.disabled}
        ?required=${this.required}
        ?readonly=${this.readonly}
        @input=${this._onInput}
        @change=${this._onChange}
      />
      ${hasError
        ? html`<p part="error" id=${this._errorId} class="mt-1 text-sm text-red-600">
            ${this.errorText}
          </p>`
        : this.helperText
          ? html`<p part="helper" id=${this._helperId} class="mt-1 text-sm text-slate-500">
              ${this.helperText}
            </p>`
          : null}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ae-input': AeInput;
  }
}


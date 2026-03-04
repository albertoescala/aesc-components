import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { tailwindStyles } from '../../styles/tailwind';

export type AeHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

@customElement('ae-heading')
export class AeHeading extends LitElement {
  static styles = [
    tailwindStyles,
    css`
      :host {
        display: block;
      }
    `
  ];

  @property({ type: Number, reflect: true })
  level: AeHeadingLevel = 2;

  private get _clampedLevel(): AeHeadingLevel {
    const n = Number(this.level);
    if (n <= 1) return 1;
    if (n >= 6) return 6;
    return n as AeHeadingLevel;
  }

  render() {
    const level = this._clampedLevel;

    const classes = {
      'text-balance font-semibold tracking-tight text-slate-900': true,
      'text-4xl leading-tight': level === 1,
      'text-3xl leading-tight': level === 2,
      'text-2xl leading-snug': level === 3,
      'text-xl leading-snug': level === 4,
      'text-lg leading-snug': level === 5,
      'text-base leading-snug': level === 6
    };

    const content = html`<slot></slot>`;
    const id = ifDefined(this.id || undefined);

    if (level === 1) return html`<h1 part="heading" class=${classMap(classes)} id=${id}>${content}</h1>`;
    if (level === 2) return html`<h2 part="heading" class=${classMap(classes)} id=${id}>${content}</h2>`;
    if (level === 3) return html`<h3 part="heading" class=${classMap(classes)} id=${id}>${content}</h3>`;
    if (level === 4) return html`<h4 part="heading" class=${classMap(classes)} id=${id}>${content}</h4>`;
    if (level === 5) return html`<h5 part="heading" class=${classMap(classes)} id=${id}>${content}</h5>`;
    return html`<h6 part="heading" class=${classMap(classes)} id=${id}>${content}</h6>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ae-heading': AeHeading;
  }
}


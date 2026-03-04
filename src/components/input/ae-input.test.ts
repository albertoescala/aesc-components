import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import './ae-input';

describe('ae-input', () => {
  it('renderiza un <input> nativo dentro del Shadow DOM', async () => {
    const el = await fixture<HTMLElement>(html`<ae-input></ae-input>`);
    const input = el.shadowRoot?.querySelector('input');

    expect(input).to.exist;
  });

  it('refleja disabled y deshabilita el input interno', async () => {
    const el = await fixture<HTMLElement>(html`<ae-input disabled></ae-input>`);
    const input = el.shadowRoot?.querySelector('input');

    expect(el.hasAttribute('disabled')).to.equal(true);
    expect(input?.hasAttribute('disabled')).to.equal(true);
  });

  it('propaga el evento input al host', async () => {
    const el = await fixture<HTMLElement>(html`<ae-input></ae-input>`);
    const input = el.shadowRoot?.querySelector('input') as HTMLInputElement | null;

    setTimeout(() => {
      if (!input) return;
      input.value = 'hola';
      input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    });

    await oneEvent(el, 'input');
    expect(el.getAttribute('value')).to.equal('hola');
  });

  it('marca aria-invalid cuando hay error', async () => {
    const el = await fixture<HTMLElement>(
      html`<ae-input error-text="Requerido"></ae-input>`
    );
    const input = el.shadowRoot?.querySelector('input');

    expect(input?.getAttribute('aria-invalid')).to.equal('true');
  });
});


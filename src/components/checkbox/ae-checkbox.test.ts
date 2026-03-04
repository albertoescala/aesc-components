import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import './ae-checkbox';

describe('ae-checkbox', () => {
  it('renderiza un <input type="checkbox"> dentro del Shadow DOM', async () => {
    const el = await fixture<HTMLElement>(html`<ae-checkbox>Accept</ae-checkbox>`);
    const input = el.shadowRoot?.querySelector('input[type="checkbox"]');

    expect(input).to.exist;
  });

  it('refleja checked en el atributo', async () => {
    const el = await fixture<HTMLElement>(html`<ae-checkbox checked>Accept</ae-checkbox>`);

    expect(el.hasAttribute('checked')).to.equal(true);
  });

  it('propaga change al host y actualiza checked', async () => {
    const el = await fixture<HTMLElement>(html`<ae-checkbox>Accept</ae-checkbox>`);
    const input = el.shadowRoot?.querySelector('input') as HTMLInputElement | null;

    setTimeout(() => {
      if (!input) return;
      input.checked = true;
      input.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    });

    await oneEvent(el, 'change');
    expect(el.hasAttribute('checked')).to.equal(true);
  });
});


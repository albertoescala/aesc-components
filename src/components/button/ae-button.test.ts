import { expect, fixture, html } from '@open-wc/testing';
import './ae-button';

describe('ae-button', () => {
  it('renderiza un <button> nativo dentro del Shadow DOM', async () => {
    const el = await fixture<HTMLElement>(html`<ae-button>Hola</ae-button>`);
    const button = el.shadowRoot?.querySelector('button');
    const slot = button?.querySelector('slot') as HTMLSlotElement | null;

    expect(button).to.exist;
    const assignedText = (slot?.assignedNodes({ flatten: true }) ?? [])
      .map((n) => n.textContent ?? '')
      .join('');
    expect(assignedText).to.contain('Hola');
  });

  it('refleja disabled y deshabilita el botón interno', async () => {
    const el = await fixture<HTMLElement>(html`<ae-button disabled>Hola</ae-button>`);
    const button = el.shadowRoot?.querySelector('button');

    expect(el.hasAttribute('disabled')).to.equal(true);
    expect(button?.hasAttribute('disabled')).to.equal(true);
  });

  it('aplica clases según variant', async () => {
    const el = await fixture<HTMLElement>(html`<ae-button variant="secondary">Hola</ae-button>`);
    const button = el.shadowRoot?.querySelector('button');

    expect(button?.getAttribute('class')).to.contain('bg-slate-100');
  });
});

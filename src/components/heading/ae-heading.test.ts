import { expect, fixture, html } from '@open-wc/testing';
import './ae-heading';

describe('ae-heading', () => {
  it('renderiza un heading nativo con el nivel indicado', async () => {
    const el = await fixture<HTMLElement>(html`<ae-heading level="3">Title</ae-heading>`);
    const h3 = el.shadowRoot?.querySelector('h3');
    const slot = h3?.querySelector('slot') as HTMLSlotElement | null;

    expect(h3).to.exist;
    const assignedText = (slot?.assignedNodes({ flatten: true }) ?? [])
      .map((n) => n.textContent ?? '')
      .join('');
    expect(assignedText).to.contain('Title');
  });

  it('clampa level a 1..6', async () => {
    const el = await fixture<HTMLElement>(html`<ae-heading level="99">Title</ae-heading>`);
    const h6 = el.shadowRoot?.querySelector('h6');

    expect(h6).to.exist;
  });
});

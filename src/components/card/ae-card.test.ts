import { expect, fixture, html } from '@open-wc/testing';
import './ae-card';

describe('ae-card', () => {
  it('renderiza un <article> dentro del Shadow DOM', async () => {
    const el = await fixture<HTMLElement>(html`<ae-card>Body</ae-card>`);
    const article = el.shadowRoot?.querySelector('article');

    expect(article).to.exist;
  });

  it('expone slots de header y footer', async () => {
    const el = await fixture<HTMLElement>(html`
      <ae-card>
        <div slot="header">Header</div>
        <div>Body</div>
        <div slot="footer">Footer</div>
      </ae-card>
    `);

    const slots = el.shadowRoot?.querySelectorAll('slot');
    expect(slots?.length).to.equal(3);
  });
});


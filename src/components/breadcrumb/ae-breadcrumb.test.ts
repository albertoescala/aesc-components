import { expect, fixture, html } from '@open-wc/testing';
import './ae-breadcrumb';

describe('ae-breadcrumb', () => {
  it('renderiza un <nav> con <ol>', async () => {
    const el = await fixture<HTMLElement>(html`
      <ae-breadcrumb>
        <li><a href="/">Home</a></li>
        <li aria-current="page">Page</li>
      </ae-breadcrumb>
    `);

    const nav = el.shadowRoot?.querySelector('nav');
    const ol = el.shadowRoot?.querySelector('ol');

    expect(nav).to.exist;
    expect(ol).to.exist;
  });

  it('usa aria-label por defecto', async () => {
    const el = await fixture<HTMLElement>(html`<ae-breadcrumb></ae-breadcrumb>`);
    const nav = el.shadowRoot?.querySelector('nav');

    expect(nav?.getAttribute('aria-label')).to.equal('Breadcrumb');
  });
});


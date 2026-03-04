import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import './ae-link';

describe('ae-link', () => {
  it('renderiza un <a> nativo dentro del Shadow DOM', async () => {
    const el = await fixture<HTMLElement>(html`<ae-link href="/x">Go</ae-link>`);
    const a = el.shadowRoot?.querySelector('a');

    expect(a).to.exist;
    expect(a?.getAttribute('href')).to.equal('/x');
  });

  it('previene click cuando está disabled', async () => {
    const el = await fixture<HTMLElement>(html`<ae-link href="/x" disabled>Go</ae-link>`);
    const a = el.shadowRoot?.querySelector('a') as HTMLAnchorElement | null;

    setTimeout(() => {
      a?.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true, cancelable: true }));
    });

    const ev = await oneEvent(a as HTMLAnchorElement, 'click');
    expect(ev.defaultPrevented).to.equal(true);
  });
});

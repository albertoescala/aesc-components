import { css, unsafeCSS } from 'lit';
import { tailwindCssText } from './tailwind.generated';

export const tailwindStyles = css`${unsafeCSS(tailwindCssText)}`;

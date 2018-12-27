import css from 'styled-jsx/css';
import { colors, spacing, bps, fontSizes, fontWeights } from '../../lib/styling';

export default css`
  .root {
    position: relative;
  }
  .root img {
    width: 100%;
  }
  .root:after {
    display: block;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(transparent 80%, black 100%);
  }
  .content :global(ul) {
    z-index: 1;
    position: absolute;
    left: 0;
    bottom: 0;
    padding: ${spacing.a5}px;
    display: grid;
    grid-auto-columns: auto;
    grid-auto-flow: column;
    grid-gap: ${spacing.a5}px;
    justify-content: start;
  }
  .content :global(li) {
    display: block;
  }
  .content :global(a) {
    color: ${colors.white};
    text-transform: uppercase;
    font-size: ${fontSizes.a3}px;
    font-weight: ${fontWeights.bold};
    text-shadow: 0 0 20px black;
  }
`;

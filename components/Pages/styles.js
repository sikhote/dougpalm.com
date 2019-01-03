import css from 'styled-jsx/css';
import { spacing, bps } from '../../lib/styling';

export default css`
  .root {
    padding: ${spacing.page}px;
    padding-top: ${spacing.a5}px;
  }
  @media (max-width: ${bps.a2}px) {
    .root {
      padding: ${spacing.pageA2}px;
      padding-top: ${spacing.a4}px;
    }
  }
`;

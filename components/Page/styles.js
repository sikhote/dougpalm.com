import css from 'styled-jsx/css';
import { colors, bps, spacing } from '../../lib/styling';

export default css`
  .root {
    padding: ${spacing.page}px;
  }
  .main {
    padding-top: ${spacing.page}px;
  }

  @media (max-width: ${bps.a2}px) {
    .root {
      padding: ${spacing.pageA2}px;
    }
  }
`;

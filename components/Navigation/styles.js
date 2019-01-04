import css from 'styled-jsx/css';
import {
  spacing,
  bps,
  fontSizes,
  fontWeights,
  speeds,
} from '../../lib/styling';

export default css`
  .root {
    padding-left: ${spacing.page}px;
    padding-right: ${spacing.page}px;
    padding-top: ${spacing.a5}px;
  }
  .inner {
    position: relative;
    background: black;
  }
  img {
    width: 100%;
  }
  .inner:after {
    display: block;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0, 0, 0, 0) 75%, black 95%, black 100%);
  }
  .content {
    z-index: 1;
    position: absolute;
    left: 0;
    bottom: 0;
    padding: ${spacing.a5}px ${spacing.a6}px;
  }
  .nav {
    display: none;
  }
  .home {
    margin-right: ${spacing.a5}px;
  }
  .md {
    display: inline-block;
  }
  .md :global(ul) {
    display: inline-grid;
    grid-auto-columns: auto;
    grid-auto-flow: column;
    grid-gap: ${spacing.a5}px;
    justify-content: start;
  }
  .md :global(li) {
    display: block;
  }
  .content :global(a) {
    color: white;
    text-transform: uppercase;
    font-size: ${fontSizes.a2}px;
    font-weight: ${fontWeights.bold};
    text-shadow: 0 0 20px black;
  }
  @media (max-width: ${bps.a2}px) {
    .root {
      padding: 0;
    }
    .inner:after {
      background: linear-gradient(
        rgba(0, 255, 0, 0) 70%,
        black 85%,
        black 100%
      );
    }
    .content {
      display: grid;
      grid-template-columns: auto auto;
      justify-content: center;
      align-items: end;
      justify-content: space-between;
      width: 100%;
    }
    .nav {
      display: block;
      height: 32px;
      position: relative;
      top: 4px;
      left: 2px;
    }
    .nav svg.open {
      display: none;
    }
    .nav.open svg.open {
      display: block;
    }
    .nav.open svg.close {
      display: none;
    }
    svg {
      height: 100%;
      fill: white;
      filter: drop-shadow(0 0 10px black);
    }
    .md {
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      max-width: 100%;
      background: black;
      padding: ${spacing.a4}px 0;
      transition: all ease ${speeds.a1}s;
    }
    .md:not(.open) {
      transform: translateX(-100%);
    }
    .md :global(ul) {
      grid-auto-rows: auto;
      grid-auto-flow: row;
      grid-gap: 0;
    }
    .md :global(a) {
      text-shadow: none;
      text-decoration: none;
      display: block;
      padding: ${spacing.a4}px ${spacing.a6}px;
    }
  }
`;

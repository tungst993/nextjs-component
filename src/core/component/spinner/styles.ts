import css from 'styled-jsx/css';
import theme from 'theme';

export default css`
    .spinner {
        animation-iteration-count: infinite;
        animation-timing-function: linear;
        animation-name: rotate;
        z-index: 2;

        .path {
            stroke-linecap: round;
            animation: dash 1.5s ease-in-out infinite;
        }

        &.light .path {
            stroke: ${theme.color.blue[500]};
        }
        &.dark .path {
            stroke: ${theme.color.white[500]};
        }

        &.warning .path {
            stroke: ${theme.color.red[500]};
        }

        &.xl {
            width: 48px;
            height: 48px;

            .path {
                cx: 24px;
                cy: 24px;
                r: 20px;
                stroke-width: 4px;
            }
        }

        &.l {
            width: 32px;
            height: 32px;

            .path {
                cx: 16px;
                cy: 16px;
                r: 13px;
                stroke-width: 3px;
            }
        }

        &.m {
            width: 20px;
            height: 20px;

            .path {
                cx: 10px;
                cy: 10px;
                r: 8px;
                stroke-width: 2px;
            }
        }

        &.s {
            width: 16px;
            height: 16px;

            .path {
                cx: 8px;
                cy: 8px;
                r: 6.5px;
                stroke-width: 1.5px;
            }
        }
    }

    @keyframes rotate {
        100% {
            transform: rotate(360deg);
        }
    }

    @keyframes dash {
        0% {
            stroke-dasharray: 1, 150;
            stroke-dashoffset: 0;
        }
        50% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -35;
        }
        100% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -124;
        }
    }
`;

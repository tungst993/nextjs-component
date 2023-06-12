import css from 'styled-jsx/css';
import theme from 'theme';

export default css`
    .textButton {
        height: 32px;
        padding: 0 4px;
        display: flex;
        align-items: center;
        justify-content: center;

        &:not(:disabled):hover > .text {
            text-decoration: underline;
        }

        &:disabled {
            text-decoration: none;
            cursor: not-allowed;
        }

        > :global(.btnIcon) {
            transition: color ${theme.animSpeed.extraFast};
            margin-right: 8px;
        }

        > .text {
            transition: color ${theme.animSpeed.extraFast};
            ${theme.typo.T14_M}
        }
    }
`;

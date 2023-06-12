import css from 'styled-jsx/css';
import theme from 'theme';

export default css`
    .iconButton {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: transparent;
        transition-property: background-color, color;
        transition-duration: ${theme.animSpeed.extraFast};
        border-radius: 8px;
        user-select: none;
        ${theme.typo.T14_M}

        &:not(:disabled) {
            &:hover,
            &:focus {
                background-color: ${theme.color.ink[200]};
            }
        }

        &:disabled {
            cursor: not-allowed;
            /* Workaround for disabled button mouseleave event bug on Chrome/Safari */
            /* https://github.com/facebook/react/issues/4251#issuecomment-267004045 */
            pointer-events: none;
        }

        &.loading {
            cursor: not-allowed;
            pointer-events: none;
        }
    }
`;

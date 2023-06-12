import css from 'styled-jsx/css';
import theme from 'theme';

export default css`
    .outlinedButton {
        height: 40px;
        padding: 0 8px;
        min-width: 120px;
        border-radius: 8px;
        background-color: white;
        color: ${theme.color.ink[400]};
        border: 1px solid ${theme.color.border};
        transition-property: border-color, background-color;
        transition-duration: ${theme.animSpeed.fast};
        white-space: nowrap;
        user-select: none;
        ${theme.typo.T14_R}

        &:hover, &:focus {
            &:not(.disabled) {
                border-color: ${theme.color.primary[500]};

                .content .clearBtn {
                    opacity: 1;
                }
            }
        }

        &.disabled {
            cursor: not-allowed;
            color: ${theme.color.ink[300]};
            background-color: ${theme.color.ink[100]};
            /* Workaround for disabled button mouseleave event bug on Chrome/Safari */
            /* https://github.com/facebook/react/issues/4251#issuecomment-267004045 */
            pointer-events: none;

            .content {
                .text {
                    color: ${theme.color.ink[300]};
                }

                .counter {
                    background-color: ${theme.color.primary[300]};
                }
            }
        }

        .content {
            display: grid;
            align-items: center;
            grid-template-rows: auto;
            grid-template-columns: 20px 1fr auto 1fr;
            position: relative;

            :global(.icon) {
                grid-column: 1 / 2;
                grid-row: 1;
            }

            .text {
                grid-row: 1;
                margin-left: 4px;
                grid-column: 2 / 3;
                transition: color ${theme.animSpeed.fast};
                color: ${theme.color.ink[500]};
            }

            .counter {
                width: auto;
                grid-row: 1;
                height: 16px;
                padding: 0 4px;
                min-width: 16px;
                margin-left: 8px;
                color: white;
                grid-column: 3 / 4;
                border-radius: 20px;
                display: inline-block;
                transition: background-color ${theme.animSpeed.fast};
                background-color: ${theme.color.primary[500]};
                ${theme.typo.T12_M}
            }

            .clearBtn {
                opacity: 0;
                grid-row: 1;
                line-height: 0;
                margin-left: auto;
                justify-self: end;
                grid-column: 4 / 5;
                color: ${theme.color.ink[300]};
                transition: opacity ${theme.animSpeed.extraFast};
            }
        }
    }
`;

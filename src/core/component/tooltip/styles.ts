import css from 'styled-jsx/css';
import theme from 'theme';

export default css`
    #tooltip {
        z-index: 10000;

        width: auto;

        &.m {
            max-width: 232px;
        }

        &.l {
            max-width: 364px;
        }

        word-break: break-word;
        white-space: pre-wrap;
        padding: 8px 12px;

        border-radius: 4px;
        box-shadow: ${theme.shadow[8]};
        ${theme.typo.T12_R}
        pointer-events: none;

        &.tooltip-enter {
            opacity: 0;
        }

        &.tooltip-enter-active {
            transition: opacity ${theme.animSpeed.fast};
            opacity: 1;
        }

        &.tooltip-exit {
            opacity: 1;
        }

        &.tooltip-exit-active {
            transition: opacity ${theme.animSpeed.fast};
            opacity: 0;
        }

        &.dark {
            color: white;
            background-color: ${theme.color.ink[500]};

            #arrow .square::before {
                background-color: ${theme.color.ink[500]};
            }
        }

        &.light {
            color: ${theme.color.ink[500]};
            background-color: white;

            #arrow .square::before {
                background-color: white;
            }
        }

        #arrow {
            /* Checkout a simplified version here: https://codepen.io/dshung1997/pen/yLbYeer */
            position: absolute;
            width: 0;
            height: 0;
            z-index: 2;

            .square {
                position: absolute;

                background-color: transparent;
                box-shadow: none;

                width: 40px;
                height: 40px;

                overflow: hidden;
                pointer-events: none;
                user-select: none;

                z-index: 2;

                &::before {
                    content: '';

                    position: absolute;

                    width: 16px;
                    height: 16px;

                    border-radius: 2px;

                    box-shadow: ${theme.shadow[8]};
                }
            }
        }

        &[data-popper-placement^='left'] {
            #arrow {
                right: 0;

                .square {
                    left: 0;
                    top: 50%;
                    transform: translate3d(0, -50%, 0);

                    &::before {
                        top: 50%;
                        left: -4px;
                        transform: translate3d(-50%, -50%, 0) rotate(45deg);
                    }
                }
            }
        }

        &[data-popper-placement^='right'] {
            #arrow {
                left: 0;

                .square {
                    right: 0;
                    top: 50%;
                    transform: translate3d(0, -50%, 0);

                    &::before {
                        top: 50%;
                        right: -4px;
                        transform: translate3d(50%, -50%, 0) rotate(45deg);
                    }
                }
            }
        }

        &[data-popper-placement^='top'] {
            #arrow {
                bottom: 0;

                .square {
                    top: 0;
                    left: 50%;

                    transform: translate3d(-50%, 0, 0);

                    &::before {
                        top: -4px;
                        left: 50%;
                        transform: translate3d(-50%, -50%, 0) rotate(45deg);
                    }
                }
            }
        }

        &[data-popper-placement^='bottom'] {
            #arrow {
                top: 0;

                .square {
                    bottom: 0;
                    left: 50%;

                    transform: translate3d(-50%, 0, 0);

                    &::before {
                        bottom: -4px;
                        left: 50%;
                        transform: translate3d(-50%, 50%, 0) rotate(45deg);
                    }
                }
            }
        }
    }
`;

import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import React, { useState, memo, ReactNode, useCallback, useMemo, useEffect, useRef } from 'react';
import { Placement, PositioningStrategy } from '@popperjs/core';
import { usePopper } from 'react-popper';
import cx from 'classnames';
import theme from '../../theme';

export type TooltipMode = 'dark' | 'light';

const SIZE = {
    m: 232,
    l: 364,
};

export interface TooltipProps {
    content: ReactNode;
    mode?: TooltipMode;
    className?: string;
    anchorClassName?: string;
    size?: keyof typeof SIZE;
    strategy?: PositioningStrategy;
    placement?: Placement;
    noArrow?: boolean;
    offset?: number;
    isForceOpen?: boolean;
    children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = memo(
    ({
        content,
        children,
        className,
        anchorClassName,
        size = 'm',
        mode = 'dark',
        noArrow = false,
        placement = 'auto',
        strategy = 'absolute',
        offset = noArrow ? 4 : 12,
        isForceOpen = false,
    }) => {
        const [isShow, setIsShow] = useState(false);
        const [arrowEl, setArrowEl] = useState<HTMLDivElement | null>(null);
        const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
        const [popperEl, setPopperEl] = useState<HTMLDivElement | null>(null);
        const container = useRef(document.getElementById('portal-container')) as any;
        const isValidContent = Boolean(content || content === 0);
        const child = useMemo(() => React.Children.only(children) as React.ReactElement, [children]);
        const { styles: popperStyles, attributes } = usePopper(anchorEl, popperEl, {
            strategy,
            placement,
            modifiers: [
                { name: 'arrow', options: { element: arrowEl, padding: 4 } },
                { name: 'offset', options: { offset: [0, offset] } },
            ],
        });

        const handleMouseEnter = useCallback(() => setIsShow(true), []);
        const handleMouseLeave = useCallback(() => setIsShow(false), []);

        useEffect(() => {
            if (!isValidContent) setIsShow(false);
        }, [isValidContent]);

        if (!isValidContent) return child;

        return (
            <>
                <div
                    className={cx('tooltipAnchor', anchorClassName)}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    ref={setAnchorEl}>
                    {child}
                </div>

                {ReactDOM.createPortal(
                    <CSSTransition
                        in={isShow || isForceOpen}
                        timeout={250}
                        appear={isShow || isForceOpen}
                        classNames="tooltip"
                        unmountOnExit
                        mountOnEnter>
                        <div
                            id="tooltip"
                            ref={setPopperEl}
                            style={popperStyles.popper}
                            className={cx('tooltip', className, mode, size)}
                            {...attributes.popper}>
                            {content}

                            {!noArrow && (
                                <div id="arrow" data-popper-arrow ref={setArrowEl} style={popperStyles.arrow}>
                                    <div className="square" />
                                </div>
                            )}

                            <style jsx>
                                {`
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
                                `}
                            </style>
                        </div>
                    </CSSTransition>,
                    container.current,
                )}
            </>
        );
    },
);

export interface TooltipRendererProps extends Partial<TooltipProps> {
    tooltip: React.ReactNode | TooltipProps;
}

export const TooltipRenderer: React.FC<TooltipRendererProps> = memo(({ tooltip, children, ...props }) => {
    if (typeof tooltip === 'string' || typeof tooltip === 'number' || React.isValidElement(tooltip)) {
        return (
            <Tooltip content={tooltip} {...props}>
                {children}
            </Tooltip>
        );
    }

    return (
        <Tooltip {...props} {...(tooltip as TooltipProps)}>
            {children}
        </Tooltip>
    );
});

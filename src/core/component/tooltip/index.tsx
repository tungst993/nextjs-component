import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import React, { useState, memo, ReactNode, useCallback, useMemo, useEffect, useRef } from 'react';
import { Placement, PositioningStrategy } from '@popperjs/core';
import { usePopper } from 'react-popper';
import cx from 'classnames';
import styles from './styles';

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
    position?: number[];
    isCustomPosition?: boolean;
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
        position,
        isCustomPosition,
    }) => {
        const [isShow, setIsShow] = useState(false);
        const [arrowEl, setArrowEl] = useState<HTMLDivElement>(null);
        const [anchorEl, setAnchorEl] = useState<HTMLDivElement>(null);
        const [popperEl, setPopperEl] = useState<HTMLDivElement>(null);
        const [pos, setPos] = useState(null);
        const container = useRef(document.getElementById('portal-container'));
        const isValidContent = Boolean(content || content === 0);
        const child = useMemo(() => React.Children.only(children) as React.ReactElement, [children]);
        const { styles: popperStyles, attributes } = usePopper(anchorEl, popperEl, {
            strategy,
            placement,
            modifiers: [
                { name: 'arrow', options: { element: arrowEl, padding: 4 } },
                /* @ts-ignore */
                { name: 'offset', options: { offset: pos || [0, offset] } },
            ],
        });

        useEffect(() => {
            if (!position) {
                setTimeout(() => setPos(position), 250);
                return;
            }
            setPos(position);
        }, [position]);

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
                        in={isCustomPosition ? isForceOpen : isShow || isForceOpen}
                        timeout={250}
                        appear={isCustomPosition ? isForceOpen : isShow || isForceOpen}
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

                            <style jsx>{styles}</style>
                            <style jsx>{`
                                #tooltip {
                                    background-color: ${isCustomPosition
                                        ? 'rgba(34, 49, 63, 0.5)'
                                        : 'rgba(34, 49, 63,1)'} !important;
                                }
                            `}</style>
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

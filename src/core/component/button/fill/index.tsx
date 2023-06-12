import React from 'react';
import cx from 'classnames';

import { CustomIcon } from 'core/component/customIcon';
import { IconModeType, IconType } from 'core/component/customIcon/consts';
import Spinner, { SpinnerColor, SpinnerSize } from 'component/spinner';

import styles from './styles';

export type ButtonColorType = 'primary' | 'secondary' | 'danger' | 'none';
type SizeType = 's' | 'm' | 'l';

const SPINNER_COLOR_MAP: Record<ButtonColorType, SpinnerColor> = {
    primary: 'dark',
    secondary: 'light',
    danger: 'warning',
    none: 'none',
};

const SPINNER_SIZE_MAP: Record<SizeType, SpinnerSize> = { s: 's', m: 'm', l: 'm' };

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    size?: SizeType;
    loading?: boolean;
    fitWidth?: boolean;
    className?: string;
    iconType?: IconType;
    color?: ButtonColorType;
    iconSide?: 'left' | 'right';
    iconMode?: IconModeType;
}

const FillBtn: React.FC<Props> = ({
    loading,
    iconType,
    children,
    disabled,
    fitWidth,
    className,
    size = 'm',
    iconSide = 'left',
    color = 'primary',
    iconMode = 'outline',
    ...props
}) => {
    const isLoading = !disabled && loading;

    return (
        <button
            className={cx('fillButton', className, size, {
                loading: isLoading,
                disabled: !!disabled,
                [color]: !disabled && Boolean(color),
            })}
            disabled={disabled || loading}
            type="button"
            {...props}>
            <span className={cx('content', { [`icon-${iconSide}`]: Boolean(iconType) })}>
                {!isLoading && iconType && <CustomIcon type={iconType} size={size} mode={iconMode} />}
                {isLoading && <Spinner size={SPINNER_SIZE_MAP[size]} color={SPINNER_COLOR_MAP[color]} />}
                {children && <span className="text">{children}</span>}
            </span>

            <style jsx>{styles}</style>
            <style jsx>
                {`
                    .fillButton {
                        min-width: ${fitWidth ? 0 : 80}px;
                    }
                `}
            </style>
        </button>
    );
};

export default FillBtn;

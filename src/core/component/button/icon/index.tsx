import React, { memo } from 'react';
import cx from 'classnames';

import { IconType, IconModeType, SizeType } from 'core/component/customIcon/consts';
import { CustomIcon } from 'core/component/customIcon';
import Spinner from 'component/spinner';
import theme from 'theme';

import styles from './styles';

const SIZE = {
    s: 24,
    m: 32,
    l: 40,
};

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    color?: string;
    size?: 's' | 'm' | 'l';
    className?: string;
    iconType: IconType;
    iconMode?: IconModeType;
    iconSize?: SizeType;
    loading?: boolean;
}

const IconBtn: React.FC<Props> = ({
    size = 'm',
    iconType,
    iconMode,
    iconSize,
    className,
    color,
    loading,
    disabled,
    ...props
}) => {
    const isLoading = !disabled && loading;

    return (
        <button
            className={cx('iconButton', className, size, {
                loading: isLoading,
                disabled: !!disabled,
            })}
            disabled={disabled || loading}
            type="button"
            {...props}>
            {loading ? <Spinner /> : iconType && <CustomIcon type={iconType} mode={iconMode} size={iconSize} />}

            <style jsx>{styles}</style>
            <style jsx>
                {`
                    .iconButton {
                        color: ${disabled ? theme.color.ink[200] : color || theme.color.ink[400]};

                        &:not(:disabled):hover {
                            color: ${color || theme.color.ink[500]};
                        }
                    }
                `}
            </style>
            <style jsx>
                {`
                    .iconButton.${size} {
                        width: ${SIZE[size]}px;
                        height: ${SIZE[size]}px;
                    }
                `}
            </style>
        </button>
    );
};

export default memo(IconBtn);

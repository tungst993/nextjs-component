import React, { memo } from 'react';
import cx from 'classnames';

import { IconModeType, IconType } from 'component/customIcon/consts';
import { CustomIcon } from 'component/customIcon';
import theme from 'theme';

import styles from './styles';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    iconMode?: IconModeType;
    iconType?: IconType;
    className?: string;
    textColor?: string;
}

const Text: React.FC<Props> = ({ iconType, iconMode, textColor, className, children, disabled, ...props }) => {
    const color = disabled ? theme.color.ink[300] : textColor;

    return (
        <button type="button" className={cx('textButton', className)} disabled={disabled} {...props}>
            {iconType && <CustomIcon className="btnIcon" type={iconType} mode={iconMode} color={color} size="s" />}

            <div className="text" style={{ color: color || theme.color.ink[500] }}>
                {children}
            </div>

            <style jsx>{styles}</style>
        </button>
    );
};

export default memo(Text);

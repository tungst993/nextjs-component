import React, { useState } from 'react';
import cx from 'classnames';

import { IconType, IconModeType, SizeType } from 'core/component/customIcon/consts';
import { CustomIcon } from 'core/component/customIcon';
import { Tooltip } from 'component/tooltip';
import styles from './styles';

export interface ButtonGroupOption {
    tooltip?: React.ReactNode;
    value: any;
    label?: string;
    disabled?: boolean;
    iconType?: IconType;
    iconMode?: IconModeType;
    size?: SizeType;
}

interface Props {
    selected?: any;
    size?: 's' | 'm' | 'l';
    onChange?: (value: any) => void;
    options: ButtonGroupOption[];
    fullWidth?: boolean;
    className?: string;
}

const GroupBtn: React.FC<Props> = ({ options, selected, fullWidth, className, size = 'm', onChange }) => {
    const [state, setState] = useState(selected);
    const selfValue = selected ?? state;

    const handleClick = (value: any) => () => {
        if (value === selfValue) return;
        if (onChange) onChange(value);
        setState(value);
    };

    return (
        <div className={cx('groupButton', className, size, { fullWidth: !!fullWidth })}>
            {options.map(({ value, label, disabled, tooltip, iconType, iconMode, size: iconSize }) => (
                <button
                    key={value}
                    type="button"
                    disabled={disabled}
                    onClick={handleClick(value)}
                    className={cx({ active: selfValue === value })}>
                    {iconType && <CustomIcon type={iconType} mode={iconMode} size={iconSize} />}
                    {label && <span className="label">{label}</span>}
                    {tooltip && (
                        <Tooltip content={tooltip} placement="bottom">
                            <div />
                        </Tooltip>
                    )}
                </button>
            ))}

            <style jsx>{styles}</style>
        </div>
    );
};

export default GroupBtn;

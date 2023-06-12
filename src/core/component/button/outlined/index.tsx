import React from 'react';
import cx from 'classnames';

import { IconType } from 'core/component/customIcon/consts';
import { CustomIcon } from 'core/component/customIcon';

import styles from './styles';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    onClear?: (event: React.MouseEvent<HTMLDivElement>) => void;
    iconType: IconType;
    counter?: number;
}

const OutlinedBtn: React.FC<Props> = ({ counter, iconType, children, onClear, ...props }) => {
    const { disabled } = props;

    const handleClear = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        if (onClear) onClear(event);
    };

    return (
        <button className={cx('outlinedButton', { disabled: !!disabled })} disabled={disabled} type="button" {...props}>
            <span className="content">
                {iconType && <CustomIcon type={iconType} />}
                <span className="text">{children}</span>

                {Boolean(counter) && <span className="counter">{counter}</span>}

                {!disabled && (
                    <div className="clearBtn" onClick={handleClear}>
                        <CustomIcon type="close_circle" size="s" mode="fill" />
                    </div>
                )}
            </span>

            <style jsx>{styles}</style>
        </button>
    );
};

export default OutlinedBtn;

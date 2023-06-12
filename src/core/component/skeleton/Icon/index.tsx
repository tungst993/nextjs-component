import React from 'react';
import cx from 'classnames';

import { SIZE, SizeType } from 'core/component/customIcon/consts';
import theme from 'theme';

interface Props {
    size?: SizeType;
    className?: string;
}

export const Icon: React.FC<Props> = ({ className, size = 'm' }) => (
    <div className={cx('icon', className, size)}>
        <style jsx>
            {`
                div {
                    flex: 0 0 auto;
                    border-radius: 6px;
                    display: inline-block;
                    vertical-align: middle;
                    background-color: ${theme.color.ink[200]} !important;

                    &.${size} {
                        width: ${SIZE[size]}px;
                        height: ${SIZE[size]}px;
                    }
                }
            `}
        </style>
    </div>
);

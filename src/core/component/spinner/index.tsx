import React from 'react';
import cx from 'classnames';

import styles from './styles';

const SIZE = { xxl: 48, xl: 48, l: 32, m: 20, s: 16, xs: 12 };

export type SpinnerColor = 'light' | 'dark' | 'warning' | 'none';
export type SpinnerSize = keyof typeof SIZE;

interface Props extends React.HTMLAttributes<SVGSVGElement> {
    color?: SpinnerColor;
    size?: SpinnerSize;
    duration?: number;
}

const Spinner: React.FC<Props> = ({ className, duration = 1200, size = 'm', color = 'light', ...props }) => {
    return (
        <svg className={cx('spinner', className, size, color)} viewBox={`0 0 ${SIZE[size]} ${SIZE[size]}`} {...props}>
            <circle className="path" fill="none" />

            <style jsx>{styles}</style>
            <style jsx>
                {`
                    .spinner {
                        animation-duration: ${duration}ms;
                    }
                `}
            </style>
        </svg>
    );
};

export default Spinner;

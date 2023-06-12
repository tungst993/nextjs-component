import React, { memo, useMemo } from 'react';
import dynamic from 'next/dynamic';
import cx from 'classnames';

import { Skeleton } from 'component/skeleton';
import { DEFAULT, IconModeType, IconType, SIZE, SizeType } from './consts';

interface Props extends React.HTMLAttributes<SVGElement> {
    type?: IconType;
    size?: SizeType;
    className?: string;
    mode?: IconModeType;
    disabled?: boolean;
    color?: string;
    url?: string;
}

export const CustomIcon: React.FC<Props> = memo(
    ({ type, url, disabled, className, color = DEFAULT.COLOR, size = 'm', mode = 'outline', ...props }) => {
        const isLogo = mode === 'logo';
        const sizeOption = useMemo(() => SIZE, []);
        const modeOption = useMemo(() => (isLogo ? '' : `_${mode || 'outline'}`), [mode, isLogo]);
        const isDisabled = useMemo(() => (isLogo && disabled ? '_disabled' : ''), [disabled, isLogo]);
        const DynamicIcon: any = useMemo(() => {
            if (url && !type)
                return () => (
                    <img
                        src={url}
                        alt="url"
                        style={{
                            borderRadius: '4px',
                            width: `${SIZE[size]}px`,
                            height: `${SIZE[size]}px`,
                        }}
                    />
                );
            return dynamic<React.SVGProps<SVGSVGElement>>(
                () => import(`assets/ic_${sizeOption[size]}system${modeOption}_${type}${isDisabled}.svg`),
                { loading: () => <Skeleton.Icon className={className} size={size} /> },
            );
        }, [type, modeOption, sizeOption, isDisabled, size, className, url]);

        return (
            <>
                <DynamicIcon className={cx('icon', className, size, mode)} {...props} />

                <style jsx>
                    {`
                        svg {
                            display: inline-block;
                            vertical-align: middle;
                            color: ${color};

                            &:not(.logo) {
                                :global(path),
                                :global(circle) {
                                    fill: currentColor;
                                }
                            }

                            &.${size} {
                                width: ${SIZE[size]}px;
                                height: ${SIZE[size]}px;
                            }
                        }
                    `}
                </style>
            </>
        );
    },
);

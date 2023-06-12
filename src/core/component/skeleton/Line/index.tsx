import React from 'react';

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    height?:
        | (string & {})
        | '-moz-max-content'
        | '-moz-min-content'
        | '-webkit-fit-content'
        | 'auto'
        | 'fit-content'
        | 'max-content'
        | 'min-content';
    count?: number;
}

export const Line: React.FC<Props> = ({ height = '1em', count, ...props }) => (
    <>
        {count ? (
            <>
                {new Array(count)?.fill(undefined)?.map((item, index) => (
                    <div key={index} className="skeletonLine" {...props} />
                ))}
            </>
        ) : (
            <div className="skeletonLine" {...props} />
        )}
        <style jsx>
            {`
                .skeletonLine {
                    display: inline-block;
                    height: ${height};
                    width: 100%;
                    position: relative;
                    overflow: hidden;
                    background: linear-gradient(270deg, #e9e9e9 0%, #f5f5f5 98.12%);
                    border-radius: 16px;
                }
            `}
        </style>
    </>
);

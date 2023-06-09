interface TypoProps {
    fontSize: number;
    lineHeight: number;
    letterSpacing?: number;
    fontFamily?: 'Roboto Mono';
    fontWeight: 'normal' | 500 | 700;
    textTransform?: 'capitalize' | 'uppercase' | 'lowercase' | 'revert';
}

const FALLBACK_FONTS = '"Roboto", Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif';

export const getTypo = ({
    fontSize,
    lineHeight,
    fontWeight,
    fontFamily,
    letterSpacing,
    textTransform,
}: TypoProps): string => `
    ${fontFamily ? `font-family: ${fontFamily}, ${FALLBACK_FONTS};` : ''}
    ${letterSpacing ? `letter-spacing: ${letterSpacing}em;` : ''}
    ${textTransform ? `text-transform: ${textTransform};` : ''}
    line-height: ${lineHeight}px;
    font-weight: ${fontWeight};
    font-size: ${fontSize}px;
`;

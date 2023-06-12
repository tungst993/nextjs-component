type TextTransformType = 'capitalize' | 'uppercase' | 'lowercase' | 'revert';
interface TypoProps {
    fontSize: number;
    lineHeight: number;
    letterSpacing?: number;
    fontFamily?: 'Roboto Mono';
    fontWeight: 'normal' | 500 | 700;
    textTransform?: TextTransformType;
}

const FALLBACK_FONTS = '"Roboto", Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif';

export const getTypo = ({
    fontSize,
    lineHeight,
    fontWeight,
    fontFamily,
    letterSpacing,
    textTransform,
}: TypoProps): string => {
    const font = fontFamily ? `font-family: ${fontFamily}, ${FALLBACK_FONTS};` : '';
    const spacing = letterSpacing ? `letter-spacing: ${letterSpacing}em;` : '';
    const transform = textTransform ? `text-transform: ${textTransform};` : '';
    return `
                ${font}
                ${spacing}
                ${transform}
                line-height: ${lineHeight}px;
                font-weight: ${fontWeight};
                font-size: ${fontSize}px;
            `;
};

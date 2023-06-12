export const DEFAULT = {
    MODE: 'outline',
    COLOR: 'inherit',
};

export const SIZE = {
    xs: 12,
    s: 16,
    m: 20,
    l: 24,
    xl: 40,
    xxl: 48,
};

export type SizeType = keyof typeof SIZE;

export type IconModeType = 'outline' | 'fill' | 'logo';

export type IconType =
    // Outline Icons
    | 'arrow_left'
    | 'arrow_right'
    | 'close_mark'
    | 'arrow_down'
    | 'location'
    | 'vnd_ink1'
    | 'account'
    | 'minus_ink1'
    | 'add_ink1'
    | 'close_circle'
    | 'information'
    | 'plus'
    | 'alert_circle'
    | 'close_ink1'
    | 'back_ios_ink1'
    | 'share_ink1'
    | 'placeholder_logo'
    | 'calendar_blue'
    | 'dong_blue'
    | 'location_ink1'
    | 'point_brand_ink1'
    | 'check_circle'
    | 'open_blue'
    | 'info'
    | 'ticket'
    | 'phone'
    | 'messenger'
    | 'trash'
    | 'calendar'
    | 'alert'
    | 'check'
    | 'wifierror';

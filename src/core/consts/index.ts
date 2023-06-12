export const GLOBAL_CONST = {
    VNI_CHARACTERS:
        'ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼẾỀỂưăạảấầẩẫậắằẳẵặẹẻẽếềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý',
};

export const ERROR_URL = {
    404: '/404',
    403: '/403',
};

export const HTTP_STATUS_CODE = {
    200: 200,
    400: 400,
    401: 401,
    403: 403,
    404: 404,
    500: 500,
    503: 503,
};

export const GLOBAL_REGEX = {
    EMAIL: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
    VN_NO_SPECIAL_CHAR: new RegExp(`^[ a-zA-Z0-9${GLOBAL_CONST.VNI_CHARACTERS}]+$`),
    EN_NO_SPECIAL_CHAR: /^[ a-zA-Z0-9]+$/,
    URL: /^\w+:\/\/[-\w.&=%?@:/+#~()]+$/,
    ALLOWED_CRM_CHAR: /^[?!'"_%&\-/:$a-zA-Z0-9 ]*$/,
    NO_VIETNAMESE: new RegExp(`[${GLOBAL_CONST.VNI_CHARACTERS}]+`),
    FILE_EXTENSION: /\.[a-zA-Z]+$/,
    TEMPLATE_CODE_CHAR: /^[_a-zA-Z0-9]*$/,
    CODE_CHAR: /^[_a-zA-Z0-9]*$/,
    NO_NUMBER_FIRST: /^[_a-zA-Z][_a-zA-Z0-9]*$/,
};

export const ENV_PATH_CDN = {
    dev: 'dev',
    qc: 'dev',
    uat: 'dev',
    production: 'net',
};

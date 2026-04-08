declare const _default: (() => {
    secret: string | undefined;
    audience: string | undefined;
    issuer: string | undefined;
    accessTokenTtl: number;
    refreshTokenTtl: number;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    secret: string | undefined;
    audience: string | undefined;
    issuer: string | undefined;
    accessTokenTtl: number;
    refreshTokenTtl: number;
}>;
export default _default;

declare const _default: (() => {
    secret: string | undefined;
    audience: string | undefined;
    issuer: string | undefined;
    accessTokenTtl: number;
    refreshTokenTtl: number;
    googleClientId: string | undefined;
    googleClientSecret: string | undefined;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    secret: string | undefined;
    audience: string | undefined;
    issuer: string | undefined;
    accessTokenTtl: number;
    refreshTokenTtl: number;
    googleClientId: string | undefined;
    googleClientSecret: string | undefined;
}>;
export default _default;

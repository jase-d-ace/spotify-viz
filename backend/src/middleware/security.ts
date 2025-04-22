import { Request, Response, NextFunction } from "express";

export const securityMiddleware = (req: Request, res: Response, next: NextFunction): void =>{

    res.setHeader(
        'Content-Security-Policy',
        "default-src 'self'; " +
        "script-src 'self' 'unsafe-inline' https://*.spotify.com; " +
        "style-src 'self' 'unsafe-inline'; " +
        "img-src 'self' data: https://*.spotify.com; " +
        "connect-src 'self' https://*.spotify.com; " +
        "frame-src 'self' https://*.spotify.com;"
    );

    // Set other security headers
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');

    next();
}
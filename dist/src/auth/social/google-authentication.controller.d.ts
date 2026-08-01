import { GoogleAuthenticationService } from './providers/google-authentication.service';
import { GoogleTokenDto } from './dtos/google-token.dto';
export declare class GoogleAuthenticationController {
    private readonly googleAuthenticationService;
    constructor(googleAuthenticationService: GoogleAuthenticationService);
    authenticate(googleTokenDto: GoogleTokenDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}

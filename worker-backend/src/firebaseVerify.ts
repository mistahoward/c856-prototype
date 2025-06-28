import { jwtVerify, createRemoteJWKSet } from 'jose';

interface FirebaseJWTPayload {
	iss: string;
	aud: string;
	user_id: string;
	exp: number;
	iat: number;
	auth_time: number;
	sub: string;
	email?: string;
	email_verified?: boolean;
	name?: string;
	picture?: string;
}

let jwks: ReturnType<typeof createRemoteJWKSet> | null = null;

export const verifyFirebaseToken = async (
	idToken: string,
	projectId: string
): Promise<FirebaseJWTPayload> => {
	if (!jwks) {
		jwks = createRemoteJWKSet(
			new URL(
				'https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com'
			)
		);
	}

	const { payload } = await jwtVerify(idToken, jwks, {
		issuer: `https://securetoken.google.com/${projectId}`,
		audience: projectId,
	});

	return payload as unknown as FirebaseJWTPayload;
};

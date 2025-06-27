import React, { FC, useState } from 'react';
import {
	Container,
	Card,
	Button,
	Row,
	Col,
	Alert,
	Spinner,
} from 'react-bootstrap';
import { StaticImage } from 'gatsby-plugin-image';
import { navigate, withPrefix } from 'gatsby';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/layout';
import '../scss/main.scss';

const LoginPage: FC = () => {
	const { signInWithGoogle } = useAuth();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	/**
	 * Handles Google sign-in authentication flow
	 * Sets loading state, attempts Google sign-in, and navigates to home page on success
	 * Displays error message if sign-in fails
	 */
	const handleGoogleSignIn = async (): Promise<void> => {
		setLoading(true);
		setError(null);
		try {
			await signInWithGoogle();
			navigate(withPrefix('/'));
		} catch (err: any) {
			setError(err.message || 'Failed to sign in with Google');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Container fluid id="root">
			<Layout>
				<div className="image-card-container">
					<StaticImage
						src="../images/carousel_1.jpg"
						alt="Tropical Paradise"
					/>
					<div className="overlay" />
					<Card className="auth-card">
						<Card.Body className="text-center">
							<Card.Title className="display-6 mb-4">
								Welcome to Tropical Taniti
							</Card.Title>
							<Card.Text className="mb-4">
								Sign in to access your personalized travel
								experience and save your favorite destinations.
							</Card.Text>

							{error && (
								<Alert variant="danger" className="mb-3">
									{error}
								</Alert>
							)}

							<Row className="g-3">
								<Col xs={12}>
									<Button
										variant="outline-primary"
										size="lg"
										className="w-100 d-flex align-items-center justify-content-center"
										onClick={handleGoogleSignIn}
										disabled={loading}
									>
										{loading ? (
											<Spinner
												animation="border"
												size="sm"
												className="me-2"
											/>
										) : (
											<svg
												className="me-2"
												width="20"
												height="20"
												viewBox="0 0 24 24"
											>
												<path
													fill="#4285F4"
													d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
												/>
												<path
													fill="#34A853"
													d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
												/>
												<path
													fill="#FBBC05"
													d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
												/>
												<path
													fill="#EA4335"
													d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
												/>
											</svg>
										)}
										Continue with Google
									</Button>
								</Col>
							</Row>
						</Card.Body>
					</Card>
				</div>
			</Layout>
		</Container>
	);
};

export default LoginPage;

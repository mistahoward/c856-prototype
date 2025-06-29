import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useMutation, gql, useQuery } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';

const SAVE_FAVORITE = gql`
	mutation SaveFavorite($userId: ID!, $type: String!, $itemId: String!) {
		saveFavorite(userId: $userId, type: $type, itemId: $itemId) {
			id
		}
	}
`;

const REMOVE_FAVORITE = gql`
	mutation RemoveFavorite($userId: ID!, $type: String!, $itemId: String!) {
		removeFavorite(userId: $userId, type: $type, itemId: $itemId) {
			id
		}
	}
`;

const GET_CURRENT_USER = gql`
	query GetCurrentUser {
		currentUser {
			id
			favorites {
				id
				type
				itemId
			}
		}
	}
`;

interface FavoriteButtonProps {
	type: 'accommodation' | 'destination';
	itemId: string;
	size?: 'sm' | 'lg';
	className?: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
	type,
	itemId,
	size = 'sm',
	className = '',
}) => {
	const { currentUser } = useAuth();
	const [isFavorite, setIsFavorite] = useState(false);
	const [saveFavorite] = useMutation(SAVE_FAVORITE);
	const [removeFavorite] = useMutation(REMOVE_FAVORITE);

	const { data: userData, refetch } = useQuery(GET_CURRENT_USER, {
		skip: !currentUser,
	});

	useEffect(() => {
		if (userData?.currentUser?.favorites) {
			const isFavorited = userData.currentUser.favorites.some(
				(fav: any) => fav.type === type && fav.itemId === itemId
			);
			setIsFavorite(isFavorited);
		}
	}, [userData, type, itemId]);

	const handleToggleFavorite = async () => {
		if (!currentUser) {
			// Redirect to login or show login modal
			window.location.href = '/login';
			return;
		}

		const userId = userData?.currentUser?.id;
		if (!userId) {
			console.error('No user ID available');
			return;
		}

		try {
			if (isFavorite) {
				await removeFavorite({
					variables: {
						userId,
						type,
						itemId,
					},
				});
				setIsFavorite(false);
				toast.success('Removed from favorites');
			} else {
				await saveFavorite({
					variables: {
						userId,
						type,
						itemId,
					},
				});
				setIsFavorite(true);
				toast.success('Added to favorites');
			}
			refetch();
		} catch (error) {
			console.error('Error toggling favorite:', error);
			toast.error('Error toggling favorite');
		}
	};

	if (!currentUser)
		return (
			<Button
				variant="outline-primary"
				size={size}
				className={className}
				onClick={() => (window.location.href = '/login')}
				title="Sign in to save favorites"
			>
				<FontAwesomeIcon icon={faHeart} />
			</Button>
		);

	return (
		<Button
			variant={isFavorite ? 'danger' : 'outline-danger'}
			size={size}
			className={className}
			onClick={handleToggleFavorite}
			title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
		>
			<FontAwesomeIcon icon={faHeart} />
		</Button>
	);
};

export default FavoriteButton;

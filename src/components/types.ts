import { Location } from '../types';

export type MapContainerProps = {
	locations: Location[];
	type: 'accommodation' | 'destination';
};

export type MarkerListProps = {
	map: any;
	locations: Location[];
	title?: string;
	openPopup: (index: number) => void;
};

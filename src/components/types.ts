import { Location } from '../types';

export type MapContainerProps = {
	locations: Location[];
};

export type MarkerListProps = {
	map: any;
	locations: Location[];
	title?: string;
	openPopup: (index: number) => void;
};

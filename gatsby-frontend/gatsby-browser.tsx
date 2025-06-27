import { wrapRootElement as wrap } from './apollo/wrap-root-element';
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev';

if (process.env.NODE_ENV !== 'production') {
	loadDevMessages();
	loadErrorMessages();
}

export const wrapRootElement = wrap;

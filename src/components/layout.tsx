import React, { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
	console.debug();
	return <div>{children}</div>;
};

export default Layout;

import * as React from 'react';
import type { AppProps } from 'next/app';
import type { NextPage } from 'next';

import '../styles/globals.css';
import '../styles/themeSwitch.css';
import '../styles/changeImpactPlus.css';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
	React.useEffect(() => {
		document.body.classList?.remove('loading');
	}, []);

	// Use the layout defined at the page level, if available
	const getLayout = Component.getLayout ?? ((page) => page);

	return getLayout(<Component {...pageProps} />);
}

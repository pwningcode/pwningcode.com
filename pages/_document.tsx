import * as React from 'react';
import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head />
				<body className="loading">
					<Main />
					<NextScript />
					<script
						src="https://meet.jit.si/external_api.js"
						defer
					></script>
				</body>
			</Html>
		);
	}
}

export default MyDocument;

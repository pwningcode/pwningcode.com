import Head from 'next/head';
import Banner from '../components/Banner';
import FeaturedPortfolio from '../components/FeaturedPortfolio';
import Footer from '../components/Footer';
import Numbers from '../components/Numbers';
import Pricing from '../components/Pricing';
import Questions from '../components/Questions';
import ScrollUp from '../components/ScrollUp';
import Products from '../components/Products';
import Benefits from '../components/Benefits';
import Technologies from '../components/Technologies';
import ProductTable from '../components/ProductTable';

export default function HomePage() {
	return (
		<>
			<Head>
				<title>PwningCode - Jason Barnes - Software Developer</title>
				<meta
					name="description"
					content="Hire a full stack developer for requirements, design, development, web, mobile, and infrastructure using React, React Native, NodeJS, NextJs, Express, TailwindCSS, Material UI, AWS, Vercel &amp; more."
				/>
				<meta
					name="keywords"
					content="React, React Native, NodeJS, NextJs, Express, TailwindCSS, Material UI, AWS, Vercel"
				/>
				<meta property="og:locale" content="en_US" />
				<meta property="og:type" content="website" />
				<meta
					property="og:title"
					content="PwningCode - Jason Barnes - Software Developer"
				/>
				<meta
					property="og:description"
					content="Hire a full stack developer for requirements, design, development, web, mobile, and infrastructure using React, React Native, NodeJS, NextJs, Express, TailwindCSS, Material UI, AWS, Vercel &amp; more."
				/>
				<meta property="og:url" content="https:/pwningcode.com/" />
				<meta property="og:site_name" content="PwningCode" />
				<meta
					property="og:image"
					content="https:/pwningcode.com/photo2.png"
				/>
				<meta
					property="og:image:secure_url"
					content="https:/pwningcode.com/photo2.png"
				/>
				<meta property="og:image:type" content="png" />
				<meta property="og:image:width" content="300" />
				<meta property="og:image:height" content="329" />

				<meta property="twitter:card" content="summary" />
				<meta
					property="twitter:description"
					content="Hire a full stack developer for requirements, design, development, web, mobile, and infrastructure using React, React Native, NodeJS, NextJs, Express, TailwindCSS, Material UI, AWS, Vercel &amp; more."
				/>
				<meta
					property="twitter:image"
					content="https:/pwningcode.com/photo2.png"
				/>
				<meta
					property="twitter:title"
					content="PwningCode - Jason Barnes - Software Developer"
				/>

				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>
				<link rel="manifest" href="/site.webmanifest" />
				<link
					rel="mask-icon"
					href="/safari-pinned-tab.svg"
					color="#000000"
				/>
				<meta name="msapplication-TileColor" content="#ffffff" />
				<meta name="theme-color" content="#ffffff" />
			</Head>
			<Banner />
			<Numbers />
			<FeaturedPortfolio />
			<Benefits />
			<Products />
			<Technologies />
			<ProductTable />
			<Pricing />
			<Questions />
			<Footer />
			<ScrollUp id="banner" />
		</>
	);
}

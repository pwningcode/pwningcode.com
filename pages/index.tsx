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
					content="Hire a full stack developer for requirements, design, development, web, mobile, and infrastructure."
				/>
				<meta
					name="keywords"
					content="React, React Native, NodeJS, NextJs, Express, TailwindCSS, Material UI, AWS, Vercel"
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
			<Pricing />
			<ProductTable />
			<Questions />
			<Footer />
			<ScrollUp id="banner" />
		</>
	);
}

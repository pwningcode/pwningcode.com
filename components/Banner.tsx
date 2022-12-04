import * as React from 'react';
import Image from 'next/image';

const quotes = [
	{
		title: 'Jim Canterucci',
		sub: 'Founder, Constituent Hub, LLC',
		quote: 'Jason is a treasure. Most IT professionals speak/think a different language. Jason however can translate technical concepts into a business perspective. He has built numerous systems for our organization, always pushing the boundaries of the technology successfully.',
		avatar: '/canterucci.jpeg',
	},
	{
		title: 'Tony Zimmerman',
		sub: 'Director of Data at Select Sires Inc.',
		quote: 'Jason is a proven leader in all aspects of application design and development. He is truly an asset to his peers and colleagues. I would recommend him for any cutting edge development effort.',
		avatar: '/zimmerman.jpeg',
	},
	{
		title: 'Karl Sant',
		sub: 'Operations Manager, Thompson Building Associates',
		quote: 'has been working on our software development for around a year now and we have had a great experience working with them on our mobile site for our database.',
		avatar: '/tba.jpg',
	},
];

export default function Banner() {
	const [selected, setSelected] = React.useState(0);
	React.useEffect(() => {
		const interval = setInterval(() => {
			if (selected === quotes.length - 1) {
				setSelected(0);
			} else {
				setSelected(selected + 1);
			}
		}, 7000);
		return () => clearInterval(interval);
	});
	return (
		<section
			id="banner"
			className="sm:relative sm:pt-16 sm:md:py-32 md:flex md:items-center md:justify-center md:py-0 md:pt-0 bg-coolGray-50"
			style={{
				backgroundImage: 'url("assets/pattern-dark2.svg")',
				backgroundPosition: 'center',
			}}
		>
			<div className="sm:container flex items-center px-4 md:px-0 mb-16 md:mb-0 mx-auto h-screen">
				<div className="w-full md:w-1/2 md:pr-8">
					<div className="max-w-sm mx-auto">
						<div className="mb-6 text-center">
							<a className="inline-block mb-6" href="#">
								<Image
									src="/photo.png"
									alt="logo"
									width={300}
									height={329}
									className="rounded-lg"
									style={{
										boxShadow: '0 0 20px 20px #000 inset',
									}}
								/>
							</a>
							<h3 className="mb-4 text-2xl md:text-3xl font-bold text-white">
								A proven full-stack developer
							</h3>
							<p className="text-lg text-coolGray-400 font-medium">
								Requirements, Design, Development, Web, Mobile,
								and Infrastructure
							</p>
							<p className="mt-12">
								{/* <a
									className="inline-block m-2 rounded-md bg-darkCoolGray-500 py-2 px-4 text-sm font-medium leading-5 text-green-50 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
									href="#pricing"
								>
									Blog
								</a>
								<a
									className="inline-block m-2 rounded-md bg-darkCoolGray-500 py-2 px-4 text-sm font-medium leading-5 text-green-50 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
									href="#pricing"
								>
									Projects
								</a> */}
								{/* <a
									className="inline-block m-2 rounded-md bg-darkCoolGray-500 py-2 px-4 text-sm font-medium leading-5 text-green-50 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
									href="#pricing"
								>
									CV
								</a> */}
								<a
									className="inline-block m-2 rounded-md bg-green-500 py-2 px-4 text-sm font-medium leading-5 text-green-50 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
									href="#pricing"
								>
									Hire Me
								</a>
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className="md:absolute md:top-0 md:right-0 md:w-1/2 md:h-full md:pl-4">
				<div className="flex items-center justify-center h-full px-8 py-14 bg-green-500">
					{quotes.map((quote, index) => (
						<div
							key={quote.title}
							className={`relative h-screen pt-24 left-0 right-0 md:max-w-xl mx-auto text-center ease-out transition-all duration-1000 ${
								selected === index
									? 'opacity-100'
									: 'hidden opacity-0'
							}`}
						>
							<div className="relative mb-16">
								<Image
									className="absolute -top-10 left-0 2xl:-left-12"
									src="/assets/quote-top-green.svg"
									alt=""
									width={142}
									height={98}
								/>
								<Image
									className="absolute -bottom-16 right-0"
									src="/assets/quote-down-green.svg"
									alt=""
									width={142}
									height={98}
								/>
								<h3 className="relative text-2xl md:text-3xl leading-tight font-medium text-white">
									{quote.quote}
								</h3>
							</div>
							<div className="relative text-center">
								<Image
									className="w-24 h-24 mb-6 mx-auto rounded-full"
									src={quote.avatar}
									alt={quote.title}
									width={24}
									height={24}
								/>
								<h4 className="mb-2 text-lg text-white font-semibold">
									{quote.title}
								</h4>
								<span className="block mb-8 text-lg text-green-200">
									{quote.sub}
								</span>
								<div className="flex items-center justify-center">
									<a
										className={`w-6 h-6 mr-6 rounded-full cursor-pointer ${
											selected === 0
												? 'bg-white'
												: 'bg-green-600'
										}`}
										onClick={() => setSelected(0)}
									/>
									<a
										className={`w-6 h-6 mr-6 rounded-full cursor-pointer ${
											selected === 1
												? 'bg-white'
												: 'bg-green-600'
										}`}
										onClick={() => setSelected(1)}
									/>
									<a
										className={`w-6 h-6 mr-6 rounded-full cursor-pointer ${
											selected === 2
												? 'bg-white'
												: 'bg-green-600'
										}`}
										onClick={() => setSelected(2)}
									/>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

import * as React from 'react';
import Image from 'next/image';
import { content } from '../content';
import Button from './Button';

const { banner, testimonials } = content;

export default function Banner() {
	const [selected, setSelected] = React.useState(0);
	React.useEffect(() => {
		const interval = setInterval(() => {
			if (selected === testimonials.length - 1) {
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
							<div className="inline-block mb-6">
								<Image
									src="data:image/jpeg;base64,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"
									alt="logo"
									width={300}
									height={329}
									className="rounded-lg"
									style={{
										boxShadow: '0 0 20px 20px #000 inset',
									}}
								/>
							</div>
							<h3 className="mb-4 text-2xl md:text-3xl font-bold text-white">
								{banner.title}
							</h3>
							<p className="text-lg text-coolGray-400 font-medium">
								{banner.description}
							</p>
							<p className="mt-4">
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
								<Button text="Hire Me" url="#pricing" />
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className="md:absolute md:top-0 md:right-0 md:w-1/2 md:h-full md:pl-4">
				<div className="flex items-center justify-center h-full px-8 py-14 bg-green-900">
					{testimonials.map((quote, index) => (
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
									alt="The opening quote symbol"
									width={142}
									height={98}
								/>
								<Image
									className="absolute -bottom-16 right-0"
									src="/assets/quote-down-green.svg"
									alt="The closing quote symbol"
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
								<span className="block mb-8 text-lg text-white">
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
										href="#banner"
										title="First Testimonial"
										aria-label="First Testimonial"
									/>
									<a
										className={`w-6 h-6 mr-6 rounded-full cursor-pointer ${
											selected === 1
												? 'bg-white'
												: 'bg-green-600'
										}`}
										onClick={() => setSelected(1)}
										href="#banner"
										title="Second Testimonial"
										aria-label="Second Testimonial"
									/>
									<a
										className={`w-6 h-6 mr-6 rounded-full cursor-pointer ${
											selected === 2
												? 'bg-white'
												: 'bg-green-600'
										}`}
										onClick={() => setSelected(2)}
										href="#banner"
										title="Third Testimonial"
										aria-label="Third Testimonial"
										aria-roledescription=""
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

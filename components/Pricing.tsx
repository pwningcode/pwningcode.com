import Image from 'next/image';
import { content } from '../content';
import Button from './Button';
const { pricing } = content;

export default function Pricing() {
	return (
		<section
			id="pricing"
			className="py-20 xl:pt-24 xl:pb-28 bg-coolGray-900"
			style={{
				backgroundImage: 'url("/assets/pattern-dark2.svg")',
				backgroundPosition: 'center',
			}}
		>
			<div className="container px-4 mx-auto">
				<h3 className="mb-4 text-3xl md:text-5xl text-white font-bold tracking-tighter">
					{pricing.title}
				</h3>
				<p className="mb-12 text-lg md:text-xl text-coolGray-400 font-medium">
					{pricing.description}
				</p>
				<div className="flex flex-wrap justify-center -mx-4">
					{pricing.items.map((item) => (
						<div
							key={item.id}
							className="w-full md:w-1/2 lg:w-1/3 p-4"
						>
							<div className="flex flex-col items-center pt-10 px-8 pb-8 bg-white rounded-md shadow-md">
								<h3 className="mb-4 text-lg md:text-xl text-coolGray-900 font-medium">
									{item.title}
								</h3>
								<div className="mb-4">
									<span className="relative -top-6 right-1 text-2xl text-coolGray-900 font-medium">
										$
									</span>
									<span className="text-5xl text-coolGray-900 font-medium">
										{item.cost}
									</span>
									<span className="text-3xl text-coolGray-900 font-medium">
										/{item.duration}
									</span>
								</div>
								<ul className="self-start mb-8">
									{item.options.map((option, index) => (
										<li
											key={`${item.id}_${index}`}
											className="flex items-center mb-3 text-coolGray-900 font-medium"
										>
											<Image
												className="mr-3"
												src="/assets/checkbox-green.svg"
												alt="green checkbox"
												width="26"
												height="26"
											/>
											<span>{option}</span>
										</li>
									))}
								</ul>
								<Button text="Get Started" url="#footer" />
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

const items = [
	{
		id: 1,
		title: 'Starter',
		cost: '1,000',
		duration: 'month',
		options: ['Small Projects', 'Starter Templates', 'Customizations'],
	},
	{
		id: 2,
		title: 'Growth',
		cost: '2,500',
		duration: 'month',
		options: ['Ongoing Projects', 'New Features', 'Priority Support'],
	},
	{
		id: 3,
		title: 'Launch',
		cost: '5,000',
		duration: 'month',
		options: ['Large Projects', 'Large Teams', 'Multiple Platforms'],
	},
];

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
					General Development
				</h3>
				<p className="mb-12 text-lg md:text-xl text-coolGray-400 font-medium">
					I do not charge hourly. A subscription ensures that I&apos;m
					always available to handle your requests and provides a no
					hassle relationship. Cancel at any time.{' '}
					<a href="#faq">Check out the FAQ below</a> or{' '}
					<a href="#footer">contact me with any questions</a>.
				</p>
				<div className="flex flex-wrap justify-center -mx-4">
					{items.map((item) => (
						<div
							key={item.id}
							className="w-full md:w-1/2 lg:w-1/3 p-4"
						>
							<div className="flex flex-col items-center pt-10 px-8 pb-8 bg-white rounded-md shadow-md">
								<h3 className="mb-4 text-lg md:text-xl text-green-500 font-medium">
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
											className="flex items-center mb-3 text-coolGray-500 font-medium"
										>
											<img
												className="mr-3"
												src="/assets/checkbox-green.svg"
											/>
											<span>{option}</span>
										</li>
									))}
								</ul>
								<a
									className="inline-block py-3 px-7 w-full text-gray-200 font-medium text-center bg-green-500 rounded-md shadow-sm"
									href="#footer"
								>
									Get Started
								</a>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

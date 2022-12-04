const values = [
	{
		id: 1,
		title: `Fast`,
		description: `Iterate quickly`,
	},
	{ id: 2, title: `Flexible`, description: `I will adapt to your process.` },
	{
		id: 3,
		title: `Quality`,
		description: `Get production ready, tested code`,
	},
	{ id: 4, title: `Experience`, description: `Hit the ground running` },
	{ id: 5, title: `Fixed Pricing`, description: `No surprises` },
	{
		id: 6,
		title: `Ownership`,
		description: `You own all the code and artifacts`,
	},
];

export default function Benefits() {
	return (
		<section
			className="py-24 bg-white"
			style={{
				backgroundImage: 'url("/assets/pattern-white.svg")',
				backgroundPosition: 'center',
			}}
		>
			<div className="container px-4 mx-auto">
				<div className="max-w-5xl mx-auto text-center mb-16 md:mb-24">
					<h2 className="mb-4 text-4xl md:text-5xl leading-tight font-bold tracking-tighter">
						Benefits
					</h2>
					{/* <p className="text-lg md:text-xl text-coolGray-500 font-medium">

					</p> */}
				</div>
				<div className="flex flex-wrap -mx-4">
					{values.map((item) => (
						<div
							key={item.id}
							className="w-full md:w-1/2 lg:w-1/3 px-4 mb-16"
						>
							<div className="relative h-full px-8 pt-14 pb-8 bg-coolGray-50 rounded-md shadow-md">
								<div className="absolute top-0 left-1/2 transform -translate-y-1/2 -translate-x-1/2 inline-flex items-center justify-center h-16 w-16 bg-white rounded-full">
									<div className="inline-flex items-center justify-center w-12 h-12 bg-green-500 rounded-full text-xl font-semibold text-white">
										{item.id}
									</div>
								</div>
								<h3 className="mb-4 text-lg md:text-xl font-bold text-center">
									{item.title}
								</h3>
								<p className="text-coolGray-500 font-medium text-center">
									{item.description}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

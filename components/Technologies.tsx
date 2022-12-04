const items = [
	{
		id: 1,
		title: `Font End`,
		description: `ReactJS, React Native, TailwindCSS, Material UI`,
	},
	{
		id: 2,
		title: `Back End`,
		description: `NodeJS, NextJS, Express, Any Database`,
	},
	{
		id: 3,
		title: `Infrastructure`,
		description: `AWS, Vercel, Docker, VPS.`,
	},
];

export default function Technologies() {
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
						Technologies
					</h2>
					<p className="text-lg md:text-xl text-coolGray-500 font-medium">
						Receive the most value with these proficiencies.
					</p>
				</div>
				<div className="flex flex-wrap -mx-4">
					{items.map((item) => (
						<div
							key={item.id}
							className="w-full md:w-full lg:w-1/3 px-4 mb-16"
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

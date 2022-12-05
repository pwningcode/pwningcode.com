import { content } from '../content';
const { numbers } = content;

export default function Numbers() {
	return (
		<section
			className="py-20 xl:py-24 bg-white"
			style={{
				backgroundImage: 'url("assets/pattern-white.svg")',
				backgroundPosition: 'center',
			}}
		>
			<div className="container px-4 mx-auto">
				<div className="flex flex-wrap justify-center text-center -mx-4">
					{numbers.map((item) => (
						<div
							key={item.id}
							className="w-full md:w-1/3 lg:w-1/4 px-4 mb-8 lg:mb-0"
						>
							<h2 className="mb-2 text-4xl md:text-5xl font-bold text-green-600 tracking-tighter">
								{item.title}
							</h2>
							<p className="text-lg md:text-xl text-coolGray-500 font-medium">
								{item.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

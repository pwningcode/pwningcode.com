// Icons
import Icon from '@mdi/react';

import { content } from '../content';
const { products } = content;

export default function Technologies() {
	return (
		<section
			className="py-24 md:pb-32 bg-coolGray-900"
			style={{
				backgroundImage: 'url("/assets/pattern-dark2.svg")',
				backgroundPosition: 'center',
			}}
		>
			<div className="container px-4 mx-auto">
				<div className="md:max-w-4xl mb-12 mx-auto text-center">
					<h1 className="mb-4 text-3xl md:text-4xl leading-tight text-white font-bold tracking-tighter">
						{products.title}
					</h1>
					<p className="text-lg md:text-xl text-coolGray-400 font-medium">
						{products.description}
					</p>
				</div>
				<div className="flex flex-wrap -mx-4">
					{products.items.map((item) => (
						<div
							key={item.id}
							className="w-full md:w-1/2 lg:w-1/3 px-4"
						>
							<div className="h-full p-8 text-center hover:bg-coolGray-700 rounded-md hover:shadow-xl transition duration-200">
								<div className="inline-flex h-16 w-16 mb-6 mx-auto items-center justify-center text-coolGray-800 bg-green-500 rounded-lg">
									<Icon path={item.icon} size={1} />
								</div>
								<h2 className="mb-4 text-xl md:text-2xl leading-tight text-white font-bold">
									{item.title}
								</h2>
								<p className="text-coolGray-400 font-medium">
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

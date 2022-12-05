// Icons
import Icon from '@mdi/react';

import { content } from '../content';
const { productTable } = content;

export default function ProductTable() {
	return (
		<section
			className="pb-24 md:pb-32 bg-coolGray-900"
			style={{
				backgroundImage: 'url("/assets/pattern-dark2.svg")',
				backgroundPosition: 'center',
			}}
		>
			<div className="container px-4 mx-auto">
				<div className="max-w-4xl mx-auto mb-8 text-center">
					<h3 className="mb-4 text-3xl md:text-4xl leading-tight text-white font-medium tracking-tighter">
						{productTable.title}
					</h3>
					<p className="text-lg md:text-xl text-coolGray-400 font-medium">
						{productTable.description}
					</p>
				</div>
				{productTable.items.map((item) => (
					<div
						key={item.id}
						className="flex flex-wrap items-center p-7 px-10 bg-coolGray-800 rounded-md my-2"
					>
						<div className="w-full md:w-auto mr-auto mb-6 md:mb-0">
							<h3 className="text-lg md:text-xl text-white font-semibold">
								{item.title}
							</h3>
							<p className="text-coolGray-300">
								{item.description}
							</p>
						</div>
						<div className="w-full md:w-auto lg:mr-10 mb-6 md:mb-0">
							<div className="flex flex-wrap">
								{item.icons.map((icon, index) => (
									<div
										key={`${item.id}_${index}`}
										className="inline-flex mb-2 lg:mb-0 mr-2 items-center text-coolGray-400"
									>
										<Icon
											path={icon.icon}
											size={1}
											color={icon.color}
										/>
									</div>
								))}
								<span className="ml-2 font-medium text-coolGray-400">
									{item.cost}
								</span>
							</div>
						</div>
					</div>
				))}
				<div className="w-full text-center pt-8">
					<a
						className="inline-block py-3 px-7 w-full md:w-auto text-lg leading-8 text-green-50 font-medium text-center bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-sm"
						href="#footer"
					>
						Get Started
					</a>
				</div>
			</div>
		</section>
	);
}

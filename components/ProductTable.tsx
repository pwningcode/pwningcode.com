// Icons
import Icon from '@mdi/react';

import { content } from '../content';
import Button from './Button';
const { productTable } = content;

export default function ProductTable() {
	return (
		<section
		id="products"
			className="py-20 xl:pt-24 xl:pb-28 bg-coolGray-900"
			style={{
				backgroundImage: 'url("/assets/pattern-dark2.svg")',
				backgroundPosition: 'center',
			}}
		>
			<div className="container px-4 mx-auto">
				<h3 className="mb-4 text-3xl md:text-5xl text-white font-bold tracking-tighter">
					{productTable.title}
				</h3>
				<p className="mb-12 text-lg md:text-xl text-coolGray-300 font-medium">
					{productTable.description}{' '}
					<span className="text-green-600 font-semibold">
						Delivered to Production.
					</span>
				</p>
			</div>
			<div className="container px-4 mx-auto">
				{/* <div className="max-w-4xl mx-auto mb-8 text-center">
					<h3 className="mb-4 text-3xl md:text-4xl leading-tight text-white font-medium tracking-tighter">
						{productTable.title}
					</h3>
					<p className="text-lg md:text-xl text-coolGray-400 font-medium">
						{productTable.description}
					</p>
				</div> */}
				{productTable.items.map((item) => (
					<div
						key={item.id}
						className="flex flex-wrap items-center p-7 px-10 bg-white rounded-md my-2"
					>
						<div className="w-full md:w-auto mr-auto mb-6 md:mb-0">
							<h3 className="text-lg md:text-xl text-coolGray-900 font-semibold">
								{item.title}
							</h3>
							<p className="text-coolGray-900">
								{item.description}
							</p>
						</div>
						<div className="w-full md:w-auto lg:mr-10 mb-6 md:mb-0">
							<div className="flex flex-wrap">
								{item.icons.map((icon, index) => (
									<div
										key={`${item.id}_${index}`}
										className="inline-flex mb-2 lg:mb-0 mr-2 items-center text-coolGray-900"
									>
										<Icon path={icon.icon} size={1} />
									</div>
								))}
								<span className="ml-2 font-medium text-coolGray-900">
									{item.cost}
								</span>
							</div>
						</div>
					</div>
				))}
				<div className="w-full text-center pt-8">
					<Button text="Get Started" url="#footer" />
				</div>
			</div>
		</section>
	);
}

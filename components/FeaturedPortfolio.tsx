import Image from 'next/image';
import * as React from 'react';
import ChangeImpactPlus from './svgs/ChangeImpactPlus';

export default function FeaturedPortfolio() {
	return (
		<>
			<section
				className="py-20 xl:pt-24 bg-coolGray-900"
				style={{
					backgroundImage: `url('/assets/pattern-dark2.svg')`,
					backgroundPosition: 'center',
				}}
			>
				<div className="container px-4 mx-auto">
					<div className="flex flex-wrap items-center -mx-4">
						<div className="w-full lg:w-1/2 px-4 mb-10">
							<div className="max-w-md">
								<h3 className="mb-8 text-4xl md:text-5xl text-white font-bold tracking-tighter">
									Recent Projects
								</h3>
								<p className="text-lg md:text-xl text-coolGray-400 font-medium">
									Receive professional level design and
									development regardless if you are a new
									startup, a small businesses, or an
									individual.
								</p>
							</div>
						</div>
						<div className="w-full lg:w-1/2 px-4">
							<div className="flex flex-wrap justify-center -mx-4">
								<div className="w-full md:w-1/2 px-4 mb-8">
									<div className="flex items-center h-32 md:h-36 px-4 md:px-8 rounded-md bg-coolGray-800 shadow-md">
										<Image
											src="/projects/accent.png"
											width="450"
											height="86"
											alt=""
										/>
									</div>
								</div>
								<div className="w-full md:w-1/2 px-4 mb-8 lg:mb-0">
									<div className="flex items-center h-32 md:h-36 px-4 md:px-8 rounded-md bg-coolGray-800 shadow-md">
										<ChangeImpactPlus />
									</div>
								</div>
								<div className="w-full md:w-1/2 px-4 mb-8 lg:mb-0">
									<div className="flex items-center h-32 md:h-36 px-4 md:px-8 rounded-md bg-coolGray-800 shadow-md">
										<Image
											src="/projects/talesto.svg"
											width="64"
											height="64"
											alt=""
											style={{ fill: 'white' }}
										/>
										<span className="text-coolGray-50 p-4 text-3xl italic tracking-wide antialiased font-medium">
											Talesto
										</span>
									</div>
								</div>
								<div className="w-full md:w-1/2 px-4 mb-8 md:mb-0">
									<div className="flex items-center h-32 md:h-36 px-4 md:px-8 rounded-md bg-coolGray-800 shadow-md">
										<Image
											src="/projects/tba.png"
											width="250"
											height="64"
											alt=""
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

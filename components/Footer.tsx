import * as React from 'react';
import { content } from '../content';
import Button from './Button';
const { footer } = content;

export default function Footer() {
	return (
		<footer
			id="footer"
			className="py-20 bg-coolGray-900"
			style={{
				backgroundImage: `url('/assets/pattern-dark2.svg')`,
				backgroundPosition: 'center',
			}}
		>
			<div className="container px-4 mx-auto pt-2">
				<h3 className="text-2xl font-semibold text-coolGray-100 mb-4 text-center">
					{footer.title}
				</h3>
				<p className="text-lg text-coolGray-300 mb-12 text-center">
					{footer.description}
				</p>
				<div className="flex flex-wrap justify-center">
					{/* <div className="w-full lg:w-1/3 px-4 py-4 pb-10 flex flex-col justify-center items-center rounded-lg bg-darkCoolGray-600 m-2">
						<h3 className="text-2xl font-semibold text-coolGray-100 mb-8 pt-4 whitespace-nowrap">
							{footer.message}
						</h3>
						<Button
							text="LinkedIn"
							url="https://www.linkedin.com/in/pwningcode"
							blank
						/>
					</div> */}
					<div className="w-full lg:w-1/3 px-4 py-4 pb-10 flex flex-col justify-center items-center rounded-lg bg-darkCoolGray-600 m-2">
						<h3 className="text-2xl font-semibold text-coolGray-100 mb-8 pt-4 whitespace-nowrap">
							{footer.calendar}
						</h3>

						<Button
							text="Schedule Now"
							url="https://calendly.com/pwningcode/introduction"
							blank
						/>

					</div>
				</div>
				<div className="w-full px-4 py-4 mt-1 border-coolGray-700">
					<p className="mb-9 leading-9 text-white text-sm text-center">
						<a
							href="https://www.linkedin.com/in/pwningcode"
							title="Link to LinkedIn Profile"
							aria-label="Link to LinkedIn Profile"
							target="_blank"
							rel="noopener noreferrer"
							className="'inline-block m-2 rounded-md py-3 px-4 text-md font-medium leading-6 text-white outline-darkCoolGray-900 bg-darkCoolGray-500 hover:bg-darkCoolGray-600 focus:ring-darkCoolGray-600 focus:ring-2 focus:ring-opacity-50'"
						>
							Connect with me on LinkedIn
						</a>
					</p>
				</div>
				<div className="w-full px-4 py-4 mt-20 border-t-2 border-coolGray-700">
					<p className="mb-9 leading-9 text-white text-sm text-center">
						© Jason Barnes, Member,{' '}
						<a
							href="https://fvcsolutions.com"
							title="Link to Future Vision Concepts"
							aria-label="Link to Future Vision Concepts"
						>
							Future Vision Concepts, LLC.
						</a>
					</p>
				</div>
			</div>
		</footer>
	);
}

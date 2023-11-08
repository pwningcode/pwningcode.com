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
					<div className="w-full lg:w-1/3 px-4 py-4 flex flex-col justify-center items-center rounded-lg bg-darkCoolGray-600 m-2">
						<h3 className="text-2xl font-semibold text-coolGray-100 mb-4 pt-4">
							{footer.message}
						</h3>
						<div className="badge-base LI-profile-badge" data-locale="en_US" data-size="medium" data-theme="dark" data-type="VERTICAL" data-vanity="pwningcode" data-version="v1">
							<a className="badge-base__link LI-simple-link" href="https://www.linkedin.com/in/pwningcode?trk=profile-badge">Jason Barnes</a>
						</div>
					</div>
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

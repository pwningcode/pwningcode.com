import {
	mdiAws,
	mdiCellphone,
	mdiDevices,
	mdiGoogle,
	mdiReact,
	mdiServer,
	mdiServerNetwork,
	mdiTargetAccount,
	mdiTrafficCone,
	mdiApple,
	mdiWeb,
	mdiLanguageMarkdownOutline,
	mdiDatabaseOutline,
	mdiCreditCardOutline,
	mdiAccount,
	mdiMicrosoft,
	mdiLinux,
	mdiAndroid,
} from '@mdi/js';

export const content = {
	banner: {
		title: `Full Stack Development`,
		description: `Experienced, Design, Development, Web, Mobile, Desktop, and Infrastructure`,
	},
	testimonials: [
		{
			title: 'Jim Canterucci',
			sub: 'Founder, Constituent Hub, LLC',
			quote: 'Jason is a treasure. Most IT professionals speak/think a different language. Jason however can translate technical concepts into a business perspective. He has built numerous systems for our organization, always pushing the boundaries of the technology successfully.',
			avatar: '/canterucci.jpeg',
		},
		{
			title: 'Tony Zimmerman',
			sub: 'Director of Data at Select Sires Inc.',
			quote: 'Jason is a proven leader in all aspects of application design and development. He is truly an asset to his peers and colleagues. I would recommend him for any cutting edge development effort.',
			avatar: '/zimmerman.jpeg',
		},
		{
			title: 'Karl Sant',
			sub: 'Operations Manager, Thompson Building Associates',
			quote: 'has been working on our software development for around a year now and we have had a great experience working with them on our mobile site for our database.',
			avatar: '/tba.jpg',
		},
	],
	numbers: [
		{ id: 1, title: '20+ Years', description: 'Experience' },
		{ id: 2, title: '100+', description: 'Projects' },
		{ id: 3, title: 'Fast', description: 'Turn around time' },
	],
	recent: {
		title: `Recent Projects`,
		description: `Receive professional level design and development regardless if you are a new startup, a small businesses, or an individual.`,
	},
	benefits: {
		title: `Benefits`,
		description: `What do you get?`,
		items: [
			{
				id: 1,
				title: `Fast`,
				description: `Iterate quickly`,
			},
			{
				id: 2,
				title: `Flexible`,
				description: `Adapt to your process`,
			},
			{
				id: 3,
				title: `Quality`,
				description: `Production ready, tested code`,
			},
			{
				id: 4,
				title: `Experience`,
				description: `Hit the ground running`,
			},
			{ id: 5, title: `Fixed Pricing`, description: `No surprises` },
			{
				id: 6,
				title: `Ownership`,
				description: `You own all the code and artifacts`,
			},
		],
	},
	products: {
		title: `Products and Services`,
		description: `How I can help you scale your business?`,
		items: [
			{
				id: 1,
				title: `User Experience`,
				description: `Fast, beautiful, interface design and flow that appeals to your audience.`,
				icon: mdiTargetAccount,
			},
			{
				id: 2,
				title: `Landing Pages & SEO`,
				description: `Landing pages like this one to guide your audience through to your desired Call To Action (CTA).`,
				icon: mdiGoogle,
			},
			{
				id: 3,
				title: `PWA's`,
				description: `Deliver value quickly with web applications that behave just like mobile apps and are responsive to any device.`,
				icon: mdiDevices,
			},
			{
				id: 4,
				title: `Mobile Apps`,
				description: `Help your audience find your products and services in the App Stores.`,
				icon: mdiCellphone,
			},
			{
				id: 5,
				title: `Infrastructure`,
				description: `Find and implement the right platforms and technologies to get the job done.`,
				icon: mdiServerNetwork,
			},
			{
				id: 6,
				title: `Maintenance & Support`,
				description: `Keep your products and services up and running, responsive, and secure.`,
				icon: mdiTrafficCone,
			},
		],
	},
	technologies: {
		title: `Technologies`,
		description: `These are the technologies where I am most proficient and you will receive the most value.`,
		items: [
			{
				id: 1,
				title: `Front End`,
				description: `ReactJS, React Native, TailwindCSS, Material UI`,
				icon: mdiReact,
			},
			{
				id: 2,
				title: `Back End`,
				description: `NodeJS, NextJS, Express, PostgreSQL, MySql, MsSql, MariaDB, DynamoDB`,
				icon: mdiServer,
			},
			{
				id: 3,
				title: `Infrastructure`,
				description: `AWS, Vercel, Docker, VPS`,
				icon: mdiAws,
			},
		],
	},
	pricing: {
		title: `General Development`,
		description: `I do not charge hourly. A subscription ensures that I'm always available to handle your requests and provides a no hassle relationship. Pause at any time. Check out the FAQ below or contact me with any questions.`,
		items: [
			{
				id: 1,
				title: 'Starter',
				cost: '1,000',
				duration: 'month',
				options: [
					'Small Projects',
					'Starter Templates',
					'Customizations',
				],
			},
			{
				id: 2,
				title: 'Growth',
				cost: '2,500',
				duration: 'month',
				options: [
					'Ongoing Projects',
					'New Features',
					'Priority Support',
				],
			},
			{
				id: 3,
				title: 'Launch',
				cost: '5,000',
				duration: 'month',
				options: [
					'Large Projects',
					'Large Teams',
					'Multiple Platforms',
				],
			},
		],
	},
	productTable: {
		title: `Starter Projects`,
		description: `Templates based on past experience to get you started.`,
		items: [
			{
				id: 1,
				title: `Web Starter - Perfect for Startups`,
				description: `Landing, About, Privacy, Terms, and one contact integration hosted on Vercel.com`,
				cost: '$1,000',
				icons: [{ icon: mdiWeb, color: '#f6f6f6' }],
			},
			{
				id: 2,
				title: `Blog Starter`,
				description: `Web Starter + Headless CMS integration on Vercel.com`,
				cost: '$1,500',
				icons: [
					{ icon: mdiWeb, color: '#f6f6f6' },
					{ icon: mdiLanguageMarkdownOutline, color: '#f6f6f6' },
				],
			},
			{
				id: 3,
				title: `Mobile Starter`,
				description: `iOS & Android: Navigation, User Authentication, Profile Page, and 3 views`,
				cost: '$2,500',
				icons: [
					{ icon: mdiApple, color: '#f6f6f6' },
					{ icon: mdiAndroid, color: '#f6f6f6' },
				],
			},
			{
				id: 4,
				title: `Desktop Starter`,
				description: `OS Integration, Navigation, User Authentication, Profile Page, and 3 views`,
				cost: '$2,500',
				icons: [
					{ icon: mdiApple, color: '#f6f6f6' },
					{ icon: mdiMicrosoft, color: '#f6f6f6' },
					{ icon: mdiLinux, color: '#f6f6f6' },
				],
			},
			{
				id: 5,
				title: `SaaS Starter`,
				description: `Web Starter + User Authentication, Profile Page, Stripe Integration on Vercel.com`,
				cost: '$2,500',
				icons: [
					{ icon: mdiAccount, color: '#f6f6f6' },
					{ icon: mdiDatabaseOutline, color: '#f6f6f6' },
					{ icon: mdiCreditCardOutline, color: '#f6f6f6' },
				],
			},
		],
	},
	faq: {
		title: `Frequently Asked Questions`,
		description: ``,
		items: [
			{
				question: 'Do you only sell subscriptions?',
				answer: `I do offer fixed pricing for well scoped projects. Schedule an introduction below and let's talk about it`,
				size: 24,
			},
			{
				question: 'Why not hire a full time developer?',
				answer: 'The average salary for a senior full stack engineer exceeds $100,000 before benefits.  With a monthly subscription you will save thousands and can pause your subscription at any time.',
				size: 24,
			},
			{
				question: 'Why does development take so long?',
				answer: `It doesn't have to.  Proper planning, design, and experience will save months or even years in development time and costs.  I will work with you to ensure development is as speedy as possible and that we find a process to work efficiently together.`,
				size: 24,
			},
			{
				question: 'Are you insured and/or incorporated?',
				answer: `Yes. I am 50% owner of Future Vision Concepts, LLC.  A software consulting firm established in 1999. All billing and contractual agreements will be through this business. COI's available upon request.`,
				size: 24,
			},
			{
				question: 'How much time do I get with my subscription?',
				answer: `You're welcome to think in terms of time if you wish. I would charge $100/hour if I billed by time. Take your subscription in mind and divide by $100/hour. There is not a lot of development that can be done in 12 hours per week. In my experience, billing for time turns out to be much more expensive to my customers and less efficient for me.  I do not like tracking my time. I do whatever needs to be done as efficiently as I can and bring all my experience to the table. You will always receive more value than if I were to bill by the hour.`,
				size: 24,
			},
			{
				question:
					'How can you provide development to several subscribers at once?',
				answer: `I limit new sales and I review my allocation consistently every month. I look at current and future project requirements and communicate with all my customers about their goals.  I am building customer relationships slowly over time to ensure that every customer's expectations are met.`,
				size: 24,
			},
			{
				question: `What if I'm unsatisfied? Can I get a refund?`,
				answer: 'Due to the nature of development and the up-front investment and commitment required, there are no refunds.  I recommend signing up for a plan that has less commitment and upgrade later. And you are always welcome to pause your membership at any time.',
				size: 24,
			},
			{
				question: `What happens to any code, designs, and other artifacts if I cancel my subscription?`,
				answer: 'Your data and IP is yours. I always recommend setting up any infrastructure and accounts under your own name.  You can give me less privileged access and revoke my access at anytime.  All code will be maintained in source control (usually GitHub or AWS CodeCommit) on your account.  Any other designs and artifacts will be shared with you.',
				size: 24,
			},
		],
	},
	footer: {
		title: `Contact Me`,
		description: `Let's schedule an introduction and see if we are a good fit.`,
		message: `Connect with me`,
		calendar: `Add me to your calendar`,
	},
};

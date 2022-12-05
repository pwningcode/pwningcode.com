type Props = {
	text: string;
	url: string;
	blank?: boolean;
};

const className =
	'inline-block m-2 rounded-md py-4 px-6 text-lg font-medium leading-6 text-black outline-green-900 bg-green-500 hover:bg-green-600 focus:ring-green-600 focus:ring-2 focus:ring-opacity-50';

export default function Button({ text, url, blank }: Props) {
	if (blank === true) {
		return (
			<a
				className={className}
				href={url}
				title={text}
				aria-label={text}
				target="_blank"
				rel="noopener noreferrer"
			>
				{text}
			</a>
		);
	}
	return (
		<a className={className} href={url} title={text} aria-label={text}>
			{text}
		</a>
	);
}

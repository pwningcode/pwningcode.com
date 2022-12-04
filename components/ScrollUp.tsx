import * as React from 'react';

// Icons
import Icon from '@mdi/react';
import { mdiArrowUpBold } from '@mdi/js';

type Props = {
	id: string;
	distance?: number;
};

export default function ScrollUp({ id, distance = 1000 }: Props) {
	const [show, setShow] = React.useState(false);

	const listener = React.useCallback(() => {
		if (window.scrollY > distance) {
			setShow(true);
		} else {
			setShow(false);
		}
	}, [distance]);

	React.useEffect(() => {
		window.addEventListener('scroll', listener);
		return () => window.removeEventListener('scroll', listener);
	}, [listener]);

	return (
		<a
			href={`#${id}`}
			className={`fixed bottom-4 right-4 bg-coolGray-900 rounded-full p-3 md:p-1 transition-all delay-300 ${
				show ? 'opacity-100' : 'opacity-0'
			}`}
		>
			<Icon
				path={mdiArrowUpBold}
				size={0.75}
				className="text-coolGray-50"
			/>
		</a>
	);
}

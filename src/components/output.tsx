import { createEffect } from 'solid-js';
import { useCode } from '../context/code';

export default function Output() {
	const [code] = useCode();

	createEffect(() => {
		console.log('The code is: ', code());
	});

	return <div class='output'>{code()}</div>;
}

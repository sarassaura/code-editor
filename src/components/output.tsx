import { createEffect } from 'solid-js';
import { useCode } from '../context/code';

export default function Output() {
	const [code] = useCode();

	return (
		<div class='output'>
			<span class='shrink-0 grow-0'>{code()}</span>
		</div>
	);
}

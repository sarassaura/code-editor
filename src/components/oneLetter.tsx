import { For } from 'solid-js';

export default function OneLetter() {
	return (
		<span class='absolute font-mono text-lg one-letter invisible'>
			<For each={Array(10)}>{() => <span>X</span>}</For>
		</span>
	);
}

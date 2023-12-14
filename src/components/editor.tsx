import { For, createEffect, createSignal, onCleanup, onMount } from 'solid-js';
import { useCode } from '../context/code';

export default function Editor() {
	const [code, setCode] = useCode();
	const [lines, setLines] = createSignal<number>();
	const [limit, setLimit] = createSignal<number>();

	function update(
		e: InputEvent & {
			currentTarget: HTMLTextAreaElement;
			target: HTMLTextAreaElement;
		}
	) {
		setCode(e.target.value);
	}

	function findLimit() {
		const one = document.querySelector('.one-letter') as HTMLSpanElement;
		const parentWidth = (one.parentElement as HTMLDivElement)?.offsetWidth - 32;
		const letter = one.offsetWidth / 10000;

		setLimit(parentWidth / letter);
	}

	onMount(() => {
		window.addEventListener('resize', findLimit);
	});

	onCleanup(() => {
		window.removeEventListener('resize', findLimit);
	});

	onMount(() => {
		findLimit();
	});

	createEffect(() => {
		let lines = code().match(/\n/g)?.length;

		if (lines !== undefined) {
			setLines(lines + 1);
		} else {
			setLines(1);
		}
	});

	return (
		<div class='wrapper'>
			<span class='absolute font-mono text-lg one-letter invisible'>
				<For each={Array(10000)}>{() => <span>X</span>}</For>
			</span>
			<div class='m-3 flex gap-2'>
				<div class='tabs border'>javascript</div>
				<div class='tabs'>markdown</div>
				<div class='tabs'>html</div>
				<div class='tabs'>css</div>
			</div>
			<textarea class='editor' spellcheck={false} onInput={update}>
				Hello World!
			</textarea>
			<div class='m-2 flex justify-end gap-2'>
				<span>Lines: {lines()}</span>
				<span>Chars: {code().length}</span>
				<span>|</span>
				<span>Ln {0},</span>
				<span>Col {0}</span>
				<span>|</span>
				<span>Wrap: {Math.floor(limit()!)}ch</span>
			</div>
		</div>
	);
}

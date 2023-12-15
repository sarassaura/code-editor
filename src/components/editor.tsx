import { For, createEffect, createSignal, onCleanup, onMount } from 'solid-js';
import { useCode } from '../context/code';
import Sample from '../samples/html.sample?raw';

export default function Editor() {
	const [code, setCode] = useCode();
	const [lines, setLines] = createSignal<number>();
	const [chars, setChars] = createSignal<number>();
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
		const letter = one.offsetWidth / 10;

		setLimit(parentWidth / letter);
	}

	onMount(() => {
		findLimit();
		window.addEventListener('resize', findLimit);
	});

	onCleanup(() => {
		window.removeEventListener('resize', findLimit);
	});

	createEffect(() => {
		let lines = code().match(/\r\n|\r|\n/g)?.length;
		let chars = code().match(/./g)?.length;

		if (lines !== undefined) {
			lines++;
		} else {
			lines = 1;
		}

		if (chars == undefined) {
			chars = code().length - lines + 1;
		}

		setLines(lines);
		setChars(chars);
	});

	return (
		<div class='wrapper relative'>
			<span class='absolute font-mono text-lg one-letter invisible'>
				<For each={Array(10)}>{() => <span>X</span>}</For>
			</span>
			<div class='m-3 flex gap-2'>
				<div class='tabs border'>javascript</div>
				<div class='tabs'>markdown</div>
				<div class='tabs'>html</div>
				<div class='tabs'>css</div>
			</div>
			<textarea
				class='editor !text-lg hover:text-lg active:text-lg focus:text-lg selection:text-lg'
				spellcheck={false}
				autocomplete='off'
				autoCapitalize='off'
				data-gramm='false'
				onInput={update}
			>
				{Sample}
			</textarea>
			<div class='m-2 flex justify-end gap-2'>
				<span>Lines: {lines()}</span>
				<span>Chars: {chars()}</span>
				<span>|</span>
				<span>Ln {0},</span>
				<span>Col {0}</span>
				<span>|</span>
				<span>Wrap: {Math.floor(limit()!)}ch</span>
			</div>
		</div>
	);
}

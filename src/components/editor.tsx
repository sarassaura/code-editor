import { createEffect, createSignal } from 'solid-js';
import { useCode } from '../context/code';

export default function Editor() {
	const [code, setCode] = useCode();
	const [lines, setLines] = createSignal<number>();
	const [char, setChar] = createSignal<number>();

	function update(
		e: InputEvent & {
			currentTarget: HTMLTextAreaElement;
			target: HTMLTextAreaElement;
		}
	) {
		setCode(e.target.value);
	}

	createEffect(() => {
		let lines = code().match(/\n/g)?.length;
		let chars = code().match(/./g)?.length;

		if (chars != undefined) {
			setChar(chars);
		} else {
			setChar(code().length);
		}

		if (lines !== undefined) {
			setLines(lines + 1);
		} else {
			setLines(1);
		}
	});

	return (
		<div class='wrapper'>
			<div class='m-3 flex gap-2'>
				<div class='tabs border'>javascript</div>
				<div class='tabs'>markdown</div>
				<div class='tabs'>html</div>
				<div class='tabs'>css</div>
			</div>
			<textarea class='editor' spellcheck={false} onInput={update}>
				Hello World!
			</textarea>
			<div class='m-2 flex justify-end gap-4'>
				<span>Lines: {lines()}</span>
				<span>Chars: {char()}</span>
			</div>
		</div>
	);
}

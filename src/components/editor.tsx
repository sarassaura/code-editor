import { useCode } from '../context/code';

export default function Editor() {
	const [code, setCode] = useCode();

	function update(
		e: InputEvent & {
			currentTarget: HTMLTextAreaElement;
			target: HTMLTextAreaElement;
		}
	) {
		setCode(e.target.value);
	}

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
		</div>
	);
}

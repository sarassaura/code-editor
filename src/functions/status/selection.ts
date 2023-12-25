import { SetStoreFunction } from 'solid-js/store';
import { Status } from '../../context/status';
import { Accessor } from 'solid-js';
import { EditorElement } from '../../context/element';

export default function selection(
	setStatus: SetStoreFunction<Status>,
	editor: Accessor<EditorElement>
) {
	const start = editor()?.selectionStart;
	const end = editor()?.selectionEnd;
	// const dir = editor()?.selectionDirection;
	const value = editor()?.value;

	console.log('ok');

	if (start && end && value) {
		let cut = value.substring(0, end).split(/\r\n?|\n|\u2028|\u2029/);

		console.log(cut);

		setStatus('ln', cut.length);
		setStatus('col', cut[cut.length - 1].length);
		setStatus('sel', Math.abs(end - start));
	}
}

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
	const value = editor()?.value;
	const dir = editor()?.selectionDirection;

	if (
		typeof start == 'number' &&
		typeof end == 'number' &&
		typeof value == 'string'
	) {
		let cut;

		if (dir == 'forward' || dir == 'none') {
			cut = value.substring(0, end).split(/\r\n?|\n|\u2028|\u2029/);
		} else {
			cut = value.substring(0, start).split(/\r\n?|\n|\u2028|\u2029/);
		}

		setStatus('ln', cut.length);
		setStatus('col', cut[cut.length - 1].length);
		setStatus('sel', Math.abs(end - start));
	}
}

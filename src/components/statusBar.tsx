import { Show, createEffect, onCleanup, onMount } from 'solid-js';
import { useStatus } from '../context/status';
import { useTabs } from '../context/code';
import { findLimit, selection } from '../functions/status';
import { useElement } from '../context/element';

export default function StatusBar() {
	const [tabs, SetTabs, active, setActive] = useTabs();
	const [status, setStatus] = useStatus();
	const [editor, setEditor] = useElement();

	let oneLetter: HTMLSpanElement | null;

	onMount(() => {
		oneLetter = document.querySelector('.one-letter') as HTMLSpanElement;
		findLimit(setStatus, oneLetter);
		window.addEventListener('resize', () => findLimit(setStatus, oneLetter));
		window.addEventListener('selectionchange', () =>
			selection(setStatus, editor)
		);
	});

	onCleanup(() => {
		window.removeEventListener('resize', () => findLimit(setStatus, oneLetter));
		window.removeEventListener('selectionchange', () =>
			selection(setStatus, editor)
		);
	});

	createEffect(() => {
		let lines = tabs[active()]?.code.match(/\r\n|\r|\n/g)?.length;
		let chars = tabs[active()]?.code.match(/./g)?.length;

		if (lines !== undefined) {
			lines++;
		} else {
			lines = 1;
		}

		if (chars == undefined) {
			chars = (tabs[active()]?.code?.length! || 0) - lines + 1;
		}

		setStatus('lines', lines);
		setStatus('chars', chars);
	});

	return (
		<div class='m-2 flex justify-end gap-2'>
			<span>Lines: {status['lines']}</span>
			<span>Chars: {status['chars']}</span>
			<span>|</span>
			<span>Ln {status['ln']},</span>
			<span>Col {status['col']}</span>
			<Show when={status['sel']}>
				<span>({status['sel']} selected)</span>
			</Show>
			<span>|</span>
			<span>Wrap: {Math.floor(status['limit']!)}ch</span>
		</div>
	);
}

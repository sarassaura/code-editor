import { createEffect, onCleanup, onMount } from 'solid-js';
import { useStatus } from '../context/status';
import { CodeStore, useTabs } from '../context/code';
import { findLimit } from '../functions/status';

export default function StatusBar() {
	const [tabs, SetTabs, active, setActive] = useTabs();
	const [status, setStatus] = useStatus();

	onMount(() => {
		findLimit(setStatus);
		window.addEventListener('resize', () => findLimit(setStatus));
	});

	onCleanup(() => {
		window.removeEventListener('resize', () => findLimit(setStatus));
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
			<span>Ln {0},</span>
			<span>Col {0}</span>
			<span>|</span>
			<span>Wrap: {Math.floor(status['limit']!)}ch</span>
		</div>
	);
}

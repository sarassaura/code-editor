import { For, createEffect, createSignal, onCleanup, onMount } from 'solid-js';
import { useTabs } from '../context/code';
import { removeTab, changeTabs } from '../functions/tabs';
import { render } from '../functions/editor';
import StatusBar from './statusBar';
import { useStatus } from '../context/status';

export default function Editor() {
	const [tabs, SetTabs, active, setActive] = useTabs();
	const [status, setStatus] = useStatus();

	let wrapperRef: HTMLTextAreaElement | undefined;

	function findLimit() {
		const one = document.querySelector('.one-letter') as HTMLSpanElement;
		const parentWidth = (one.parentElement as HTMLDivElement)?.offsetWidth - 32;
		const letter = one.offsetWidth / 10;

		setStatus('limit', parentWidth / letter);
	}

	onMount(() => {
		findLimit();
		window.addEventListener('resize', findLimit);
	});

	onCleanup(() => {
		window.removeEventListener('resize', findLimit);
	});

	return (
		<div class='wrapper relative'>
			<span class='absolute font-mono text-lg one-letter invisible'>
				<For each={Array(10)}>{() => <span>X</span>}</For>
			</span>
			<div class='tab-container '>
				{Object.keys(tabs).map((name) => (
					<div class={`tab-items ${name == active() ? 'border' : ''}`}>
						<button
							onClick={() =>
								changeTabs(name, wrapperRef, [tabs, SetTabs, active, setActive])
							}
							class='tab-name'
						>
							{name}
						</button>
						<button
							class='close'
							onClick={() =>
								removeTab(name, wrapperRef, [tabs, SetTabs, active, setActive])
							}
						>
							x
						</button>
					</div>
				))}
				<button class='tab-items open'>+</button>
			</div>
			<textarea
				class='editor text-lg'
				spellcheck={false}
				autocomplete='off'
				autoCapitalize='off'
				data-gramm='false'
				onInput={(e) => render(e, [tabs, SetTabs, active, setActive])}
				ref={wrapperRef}
			>
				{tabs[active()]?.code || ''}
			</textarea>
			<StatusBar />
		</div>
	);
}

import { For, createEffect, createSignal, onCleanup, onMount } from 'solid-js';
import { useTabs } from '../context/code';
import { removeTab, changeTabs } from '../functions/tabs';
import { render } from '../functions/editor';
import StatusBar from './statusBar';
import { useStatus } from '../context/status';
import { findLimit } from '../functions/status';

export default function Editor() {
	const [tabs, setTab, activeTab, setActiveTab] = useTabs();
	const [status, setStatus] = useStatus();

	let wrapperRef: HTMLTextAreaElement | undefined;
	let oneLetter: HTMLSpanElement | undefined;

	onMount(() => {
		findLimit(oneLetter, setStatus);
		window.addEventListener('resize', () => findLimit(oneLetter, setStatus));
	});

	onCleanup(() => {
		window.removeEventListener('resize', () => findLimit(oneLetter, setStatus));
	});

	return (
		<div class='wrapper relative'>
			<span
				class='absolute font-mono text-lg one-letter invisible'
				ref={oneLetter}
			>
				<For each={Array(10)}>{() => <span>X</span>}</For>
			</span>
			<div class='tab-container '>
				{Object.keys(tabs).map((name) => (
					<div class={`tab-items ${name == activeTab() ? 'border' : ''}`}>
						<button
							onClick={() =>
								changeTabs(name, wrapperRef, [
									tabs,
									setTab,
									activeTab,
									setActiveTab
								])
							}
							class='tab-name'
						>
							{name}
						</button>
						<button
							class='close'
							onClick={() =>
								removeTab(name, wrapperRef, [
									tabs,
									setTab,
									activeTab,
									setActiveTab
								])
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
				onInput={(e) => render(e, [tabs, setTab, activeTab, setActiveTab])}
				ref={wrapperRef}
			>
				{tabs[activeTab()]?.code || ''}
			</textarea>
			<StatusBar />
		</div>
	);
}

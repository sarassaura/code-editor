import { For } from 'solid-js';
import { useTabs } from '../context/code';
import { removeTab, changeTabs } from '../functions/tabs';
import { render } from '../functions/editor';
import StatusBar from './statusBar';

export default function Editor() {
	const [tabs, setTab, activeTab, setActiveTab] = useTabs();

	let wrapperRef: HTMLTextAreaElement | undefined;

	return (
		<div class='wrapper relative'>
			<span class='absolute font-mono text-lg one-letter invisible'>
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

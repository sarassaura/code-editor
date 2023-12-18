import { onMount } from 'solid-js';
import { useTabs } from '../context/code';
import { changeTabs, removeTab } from '../functions/tabs';

export default function Tabs() {
	const [tabs, setTab, activeTab, setActiveTab] = useTabs();

	let screen: HTMLTextAreaElement | null;

	onMount(() => {
		screen = document.querySelector('.editor');
	});

	return (
		<div class='tab-container '>
			{Object.keys(tabs).map((name) => (
				<div class={`tab-items ${name == activeTab() ? 'border' : ''}`}>
					<button
						onClick={() =>
							changeTabs(name, screen, [tabs, setTab, activeTab, setActiveTab])
						}
						class='tab-name'
					>
						{name}
					</button>
					<button
						class='close'
						onClick={() =>
							removeTab(name, screen, [tabs, setTab, activeTab, setActiveTab])
						}
					>
						x
					</button>
				</div>
			))}
			<button class='tab-items open'>+</button>
		</div>
	);
}

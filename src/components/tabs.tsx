import { useTabs } from '../context/code';
import { changeTabs, removeTab } from '../functions/tabs';
import { useElement } from '../context/element';

export default function Tabs() {
	const [tabs, setTab, activeTab, setActiveTab] = useTabs();
	const [editor, setEditor] = useElement();

	return (
		<div class='tab-container '>
			{Object.keys(tabs).map((name) => (
				<div class={`tab-items ${name == activeTab() ? 'border' : ''}`}>
					<button
						onClick={() =>
							changeTabs(name, editor(), [
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
							removeTab(name, editor(), [tabs, setTab, activeTab, setActiveTab])
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

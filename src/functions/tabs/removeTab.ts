import { CodeStore } from '../../context/code';

export default function removeTab(
	name: string,
	screen: HTMLTextAreaElement | null,
	useTabs: CodeStore
) {
	const [tabs, setTab, activeTab, setActiveTab] = useTabs;

	const anotherTab = Object.keys(tabs).filter((l) => l !== name);

	if (anotherTab.length > 0) {
		setActiveTab(anotherTab[0]);
	}

	setTab(name, undefined);

	if (screen && screen.value) {
		screen.value = tabs[activeTab()]?.code || '';
	}
}

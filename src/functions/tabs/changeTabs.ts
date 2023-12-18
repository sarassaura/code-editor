import { CodeStore } from '../../context/code';

export default function changeTabs(
	name: string,
	screen: HTMLTextAreaElement | null,
	useTabs: CodeStore
) {
	const [tabs, setTab, activeTab, setActiveTab] = useTabs;

	setActiveTab(name);

	if (screen && screen.value) {
		screen.value = tabs[activeTab()]?.code || '';
	}
}

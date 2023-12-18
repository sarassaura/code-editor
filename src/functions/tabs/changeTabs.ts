import { CodeStore } from '../../context/code';

export default function changeTabs(
	name: string,
	wrapper: HTMLTextAreaElement | undefined,
	useTabs: CodeStore
) {
	const [tabs, setTab, activeTab, setActiveTab] = useTabs;

	setActiveTab(name);

	if (wrapper && wrapper.value) {
		wrapper.value = tabs[activeTab()]?.code || '';
	}
}

import { CodeStore } from '../../context/code';

export default function removeTab(
	name: string,
	wrapper: HTMLTextAreaElement | undefined,
	useTabs: CodeStore
) {
	const [tabs, SetTabs, active, setActive] = useTabs;

	const anotherTab = Object.keys(tabs).filter((l) => l !== name);

	if (anotherTab.length > 0) {
		setActive(anotherTab[0]);
	}

	SetTabs(name, undefined);

	if (wrapper && wrapper.value) {
		wrapper.value = tabs[active()]?.code || '';
	}
}

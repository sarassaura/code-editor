import { CodeStore } from '../../context/code';

export default function changeTabs(
	name: string,
	wrapper: HTMLTextAreaElement | undefined,
	useTabs: CodeStore
) {
	const [tabs, SetTabs, active, setActive] = useTabs;

	setActive(name);

	if (wrapper && wrapper.value) {
		wrapper.value = tabs[active()]?.code || '';
	}
}

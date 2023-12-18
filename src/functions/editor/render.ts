import { CodeStore } from '../../context/code';

export default function render(
	e: InputEvent & {
		currentTarget: HTMLTextAreaElement;
		target: HTMLTextAreaElement;
	},
	useTabs: CodeStore
) {
	const [tabs, setTab, activeTab, setActiveTab] = useTabs;

	setTab(activeTab(), 'code', e.target.value);
}

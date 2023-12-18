import { CodeStore } from '../../context/code';

export default function render(
	e: InputEvent & {
		currentTarget: HTMLTextAreaElement;
		target: HTMLTextAreaElement;
	},
	useTabs: CodeStore
) {
	const [tabs, SetTabs, active, setActive] = useTabs;

	SetTabs(active(), 'code', e.target.value);
}

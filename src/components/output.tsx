import { useTabs } from '../context/code';

export default function Output() {
	const [tabs, setTabs, active, setActive] = useTabs();

	return (
		<div class='output'>
			<span class='shrink-0 grow-0'>{tabs[active()]?.code}</span>
		</div>
	);
}

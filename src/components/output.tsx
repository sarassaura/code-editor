import { useTabs } from '../context/code';

export default function Output() {
	const [tabs, setTab, activeTab, setActiveTab] = useTabs();

	return (
		<div class='output'>
			<span class='shrink-0 grow-0'>{tabs[activeTab()]?.code}</span>
		</div>
	);
}

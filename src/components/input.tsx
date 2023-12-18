import { useTabs } from '../context/code';
import { render } from '../functions/editor';

export default function Input() {
	const [tabs, setTab, activeTab, setActiveTab] = useTabs();

	return (
		<textarea
			class='editor text-lg'
			spellcheck={false}
			autocomplete='off'
			autoCapitalize='off'
			data-gramm='false'
			onInput={(e) => render(e, [tabs, setTab, activeTab, setActiveTab])}
		>
			{tabs[activeTab()]?.code || ''}
		</textarea>
	);
}

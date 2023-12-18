import { useTabs } from '../context/code';
import { render } from '../functions/editor';
import StatusBar from './statusBar';
import OneLetter from './oneLetter';
import Tabs from './tabs';

export default function Editor() {
	const [tabs, setTab, activeTab, setActiveTab] = useTabs();

	return (
		<div class='wrapper relative'>
			<OneLetter />
			<Tabs />
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
			<StatusBar />
		</div>
	);
}

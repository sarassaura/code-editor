import StatusBar from './statusBar';
import OneLetter from './oneLetter';
import Tabs from './tabs';
import Input from './input';
import { onMount } from 'solid-js';
import { useElement } from '../context/element';

export default function Editor() {
	const [editor, setEditor] = useElement();

	onMount(() => {
		let textarea = document.querySelector(
			'.editor'
		) as HTMLTextAreaElement | null;

		setEditor(textarea);
	});

	return (
		<div class='wrapper relative'>
			<OneLetter />
			<Tabs />
			<Input />
			<StatusBar />
		</div>
	);
}

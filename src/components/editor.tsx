import StatusBar from './statusBar';
import OneLetter from './oneLetter';
import Tabs from './tabs';
import Input from './input';

export default function Editor() {
	return (
		<div class='wrapper relative'>
			<OneLetter />
			<Tabs />
			<Input />
			<StatusBar />
		</div>
	);
}

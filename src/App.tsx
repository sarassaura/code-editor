import type { Component } from 'solid-js';
import Editor from './components/editor';
import Output from './components/output';
import { CodeProvider } from './context/code';
import { StatusProvider } from './context/status';
import { ElementProvider } from './context/element';

const App: Component = () => {
	return (
		<CodeProvider>
			<ElementProvider>
				<StatusProvider>
					<main>
						<Editor />
						<Output />
					</main>
				</StatusProvider>
			</ElementProvider>
		</CodeProvider>
	);
};

export default App;

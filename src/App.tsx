import type { Component } from 'solid-js';
import Editor from './components/editor';
import Output from './components/output';
import { CodeProvider } from './context/code';
import { StatusProvider } from './context/status';

const App: Component = () => {
	return (
		<CodeProvider>
			<StatusProvider>
				<main>
					<Editor />
					<Output />
				</main>
			</StatusProvider>
		</CodeProvider>
	);
};

export default App;

import type { Component } from 'solid-js';
import Editor from './components/editor';
import Output from './components/output';
import { CodeProvider } from './context/code';

const App: Component = () => {
	return (
		<CodeProvider>
			<main>
				<Editor />
				<Output />
			</main>
		</CodeProvider>
	);
};

export default App;

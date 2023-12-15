import {
	createSignal,
	createContext,
	useContext,
	ParentComponent,
	type Signal
} from 'solid-js';

import Sample from '../samples/html.sample?raw';

const CodeContext = createContext<Signal<string>>();

export const CodeProvider: ParentComponent = (props) => {
	const [code, setCode] = createSignal(Sample);

	return (
		<CodeContext.Provider value={[code, setCode]}>
			{props.children}
		</CodeContext.Provider>
	);
};

export const useCode: () => Signal<string> = () => {
	return useContext(CodeContext)!;
};

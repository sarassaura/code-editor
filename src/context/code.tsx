import {
	createSignal,
	createContext,
	useContext,
	ParentComponent,
	type Signal
} from 'solid-js';

const CodeContext = createContext<Signal<string>>();

export const CodeProvider: ParentComponent = (props) => {
	const [code, setCode] = createSignal('');

	return (
		<CodeContext.Provider value={[code, setCode]}>
			{props.children}
		</CodeContext.Provider>
	);
};

export const useCode: () => Signal<string> = () => {
	return useContext(CodeContext)!;
};

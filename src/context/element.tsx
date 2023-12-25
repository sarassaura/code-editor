import {
	ParentComponent,
	type Signal,
	createContext,
	createSignal,
	useContext
} from 'solid-js';

export type EditorElement = HTMLTextAreaElement | null;

const ElementContext = createContext<Signal<EditorElement>>();

export const ElementProvider: ParentComponent = (props) => {
	const [editor, setEditor] = createSignal<EditorElement>(null);

	return (
		<ElementContext.Provider value={[editor, setEditor]}>
			{props.children}
		</ElementContext.Provider>
	);
};

export const useElement: () => Signal<EditorElement> = () => {
	return useContext(ElementContext)!;
};

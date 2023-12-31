import {
	createContext,
	useContext,
	ParentComponent,
	createSignal,
	Accessor,
	Setter
} from 'solid-js';
import { SetStoreFunction, Store, createStore } from 'solid-js/store';

import HTML from '../samples/html.sample?raw';
import CSS from '../samples/css.sample?raw';
import JS from '../samples/js.sample?raw';
import MD from '../samples/markdown.sample?raw';

const initialState = {
	'index.html': {
		type: 'html',
		code: HTML
	},
	'styles.css': {
		type: 'css',
		code: CSS
	},
	'script.js': {
		type: 'js',
		code: JS
	},
	'markdown.md': {
		type: 'md',
		code: MD
	}
};

export type Tab = {
	type: string;
	code: string;
};

export type Tabs = {
	[key: string]: Tab | undefined;
};

export type CodeStore = [
	Store<Tabs>,
	SetStoreFunction<Tabs>,
	Accessor<string>,
	Setter<string>
];

const CodeContext = createContext<CodeStore>();

export const CodeProvider: ParentComponent = (props) => {
	const [tabs, setTab] = createStore<Tabs>(initialState);
	const [activeTab, setActiveTab] = createSignal<string>('markdown.md');

	return (
		<CodeContext.Provider value={[tabs, setTab, activeTab, setActiveTab]}>
			{props.children}
		</CodeContext.Provider>
	);
};

export const useTabs: () => CodeStore = () => {
	return useContext(CodeContext)!;
};

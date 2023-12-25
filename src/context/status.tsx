import { ParentComponent, createContext, useContext } from 'solid-js';
import { SetStoreFunction, Store, createStore } from 'solid-js/store';

export type Status = {
	[key: string]: number | undefined;
};

export type StatusStore = [Store<Status>, SetStoreFunction<Status>];

const StatusContext = createContext<StatusStore>();

export const StatusProvider: ParentComponent = (props) => {
	const [status, setStatus] = createStore({
		lines: 1,
		limit: 0,
		chars: 0,
		ln: 0,
		col: 0,
		sel: 0
	});

	return (
		<StatusContext.Provider value={[status, setStatus]}>
			{props.children}
		</StatusContext.Provider>
	);
};

export const useStatus: () => StatusStore = () => {
	return useContext(StatusContext)!;
};

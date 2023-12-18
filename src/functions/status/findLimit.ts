import { SetStoreFunction } from 'solid-js/store';
import { Status } from '../../context/status';

export default function findLimit(
	setStatus: SetStoreFunction<Status>,
	one: HTMLSpanElement | null
) {
	if (one && one.parentElement && one.offsetWidth) {
		const parentWidth = (one.parentElement as HTMLDivElement)?.offsetWidth - 32;
		const letter = one.offsetWidth / 10;

		setStatus('limit', parentWidth / letter);
	}
}

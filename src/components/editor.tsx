import { For, createEffect, createSignal, onCleanup, onMount } from 'solid-js';
import { useTabs } from '../context/code';

export default function Editor() {
	const [tabs, SetTabs, active, setActive] = useTabs();
	const [lines, setLines] = createSignal<number>();
	const [chars, setChars] = createSignal<number>();
	const [limit, setLimit] = createSignal<number>();

	let wrapperRef: HTMLTextAreaElement | undefined;

	function removeTab(name: string) {
		const anotherTab = Object.keys(tabs).filter((l) => l !== name);

		if (anotherTab.length > 0) {
			setActive(anotherTab[0]);
		}

		SetTabs(name, undefined);

		if (wrapperRef && wrapperRef.value) {
			wrapperRef.value = tabs[active()]?.code || '';
		}
	}

	function update(
		e: InputEvent & {
			currentTarget: HTMLTextAreaElement;
			target: HTMLTextAreaElement;
		}
	) {
		SetTabs(active(), 'code', e.target.value);
	}

	function changeTabs(name: string) {
		setActive(name);

		if (wrapperRef && wrapperRef.value) {
			wrapperRef.value = tabs[active()]?.code || '';
		}
	}

	function findLimit() {
		const one = document.querySelector('.one-letter') as HTMLSpanElement;
		const parentWidth = (one.parentElement as HTMLDivElement)?.offsetWidth - 32;
		const letter = one.offsetWidth / 10;

		setLimit(parentWidth / letter);
	}

	onMount(() => {
		findLimit();
		window.addEventListener('resize', findLimit);
	});

	onCleanup(() => {
		window.removeEventListener('resize', findLimit);
	});

	createEffect(() => {
		let lines = tabs[active()]?.code.match(/\r\n|\r|\n/g)?.length;
		let chars = tabs[active()]?.code.match(/./g)?.length;

		if (lines !== undefined) {
			lines++;
		} else {
			lines = 1;
		}

		if (chars == undefined) {
			chars = (tabs[active()]?.code?.length! || 0) - lines + 1;
		}

		setLines(lines);
		setChars(chars);
	});

	return (
		<div class='wrapper relative'>
			<span class='absolute font-mono text-lg one-letter invisible'>
				<For each={Array(10)}>{() => <span>X</span>}</For>
			</span>
			<div class='tab-container '>
				{Object.keys(tabs).map((name) => (
					<div class={`tab-items ${name == active() ? 'border' : ''}`}>
						<button onClick={() => changeTabs(name)} class='tab-name'>
							{name}
						</button>
						<button class='close' onClick={() => removeTab(name)}>
							x
						</button>
					</div>
				))}
				<button class='tab-items open'>+</button>
			</div>
			<textarea
				class='editor text-lg'
				spellcheck={false}
				autocomplete='off'
				autoCapitalize='off'
				data-gramm='false'
				onInput={update}
				ref={wrapperRef}
			>
				{tabs[active()]?.code || ''}
			</textarea>
			<div class='m-2 flex justify-end gap-2'>
				<span>Lines: {lines()}</span>
				<span>Chars: {chars()}</span>
				<span>|</span>
				<span>Ln {0},</span>
				<span>Col {0}</span>
				<span>|</span>
				<span>Wrap: {Math.floor(limit()!)}ch</span>
			</div>
		</div>
	);
}

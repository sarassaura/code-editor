import { useStatus } from '../context/status';

export default function StatusBar() {
	const [status, setStatus] = useStatus();

	return (
		<div class='m-2 flex justify-end gap-2'>
			<span>Lines: {status['lines']}</span>
			<span>Chars: {status['chars']}</span>
			<span>|</span>
			<span>Ln {0},</span>
			<span>Col {0}</span>
			<span>|</span>
			<span>Wrap: {Math.floor(status['limit']!)}ch</span>
		</div>
	);
}

import { useCode } from '../context/code';

export default function Output() {
	const [code] = useCode();

	return <div class='output'>{code()}</div>;
}

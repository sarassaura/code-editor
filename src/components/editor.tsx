export default function Editor() {
	return (
		<div class='wrapper'>
			<div class='m-3 flex gap-2'>
				<div class='tabs border'>javascript</div>
				<div class='tabs'>markdown</div>
				<div class='tabs'>html</div>
				<div class='tabs'>css</div>
			</div>
			<textarea
				class='editor'
				contentEditable
				spellcheck={false}
				onChange={(e) => {
					console.log(e);
				}}
			>
				Hello
			</textarea>
		</div>
	);
}

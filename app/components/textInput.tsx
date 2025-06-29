export default function TextInput({
	id,
	name,
	width = "w-60",
}: {
	id: string;
	name: string;
	width?: string;
}) {
	return (
		<input
			id={id}
			name={name}
			type="text"
			className="rounded border p-2 w-full"
			style={{
				maxWidth: width === "w-md" ? "28rem" : "16rem",
			}}
			required
		/>
	);
}

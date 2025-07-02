import type { Route } from "./+types/getForm";
import { useForm } from "@conform-to/react";
import { object, string, optional, pipe, maxLength } from "valibot";
import { parseWithValibot } from "@conform-to/valibot";
import { Form, useActionData } from "react-router";
import { drizzle } from "drizzle-orm/d1";
import { guest, wedding } from "server/db/schema";
import { eq } from "drizzle-orm";
import TextInput from "./textInput";
import AttendanceRadio from "./attendanceRadio";

const postDataSchema = object({
	lastName: string("苗字を入力してください"),
	firstName: string("名前を入力してください"),
	address: string("住所を入力してください"),
	message: optional(
		pipe(string(), maxLength(250, "メッセージは250文字以内で入力してください")),
	),
	information: optional(string()),
	status: string("出欠席を選択してください"),
});

export const action = async ({
	request,
	context,
	params,
}: Route.ActionArgs) => {
	console.log("Action function called");
	const formData = await request.formData();
	console.log("Form data entries:");
	for (const [key, value] of formData.entries()) {
		console.log(`${key}: ${value}`);
	}
	const submission = parseWithValibot(formData, { schema: postDataSchema });
	console.log("Submission result:", submission);
	if (submission.status !== "success") {
		console.log("Validation failed:", submission.error);
		return submission.reply();
	}

	// URLからUUIDを取得
	const uuid = params.uuid;
	if (!uuid) {
		throw new Error("UUIDが見つかりません");
	}

	const db = drizzle(context.cloudflare.env.DB);

	// UUIDを使用してweddingテーブルからuser_idを取得
	const weddingResult = await db
		.select({ user_id: wedding.user_id })
		.from(wedding)
		.where(eq(wedding.id, uuid))
		.limit(1);

	if (!weddingResult || weddingResult.length === 0) {
		throw new Error("該当する結婚式情報が見つかりません");
	}

	// 取得したuser_idを使用してguest情報をINSERT
	console.log("Inserting guest data:", {
		name: `${submission.value.lastName}　${submission.value.firstName}`,
		address: submission.value.address,
		message: submission.value.message || "",
		information: submission.value.information || "",
		status: submission.value.status,
		user_id: weddingResult[0].user_id,
	});

	try {
		await db.insert(guest).values({
			name: `${submission.value.lastName}　${submission.value.firstName}`,
			address: submission.value.address,
			message: submission.value.message || "",
			information: submission.value.information || "",
			status: submission.value.status,
			user_id: weddingResult[0].user_id,
		});
		console.log("Insert successful");
	} catch (error) {
		console.error("Insert failed:", error);
		throw error;
	}

	// 成功メッセージを返す
	return {
		...submission.reply(),
		success: true,
		message: "ご回答ありがとうございます",
	};
};

export default function GuestForm() {
	const lastResult = useActionData();
	const [form, fields] = useForm({
		lastResult,
		shouldValidate: "onSubmit",
		shouldRevalidate: "onSubmit",
		onValidate({ formData }) {
			return parseWithValibot(formData, { schema: postDataSchema });
		},
	});

	// 成功状態を判定
	const isSuccess = lastResult?.success;

	return (
		<div className="flex flex-col justify-center items-center w-full max-w-full px-2 box-border">
			<div className="text-2xl md:text-3xl font-bold">回答フォーム</div>
			<br />
			<Form
				id={form.id}
				onSubmit={form.onSubmit}
				method="POST"
				className="space-y-6 w-full max-w-full overflow-hidden box-border"
				style={{ maxWidth: "28rem" }}
			>
				<div className="w-full space-y-2">
					<AttendanceRadio
						name={fields.status.name}
						value={fields.status.value || ""}
						id={fields.status.id}
					/>

					{fields.status.errors && (
						<div className="text-red-600">{fields.status.errors[0]}</div>
					)}
				</div>

				<div className="w-full space-y-2">
					<label htmlFor={fields.lastName.id} className="block font-medium">
						姓 <span className="text-red-500">*</span>
					</label>
					<TextInput id={fields.lastName.id} name={fields.lastName.name} />
					{fields.lastName.errors && (
						<div className="text-red-600">{fields.lastName.errors[0]}</div>
					)}
				</div>

				<div className="w-full space-y-2">
					<label htmlFor={fields.firstName.id} className="block font-medium">
						名 <span className="text-red-500">*</span>
					</label>
					<TextInput id={fields.firstName.id} name={fields.firstName.name} />
					{fields.firstName.errors && (
						<div className="text-red-600">{fields.firstName.errors[0]}</div>
					)}
				</div>

				<div className="w-full space-y-2">
					<label htmlFor={fields.address.id} className="block font-medium">
						住所 <span className="text-red-500">*</span>
					</label>
					<TextInput
						id={fields.address.id}
						name={fields.address.name}
						width="w-md"
					/>
					{fields.address.errors && (
						<div className="text-red-600">{fields.address.errors[0]}</div>
					)}
				</div>

				<div className="w-full space-y-2">
					<label htmlFor={fields.message.id} className="block font-medium">
						メッセージ
					</label>
					<textarea
						id={fields.message.id}
						name={fields.message.name}
						maxLength={250}
						className="rounded border p-2 h-24"
						style={{ width: "100%" }}
					/>
					{fields.message.errors && (
						<div className="text-red-600">{fields.message.errors[0]}</div>
					)}
				</div>

				<div className="w-full space-y-2">
					<label htmlFor={fields.information.id} className="block font-medium">
						食品のアレルギーがある方はできる限り
						<br />
						配慮させて頂きますのでお書き添えください
					</label>
					<TextInput
						id={fields.information.id}
						name={fields.information.name}
						width="w-md"
					/>
					{fields.information.errors && (
						<div className="text-red-600">{fields.information.errors[0]}</div>
					)}
				</div>

				<div className="w-full flex flex-col items-center mb-6">
					{isSuccess && (
						<div className="mb-4 text-center">
							<div className="text-black font-medium text-lg">
								{lastResult.message}
							</div>
						</div>
					)}

					<button
						type="submit"
						disabled={isSuccess}
						className="flex justify-center items-center px-8 py-2 rounded-md border-2 transition-all duration-200 font-medium"
						style={{
							borderColor: isSuccess ? "#ccc" : "#991b1b",
							backgroundColor: isSuccess ? "#f5f5f5" : "white",
							color: isSuccess ? "#999" : "#991b1b",
							cursor: isSuccess ? "not-allowed" : "pointer",
						}}
						onMouseEnter={(e) => {
							if (!isSuccess) {
								e.currentTarget.style.borderColor = "#fbbf24";
								e.currentTarget.style.backgroundColor = "#991b1b";
								e.currentTarget.style.color = "white";
							}
						}}
						onMouseLeave={(e) => {
							if (!isSuccess) {
								e.currentTarget.style.borderColor = "#991b1b";
								e.currentTarget.style.backgroundColor = "white";
								e.currentTarget.style.color = "#991b1b";
							}
						}}
					>
						{isSuccess ? "送信済み" : "送信"}
					</button>
				</div>
			</Form>
		</div>
	);
}

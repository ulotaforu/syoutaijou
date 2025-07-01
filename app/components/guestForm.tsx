import type { Route } from "./+types/getForm";
import { useForm } from "@conform-to/react";
import { object, string } from "valibot";
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
	message: string(),
	information: string(),
	status: string(),
});

export const action = async ({
	request,
	context,
	params,
}: Route.ActionArgs) => {
	const formData = await request.formData();
	const submission = parseWithValibot(formData, { schema: postDataSchema });
	if (submission.status !== "success") {
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
	await db.insert(guest).values({
		name: `${submission.value.lastName}　${submission.value.firstName}`,
		address: submission.value.address,
		message: submission.value.message,
		information: submission.value.information,
		status: submission.value.status,
		user_id: weddingResult[0].user_id,
	});
	return submission;
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

	// 出欠席の状態はラジオボタン自体の状態で管理するため、Reactステートは不要

	return (
		<div className="flex flex-col justify-center items-center w-full max-w-full px-2 box-border">
			<div className="text-2xl md:text-3xl font-bold">回答フォーム</div>
			<br />
			<Form
				id={form.id}
				onSubmit={form.onSubmit}
				className="space-y-6 w-full max-w-full overflow-hidden box-border"
				style={{ maxWidth: "28rem" }}
			>
				<div className="w-full space-y-2">
					<AttendanceRadio
						name={fields.status.name}
						value={fields.status.value || ""}
						onChange={(value) => {
							// フォームフィールドの値を更新
							const input = document.querySelector(
								`input[name="${fields.status.name}"][value="${value}"]`,
							);
							if (input instanceof HTMLInputElement) {
								input.checked = true;
							}
						}}
						required={true}
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

				<div className="w-full flex justify-center mb-6">
					<button
						type="submit"
						className="cursor-pointer flex justify-center items-center px-8 py-2 rounded-md border-2 transition-all duration-200 font-medium"
						style={{
							borderColor: "#991b1b",
							backgroundColor: "white",
							color: "#991b1b"
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.borderColor = "#fbbf24";
							e.currentTarget.style.backgroundColor = "#991b1b";
							e.currentTarget.style.color = "white";
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.borderColor = "#991b1b";
							e.currentTarget.style.backgroundColor = "white";
							e.currentTarget.style.color = "#991b1b";
						}}
					>
						送信
					</button>
				</div>
			</Form>
		</div>
	);
}

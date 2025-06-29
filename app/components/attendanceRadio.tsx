import React, { useState } from "react";

type AttendanceRadioProps = {
	name: string;
	value?: string;
	onChange?: (value: string) => void;
	required?: boolean;
};

export default function AttendanceRadio({
	name,
	value,
	onChange,
	required = false,
}: AttendanceRadioProps) {
	// 内部状態として選択状態を管理
	const [selectedValue, setSelectedValue] = useState(value || "");

	// 選択が変更されたときのハンドラー
	const handleChange = (newValue: string) => {
		setSelectedValue(newValue);
		// onChangeハンドラがある場合のみ呼び出し
		if (onChange) {
			onChange(newValue);
		}
	};

	return (
		<fieldset>
			<legend className="block font-medium mb-2">
				出欠席 <span className="text-red-500">*</span>
			</legend>
			<div className="space-x-4 flex">
				<div className="relative">
					<input
						id={`${name}-yes`}
						name={name}
						type="radio"
						value="attend"
						className="sr-only" /* スクリーンリーダーのみに表示 */
						required={required}
						checked={selectedValue === "attend"}
						onChange={() => handleChange("attend")}
					/>
					<label
						htmlFor={`${name}-yes`}
						className="group cursor-pointer flex items-center px-6 py-2 rounded-md border-2 transition-all duration-200 font-medium
                       text-red-800"
						style={{
							borderColor: selectedValue === "attend" ? "#fbbf24" : "#991b1b",
							backgroundColor: selectedValue === "attend" ? "#991b1b" : "white",
							color: selectedValue === "attend" ? "white" : "#991b1b"
						}}
					>
						<span
							className="inline-block w-5 h-5 mr-2 rounded-full border-2 transition-all duration-200 flex-shrink-0 relative"
							style={{
								backgroundColor: "white",
								borderColor: "#991b1b",
								display: "flex",
								alignItems: "center",
								justifyContent: "center"
							}}
						>
							{selectedValue === "attend" && (
								<span
									className="w-3 h-3 rounded-full"
									style={{ 
										backgroundColor: "#fbbf24",
										position: "absolute",
										left: "50%",
										top: "50%",
										transform: "translate(-50%, -50%)"
									}}
								></span>
							)}
						</span>
						ご出席
					</label>
				</div>
				<div className="relative">
					<input
						id={`${name}-no`}
						name={name}
						type="radio"
						value="absent"
						className="sr-only" /* スクリーンリーダーのみに表示 */
						checked={selectedValue === "absent"}
						onChange={() => handleChange("absent")}
					/>
					<label
						htmlFor={`${name}-no`}
						className="group cursor-pointer flex items-center px-6 py-2 rounded-md border-2 transition-all duration-200 font-medium
                       text-red-800"
						style={{
							borderColor: selectedValue === "absent" ? "#fbbf24" : "#991b1b",
							backgroundColor: selectedValue === "absent" ? "#991b1b" : "white",
							color: selectedValue === "absent" ? "white" : "#991b1b"
						}}
					>
						<span
							className="inline-block w-5 h-5 mr-2 rounded-full border-2 transition-all duration-200 flex-shrink-0 relative"
							style={{
								backgroundColor: "white",
								borderColor: "#991b1b",
								display: "flex",
								alignItems: "center",
								justifyContent: "center"
							}}
						>
							{selectedValue === "absent" && (
								<span
									className="w-3 h-3 rounded-full"
									style={{ 
										backgroundColor: "#fbbf24",
										position: "absolute",
										left: "50%",
										top: "50%",
										transform: "translate(-50%, -50%)"
									}}
								></span>
							)}
						</span>
						ご欠席
					</label>
				</div>
			</div>
		</fieldset>
	);
}

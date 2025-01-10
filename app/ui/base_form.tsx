// Purpose: Contains the base form component that all forms will inherit from.
// All other forms will just pass props to this component. to be rendered.

import React, { useState } from "react";

export interface BaseFormProps {
	title: string;
	fields: Field[];
	submit: any; // function to call when form is submitted (optional)
	submitText: string;
}

interface Field {
	name: string;
	label: string;
	type: "select" | "file" | "text" | "textarea" | "password" | "email" | "date" | "time";
	// options : in case of select
	options?: string[];
	// placeholder : in case of input
	placeholder?: string;
}

export const BaseForm: React.FC<BaseFormProps> = ({
	title, // title of the form
	fields, // array of objects with name, label, type
	submit, // function to call when form is submitted
	submitText, // text to display on submit button
}) => {
	const [form, setForm] = useState<{
		[key: string]: any;
	}>({});

	const [success, setSuccess] = useState<string>("");
    const [error, setError] = useState<string>("");

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value, type, files } = e.target as HTMLInputElement;

		if (type === "file" && files) {
			setForm({ ...form, [name]: files[0] });
		} else {
			setForm({ ...form, [name]: value });
		}
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(form);
        // Set error for empty fields
        for (const field of fields) {
            if (!form[field.name]) {
                setError(`${field.label} cannot be empty!`);
                return;
            }
        }
		submit(form);
		setSuccess("success!");
	};

	return (
		<div className="base-form shadow-md p-4 rounded-md bg-gray-900 text-white">
			<h1 className="text-xl font-black font-mono border-b pb-2 border-blue-200">
				{title}
			</h1>
			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				{fields.map((field: Field) => (
					<div key={field.name} className="flex gap-2 items-center p-1">
						<label className="text-lg" htmlFor={field.name}>
							{field.label}
						</label>
						{field.type === "select" ? (
							<select
								name={field.name}
								value={form[field.name] || ""}
								onChange={handleChange}
								className="p-2 text-black flex-grow rounded-md"
							>
								{/* First option */}
								<option value="">Select...</option>
								{field.options?.map((option: string) => (
									<option key={option.replace(" ", "-")} value={option}>
										{option}
									</option>
								))}
							</select>
						) : field.type === "textarea" ? (
							<textarea
								name={field.name}
								value={form[field.name] || ""}
								onChange={handleChange}
								placeholder={field.placeholder}
								className="p-2 text-black flex-grow rounded-md"
							/>
						) : field.type === "file" ? (
							<input type="file" name={field.name} onChange={handleChange} />
						) : (
							// text, password, email
							<input
								type={field.type}
								name={field.name}
								value={form[field.name] || ""}
								onChange={handleChange}
								placeholder={field.placeholder}
								className="p-2 text-black flex-grow rounded-md"
							/>
						)}
					</div>
				))}
				<button
					type="submit"
					className="w-fit bg-green-600 hover:bg-green-800 text-white font-bold px-2 text-xl rounded"
				>
					{submitText}
				</button>
			</form>
			{error && <p className="text-red-500">{error}</p>}
			{success && <p className="text-green-500">{success}</p>}
		</div>
	);
};

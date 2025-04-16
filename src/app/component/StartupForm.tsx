"use client";

import { useActionState, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { formSchema } from "@/lib/validation";

const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("**Hello world!!!**");

  // const handleFormSubmit = async (prevState: any, formData: FormData) => {
  //   try {
  //     const formValues = {
  //       title: formData.get("title") as string,
  //       description: formData.get("description") as string,
  //       category: formData.get("category") as string,
  //       link: formData.get("link") as string,
  //       pitch,
  //     };

  //     console.log("Form Data Submitted:", formValues);

  //     await formSchema.parseAsync(formValues);
  //     return { ...prevState, error: "", status: "SUCCESS" };
  //   } catch (error) {
  //     console.log("Error Occurred:", error);
  //     if (error instanceof z.ZodError) {
  //       const fieldErrors = error.flatten().fieldErrors;
  //       setErrors(fieldErrors as unknown as Record<string, string>);
  //       return { ...prevState, error: "Validation failed", status: "ERROR" };
  //     }

  //     return {
  //       ...prevState,
  //       error: "Unexpected error occurred",
  //       status: "ERROR",
  //     };
  //   }
  // };

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch,
      };

      console.log("Submitting form:", formValues);

      // Send request to backend
      const response = await fetch("/api/create-pitch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      const result = await response.json();

      if (!response.ok)
        throw new Error(result.message || "Failed to create pitch");

      console.log("Server Response:", result);

      return { ...prevState, error: "", status: "SUCCESS" };
    } catch (error) {
      console.error("Error Occurred:", error);
      return {
        ...prevState,
        error: "Unexpected error occurred",
        status: "ERROR",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form action={formAction} className="my-15 mx-20 px-20">
      <div className="flex flex-col gap-3 mb-6">
        <label htmlFor="title" className="font-bold text-2xl">
          TITLE
        </label>
        <input
          type="text"
          id="title"
          className="border-3 border-black p-4 rounded-4xl"
          name="title"
          placeholder="Startup title"
          required
        />
        {errors.title && <p className="text-red-500">{errors.title}</p>}
      </div>

      <div className="flex flex-col gap-3 mb-6">
        <label htmlFor="description" className="font-bold text-2xl">
          Description
        </label>
        <textarea
          id="description"
          className="border-3 border-black p-5 rounded-4xl"
          name="description"
          placeholder="Startup description"
          required
        />
        {errors.description && (
          <p className="text-red-500">{errors.description}</p>
        )}
      </div>

      <div className="flex flex-col gap-3 mb-6">
        <label htmlFor="category" className="font-bold text-2xl">
          Category
        </label>
        <input
          type="text"
          id="category"
          className="border-3 border-black p-4 rounded-4xl"
          name="category"
          placeholder="Startup Category (Tech, Health, etc...)"
          required
        />
        {errors.category && <p className="text-red-500">{errors.category}</p>}
      </div>

      <div className="flex flex-col gap-3 mb-6">
        <label htmlFor="link" className="font-bold text-2xl">
          Image URL
        </label>
        <input
          id="link"
          className="border-3 border-black p-4 rounded-4xl"
          name="link"
          placeholder="Startup Image URL"
          required
        />
        {errors.link && <p className="text-red-500">{errors.link}</p>}
      </div>

      <div className="flex flex-col gap-3 mb-6">
        <label htmlFor="pitch" className="font-bold text-2xl">
          Pitch
        </label>
        <MDEditor
          value={pitch}
          onChange={(value) => setPitch(value as string)}
          id="pitch"
          preview="edit"
          height={300}
          textareaProps={{
            placeholder:
              "Briefly describe your problem and explain what it solves",
          }}
          previewOptions={{ disallowedElements: ["style"] }}
        />
        {errors.pitch && <p className="text-red-500">{errors.pitch}</p>}
      </div>

      <button
        type="submit"
        className="px-20 py-4 border-4 border-black bg-pink-500 rounded-4xl text-white text-xl font-semibold cursor-pointer"
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Submit your pitch"}
      </button>
    </form>
  );
};

export default StartupForm;

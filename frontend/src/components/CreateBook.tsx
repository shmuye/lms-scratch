import z from "zod";
import { createBook } from "../services/book.api";
import { useForm } from "react-hook-form";
import { createBookSchema } from "../../../shared/validations/book.schema.js";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { categoryEnum } from "../../../shared/constants/bookCategory.js";
import { useQueryClient } from "@tanstack/react-query";
import { showError, showSuccess } from "../utils.js";

export type Book = z.input<typeof createBookSchema>;

const CreateBook = () => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Book>({
    resolver: zodResolver(createBookSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      showSuccess("Book Created Successfully");
      reset();
    },
    onError: () => {
      showError("Error Creating book, Try again");
    },
  });

  const handleCreateBook = (data: Book) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "coverPage") {
        formData.append("coverPage", value[0]);
      } else {
        formData.append(key, String(value));
      }
    });

    mutate(formData);
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-4 sm:p-6 md:p-8">
        <form
          onSubmit={handleSubmit(handleCreateBook)}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
        >
          {/* Title */}
          <div className="flex flex-col">
            <label className="label">Title</label>
            <input
              {...register("title")}
              placeholder="Enter Title"
              className="input"
            />
            {errors.title && <p className="error">{errors.title.message}</p>}
          </div>

          {/* Author */}
          <div className="flex flex-col">
            <label className="label">Author</label>
            <input
              {...register("author")}
              placeholder="Author"
              className="input"
            />
            {errors.author && <p className="error">{errors.author.message}</p>}
          </div>

          {/* ISBN */}
          <div className="flex flex-col">
            <label className="label">ISBN</label>
            <input
              {...register("isbn")}
              placeholder="Enter ISBN"
              className="input"
            />
            {errors.isbn && <p className="error">{errors.isbn.message}</p>}
          </div>

          {/* Category */}
          <div className="flex flex-col">
            <label className="label">Category</label>
            <select {...register("category")} className="input">
              {categoryEnum.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="error">{errors.category.message}</p>
            )}
          </div>

          {/* Total Copies */}
          <div className="flex flex-col">
            <label className="label">Total Copies</label>
            <input
              type="number"
              {...register("totalCopies", { valueAsNumber: true })}
              className="input"
            />
            {errors.totalCopies && (
              <p className="error">{errors.totalCopies.message}</p>
            )}
          </div>

          {/* Copies Available */}
          <div className="flex flex-col">
            <label className="label">Copies Available</label>
            <input
              type="number"
              {...register("copiesAvailable", { valueAsNumber: true })}
              className="input"
            />
            {errors.copiesAvailable && (
              <p className="error">{errors.copiesAvailable.message}</p>
            )}
          </div>

          {/* Published Year */}
          <div className="flex flex-col">
            <label className="label">Published Year</label>
            <input
              type="number"
              {...register("publishedYear", { valueAsNumber: true })}
              className="input"
            />
            {errors.publishedYear && (
              <p className="error">{errors.publishedYear.message}</p>
            )}
          </div>

          {/* Cover Image */}
          <div className="flex flex-col">
            <label className="label">Cover Image</label>
            <input
              type="file"
              accept="image/*"
              {...register("coverPage", {
                validate: (files) => {
                  if (!files || files.length === 0) {
                    return "Cover image is required";
                  }

                  const file = files[0];

                  if (!file.type.startsWith("image/")) {
                    return "Only image files are allowed";
                  }

                  if (file.size > 5 * 1024 * 1024) {
                    return "Image must be less than 5MB";
                  }

                  return true;
                },
              })}
              className="block w-full text-sm text-gray-600
                file:mr-3 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-medium
                file:bg-primary-50 file:text-primary-600
                hover:file:bg-primary-100 transition"
            />
            {errors.coverPage?.message && (
              <p className="error">{String(errors.coverPage.message)}</p>
            )}
          </div>

          {/* Description */}
          <div className="flex flex-col sm:col-span-2">
            <label className="label">Description</label>
            <textarea
              rows={4}
              {...register("description")}
              className="input resize-none"
            />
            {errors.description && (
              <p className="error">{errors.description.message}</p>
            )}
          </div>

          {/* Submit */}
          <div className="sm:col-span-2 mt-2">
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-primary-600 text-white py-3 rounded-xl font-semibold
                hover:bg-primary-700 transition
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Creating..." : "Create Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CreateBook;

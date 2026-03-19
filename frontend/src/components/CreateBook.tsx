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
  const { mutate, isPending, error } = useMutation({
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
    <div className="flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8">
        <form
          onSubmit={handleSubmit(handleCreateBook)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Title
            </label>
            <input
              placeholder="Enter Title"
              type="text"
              {...register("title")}
              className="input"
            />
            {errors.title && <p className="error">{errors.title.message}</p>}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Author
            </label>
            <input
              placeholder="Author"
              type="text"
              {...register("author")}
              className="input"
            />
            {errors.author && <p className="error">{errors.author.message}</p>}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              ISBN
            </label>
            <input
              placeholder="Enter ISBN"
              type="text"
              {...register("isbn")}
              className="input"
            />
            {errors.isbn && <p className="error">{errors.isbn.message}</p>}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Category
            </label>
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

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Total Copies
            </label>
            <input
              placeholder="Enter Total Copies"
              type="number"
              {...register("totalCopies", { valueAsNumber: true })}
              className="input"
            />
            {errors.totalCopies && (
              <p className="error">{errors.totalCopies.message}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Copies Available
            </label>
            <input
              placeholder="Copies Available"
              type="number"
              {...register("copiesAvailable", { valueAsNumber: true })}
              className="input"
            />
            {errors.copiesAvailable && (
              <p className="error">{errors.copiesAvailable.message}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Published Year
            </label>
            <input
              placeholder="Published Year"
              type="number"
              {...register("publishedYear", { valueAsNumber: true })}
              className="input"
            />
            {errors.publishedYear && (
              <p className="error">{errors.publishedYear.message}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Cover Image
            </label>
            <input
              type="file"
              accept="image/"
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
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-primary-600
              hover:file:bg-blue-100"
            />
            {errors.coverPage?.message && (
              <p className="error">{String(errors.coverPage.message)}</p>
            )}
          </div>

          <div className="flex flex-col md:col-span-2">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Description
            </label>
            <textarea
              rows={3}
              {...register("description")}
              className="input resize-none"
            />
            {errors.description && (
              <p className="error">{errors.description.message}</p>
            )}
          </div>

          <div className="md:col-span-2 mt-4">
            <button
              type="submit"
              disabled={isPending}
              className="cursor-pointer w-full bg-primary-600 text-white py-3 rounded-xl font-semibold
              hover:bg-primary-700 transition duration-200
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

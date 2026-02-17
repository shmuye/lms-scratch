import { createBook } from "../services/book.api";
import z from "zod";
import { useForm } from "react-hook-form";
import { createBookSchema } from "../../../shared/validations/book.schema.js";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { categoryEnum } from "../../../shared/constants/bookCategory.js";
import { useQueryClient } from "@tanstack/react-query";

export type Book = z.infer<typeof createBookSchema>;

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
      reset();
    },
  });
  const onSubmit = (data: Book) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as any);
    });

    mutate(formData);
  };

  if (error) {
    return <div>{`Error creating book, ${error}`}</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Create New Book
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Title */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Title
            </label>
            <input type="text" {...register("title")} className="input" />
            {errors.title && <p className="error">{errors.title.message}</p>}
          </div>

          {/* Author */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Author
            </label>
            <input type="text" {...register("author")} className="input" />
            {errors.author && <p className="error">{errors.author.message}</p>}
          </div>

          {/* ISBN */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              ISBN
            </label>
            <input type="text" {...register("isbn")} className="input" />
            {errors.isbn && <p className="error">{errors.isbn.message}</p>}
          </div>

          {/* Category */}
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

          {/* Total Copies */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Total Copies
            </label>
            <input
              type="number"
              {...register("totalCopies")}
              className="input"
            />
            {errors.totalCopies && (
              <p className="error">{errors.totalCopies.message}</p>
            )}
          </div>

          {/* Copies Available */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Copies Available
            </label>
            <input
              type="number"
              {...register("copiesAvailable")}
              className="input"
            />
            {errors.copiesAvailable && (
              <p className="error">{errors.copiesAvailable.message}</p>
            )}
          </div>

          {/* Published Year */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Published Year
            </label>
            <input
              type="number"
              {...register("publishedYear")}
              className="input"
            />
            {errors.publishedYear && (
              <p className="error">{errors.publishedYear.message}</p>
            )}
          </div>

          {/* Cover Image */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Cover Image
            </label>
            <input
              type="file"
              {...register("coverPage")}
              className="block w-full text-sm text-gray-600
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-600
              hover:file:bg-blue-100"
            />
            {errors.coverPage && (
              <p className="error">{errors.coverPage.message}</p>
            )}
          </div>

          {/* Description - Full Width */}
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

          {/* Submit Button */}
          <div className="md:col-span-2 mt-4">
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold
              hover:bg-blue-700 transition duration-200
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

import CreateBook from "../components/CreateBook";

const CreateBookPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-10">
          Create Book
        </h1>

        <CreateBook />
      </div>
    </div>
  );
};

export default CreateBookPage;

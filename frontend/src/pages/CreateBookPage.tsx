import CreateBook from "../components/CreateBook";

const CreateBookPage = () => {
  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-primary-800 text-center mb-10 ">
          Create New Book
        </h1>
        <CreateBook />
      </div>
    </div>
  );
};

export default CreateBookPage;

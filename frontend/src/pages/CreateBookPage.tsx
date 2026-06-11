import CreateBook from "../components/CreateBook";
import PageContainer from "../components/ui/PageContainer";
import PageHeader from "../components/ui/PageHeader";

const CreateBookPage = () => {
  return (
    <PageContainer>
      <PageHeader
        title="Create New Book"
        subtitle="Add a new title to the library collection"
      />
      <CreateBook />
    </PageContainer>
  );
};

export default CreateBookPage;

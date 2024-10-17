import { FaHome } from "react-icons/fa";
import Link from "next/link";
import { redirect } from "next/navigation";

function SearchInput() {
  async function searchAction(formData: FormData) {
    "use server";

    const searchTerm = formData.get("searchTerm") as string;

    redirect(`/search/${searchTerm}`);
  }

  return (
    <form
      action={searchAction}
      className="w-10/12 flex items-center px-5 border-gray-500 bg-[#0A0A0A] border shadow-lg rounded-lg"
    >
      <Link href="/">
        <FaHome className="h-10 w-10 text-gray-300" />
      </Link>
      <input
        type="text"
        className="flex-1 p-5 outline-none bg-[#0A0A0A] text-zinc-50"
        name="searchTerm"
        placeholder="What type of movies do you like? e.g. Sci-Fi films in space..."
      />
    </form>
  );
}

export default SearchInput;

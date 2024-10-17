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
    <div className="flex items-center justify-center gap-10 w-full mx-6">
      <Link href="/">
        <FaHome className="h-10 w-10 text-yellow-300" />
      </Link>
      <form
        action={searchAction}
        className="w-full flex items-center px-5 border-gray-500 bg-[#0A0A0A] border shadow-lg rounded-lg"
      >
        <input
          type="text"
          className="flex-1 p-5 outline-none bg-[#0A0A0A] text-zinc-50"
          name="searchTerm"
          placeholder="Ex: space movies"
        />
      </form>
    </div>
  );
}

export default SearchInput;

import { SiThemoviedatabase } from "react-icons/si";
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
        <SiThemoviedatabase className="w-10 h-10 md:w-24 md:h-24 text-zinc-50" />
      </Link>
      <form
        action={searchAction}
        className="w-full flex items-center px-5 border-gray-500 bg-[#050505] border shadow-lg rounded-lg"
      >
        <input
          type="text"
          className="flex-1 p-5 outline-none bg-[#050505] text-zinc-50"
          name="searchTerm"
          placeholder="Ex: space movies"
        />
      </form>
    </div>
  );
}

export default SearchInput;

import SearchInput from "./SearchInput";

function Header() {
  return (
    <header className="p-10 pb-0 flex flex-col sticky items-center top-0 z-50">
      <SearchInput />
    </header>
  );
}

export default Header;

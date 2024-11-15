import { useEffect } from "react";

export default function Search() {
  useEffect(() => {
    const searchInput = document.getElementById("search");
    if (
      searchInput &&
      typeof document !== "undefined" &&
      document.querySelectorAll("[data-search-field]")
    ) {
      const handleInput = () => {
        let searchValue = searchInput.value.toLowerCase();
        let searchChars = searchValue.split(" ").filter((char) => char !== "");
        let isAnyVisible = false;

        let searchFields = document.querySelectorAll("[data-search-field]");

        searchFields.forEach(function (field) {
          let textContent = field.textContent.toLowerCase();
          let wrapper = field.closest("[data-search-field-wrapper]");
          let matches = searchChars.some((char) => textContent.includes(char));

          if (!matches && searchValue !== "") {
            wrapper.style.display = "none";
          } else {
            wrapper.style.display = "flex";
            isAnyVisible = true;
          }
        });

        let boxFilesContainer = document.getElementById("box-files-container");
        if (!isAnyVisible && searchValue !== "") {
          boxFilesContainer.classList.add("is-empty");
        } else {
          boxFilesContainer.classList.remove("is-empty");
        }
      };

      searchInput.addEventListener("input", handleInput);

      return () => {
        searchInput.removeEventListener("input", handleInput);
      };
    }
  }, []);

  return (
    <div className="search_component">
      <input
        type="text"
        placeholder="Search"
        id="search"
        className="search_field"
      />
      <div type="submit" className="search_button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="search_icon feather feather-search"
          width="100%"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>
    </div>
  );
}

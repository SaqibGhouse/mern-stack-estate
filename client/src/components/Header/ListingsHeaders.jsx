import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ListingsHeaders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    parking: false,
    furnished: false,
    rent: false,
    sale: false,
    sort: "latest",
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("search", searchTerm);
    const search = urlParams.toString();
    navigate(`/listings?${search}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-lg shadow-lg flex flex-wrap gap-4 items-center sticky top-0 z-10"
    >
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-1 p-2 border border-gray-300 rounded-lg"
      />
      <select
        value={filters.sort}
        onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
        className="w-40 p-2 border border-gray-300 rounded-lg"
      >
        <option value="latest">Latest</option>
        <option value="lowest">Lowest Price</option>
        <option value="highest">Highest Price</option>
      </select>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="rent"
          checked={filters.rent}
          onChange={() => setFilters({ ...filters, rent: !filters.rent })}
        />
        <label for="rent">Rent</label>
        <input
          type="checkbox"
          checked={filters.sale}
          onChange={() => setFilters({ ...filters, sale: !filters.sale })}
        />
        Sale
        <input
          type="checkbox"
          checked={filters.parking}
          onChange={() => setFilters({ ...filters, parking: !filters.parking })}
        />
        Parking
        <input
          type="checkbox"
          checked={filters.furnished}
          onChange={() =>
            setFilters({ ...filters, furnished: !filters.furnished })
          }
        />
        Furnished
      </div>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
        <FaSearch />
      </button>
    </form>
  );
};

export default ListingsHeaders;

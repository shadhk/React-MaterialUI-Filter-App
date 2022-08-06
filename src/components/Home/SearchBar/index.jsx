import React from "react"
import SearchIcon from "@material-ui/icons/Search"
import "./SearchStyles.css"

const SearchBar = ({ value, changeInput }) => {
  return (
    <div className="searchbar-wrap">
      <SearchIcon className="searchbar-icon" />
      <input type="text" placeholder="Woodland Hills" value={value} onChange={changeInput} />
    </div>
  )
}

export default SearchBar

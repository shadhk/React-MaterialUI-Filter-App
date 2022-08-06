import React from "react"
import { categoryList, ratingList } from "../../../constants"
import CheckBoxCuisins from "../../common/Checkbox"
import FilterListToggle from "../../common/FilterListToggle"
import SliderRange from "../../common/SliderRange"
import "./styles.css"

const FilterPanel = props => {
  const { selectedCategory, selectCategory, selectedRating, selectRating, cuisines, changeChecked, changedPrice, selectedPrice } = props
  return (
    <div>
      {/* Category */}
      <div className="input-group">
        <p className="label">Category</p>
        <FilterListToggle options={categoryList} value={selectedCategory} selectToggle={selectCategory} />
      </div>
      {/* Cuisins */}
      <div className="input-group">
        <p className="label">Cuisins</p>
        {cuisines.map(cuisine => (
          <CheckBoxCuisins key={cuisine.id} cuisine={cuisine} changeChecked={changeChecked} />
        ))}
      </div>
      {/* Price Range */}
      <div className="input-group">
        <p className="label-range">Price Range</p>
        <SliderRange value={selectedPrice} changedPrice={changedPrice} />
      </div>
      {/* Star rating */}
      <div className="input-group">
        <p className="label">Star Rating</p>
        <FilterListToggle options={ratingList} value={selectedRating} selectToggle={selectRating} />
      </div>
    </div>
  )
}

export default FilterPanel

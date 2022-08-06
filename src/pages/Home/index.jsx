import React, { useState, useEffect } from "react"
import "./homeStyles.css"
import SearchBar from "../../components/Home/SearchBar"
import FilterPanel from "../../components/Home/FilterPanel"
import List from "../../components/Home/List"
import { dataList } from "../../constants"
import EmptyView from "../../components/common/EmptyView"

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedRating, setSelectedRating] = useState(null)
  const [selectedPrice, setSelectedPrice] = useState([1000, 5000])
  const [list, setList] = useState(dataList)
  const [inputSearch, setInputSearch] = useState("")
  const [isResultFound, setIsResultFound] = useState(true)
  const [cuisines, setCuisines] = useState([
    { id: 1, checked: false, label: "American" },
    { id: 2, checked: false, label: "Chinese" },
    { id: 3, checked: false, label: "Italian" }
  ])

  const handleSelectCategory = (e, value) => {
    e.preventDefault()
    if (!value) {
      return null
    }
    setSelectedCategory(value)
  }

  const handleSelectRating = (e, value) => {
    e.preventDefault()
    if (!value) {
      return null
    }
    setSelectedRating(value)
  }

  const handleChangeChecked = id => {
    const cusinesStateList = cuisines
    const changeCheckedCuisines = cusinesStateList.map(item => (item.id === id ? { ...item, checked: !item.checked } : item))
    setCuisines(changeCheckedCuisines)
  }

  const handleChangedPrice = (e, value) => {
    e.preventDefault()
    setSelectedPrice(value)
  }

  const applyFilters = () => {
    let updatedList = dataList

    //Rating Filter
    if (selectedRating) {
      updatedList = updatedList.filter(item => parseInt(item.rating) === parseInt(selectedRating))
    }
    //Category Filter
    if (selectedCategory) {
      updatedList = updatedList.filter(item => item.category === selectedCategory)
    }

    //Cuisines Filter
    const cuisinesChecked = cuisines.filter(item => item.checked).map(item => item.label.toLowerCase())

    if (cuisinesChecked.length) {
      updatedList = updatedList.filter(item => cuisinesChecked.includes(item.cuisine))
    }

    //Price Filter
    const minPrice = selectedPrice[0]
    const maxPrice = selectedPrice[1]

    updatedList = updatedList.filter(item => item.price >= minPrice && item.price <= maxPrice)

    //Search Filter
    if (inputSearch) {
      updatedList = updatedList.filter(item => item.title.toLowerCase().search(inputSearch.toLowerCase().trim()) !== -1)
    }

    setList(updatedList)

    !updatedList.length ? setIsResultFound(false) : setIsResultFound(true)
  }

  useEffect(() => {
    applyFilters()
  }, [selectedRating, selectedCategory, cuisines, selectedPrice, inputSearch])

  return (
    <div className="home">
      <SearchBar value={inputSearch} changeInput={e => setInputSearch(e.target.value)} />
      <div className="home_panelList-wrap">
        <div className="home_panel-wrap">
          <FilterPanel selectCategory={handleSelectCategory} selectedCategory={selectedCategory} selectedRating={selectedRating} selectRating={handleSelectRating} cuisines={cuisines} changeChecked={handleChangeChecked} selectedPrice={selectedPrice} changedPrice={handleChangedPrice} />
        </div>
        <div className="home_list-wrap">{isResultFound ? <List list={list} /> : <EmptyView />}</div>
      </div>
    </div>
  )
}

export default Home

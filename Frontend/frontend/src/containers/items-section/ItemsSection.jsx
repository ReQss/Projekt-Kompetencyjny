import React from 'react'
import './itemsSection.css'
import Filter from '../../components/filter/Filter'
import SearchBar from '../../components/search-bar/SearchBar'
import ItemsWrapper from '../../components/items-wrapper/ItemsWrapper'

const ItemsSection = () => {
  return (
    <div className='items-section'>
      {/* <Filter/> */}
      <div className='items-section__right'>
        <SearchBar/>
        <ItemsWrapper/>
      </div>
    </div>
  )
}

export default ItemsSection

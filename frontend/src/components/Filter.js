import React from 'react';

const Filter = (props) => {
    const filterName = props.filterName
    const setNewFilterName = props.setNewFilterName
    return (
      <div>
        filter shown with<input value={filterName} onChange={
            (event) => setNewFilterName(event.target.value)
        }/>
      </div>
    )
}

export default Filter
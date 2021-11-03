import React, { useState} from 'react'
import styles from '../Header.module.css'

const Search = ({history}) => {
    const [ keyword, setKeyword ] = useState('')
    
    function submitHandler(e) {
        e.preventDefault();
        if (keyword.trim()) {
            history.push(`/search/${keyword}`)
        } else {
            history.push('/')
        }
    }

    return (
        <form onSubmit={submitHandler} className={styles.searchBox}>
            <img src="/images/search-icon.png" alt="search" />
            <input
                type="text"
                onChange={(e) => setKeyword(e.target.value)}
                className={styles.searchInput}
                placeholder="Enter Product Name ..."
            />
        </form> 
    )
}

export default Search

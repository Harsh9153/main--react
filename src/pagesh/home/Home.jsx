import { useEffect, useState } from 'react'
import Axios from 'axios';
import Category from '../category/Category';
import Products from '../products/Products';
import "./Home.css"
import { Link } from 'react-router-dom';




function Home() {

  let [category, setCategory] = useState([]);
  let [product, setProducts] = useState([]);
  let [ser, setSer] = useState("");
  let [currentPage, setCurrentPage] = useState(1)
  let [perPage, setPerPage] = useState(6)
  let [ArrayPages, setArrayPages] = useState([])

  useEffect(() => {
    setTimeout(() => {
      fetchData();
      productData();
    }, 1000)
  }, [setCategory, setProducts, currentPage]);


  let Pagination = (getPro) => {
    // console.log(getPro)
    let lastIndex = currentPage * perPage;
    let firstIndex = lastIndex - perPage;
    let allPro = getPro.slice(firstIndex, lastIndex);

    let totalPages = Math.ceil(getPro.length / perPage)
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    setArrayPages(pages ? pages : [])


    setProducts(allPro)


  }


  let fetchData = () => {
    Axios.get("https://fakestoreapi.com/products/categories")
      .then((res) => {
        // console.log(res.data);
        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  let productData = () => {
    Axios.get("https://fakestoreapi.com/products/")
      .then((res) => {
        // console.log(res.data);
        setProducts(res.data);

        Pagination(res.data);

      })
      .catch((err) => {
        console.log(err);
      })
  }

  let categoryWise = (cat) => {
    console.log(cat);
    if (cat == 'All') {
      productData();
    }
    else {
      Axios.get("https://fakestoreapi.com/products/category/" + cat)
        .then((res) => {
          console.log(res.data);
          setProducts(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  let submitD = (e) => {
    e.preventDefault();
    setSer(e.target.search.value);
  }

  let sortNum = (e) => {
    let sortpr = e.target.value;
    let newpro = [...product];

    if (sortpr == 'ascending') {
      newpro.sort((a, b) => a.price - b.price);
    }
    else if (sortpr == 'descending') {
      newpro.sort((a, b) => b.price - a.price);
    }
    setProducts(newpro);
  }

  return (
    <>
    
<div className="container" style={{height:"90px",justifyContent:"center"}}>
     
<form className="d-flex position-absolute start-75   "  onSubmit={(e) => submitD(e)} role="search">
        <input className="form-control me-2" type="search" name='search' placeholder="Search" aria-label="Search"style={{width:"320px",height:"40px"}}/>
        <button className="btn btn-primary ms-2 rounded-pill" value="search" type="submit">Search</button>
      </form>
      </div>
      <Category cat={category} catproduct={categoryWise} pr={sortNum} />
     

      <Products pro={product} sea={ser} />
      <div className='page'>
        <div className='page-main' >
          {ArrayPages.map((v, i) => {
            return (
              <button onClick={() => setCurrentPage(v)}>{v}</button>
            )
          })}
        </div>

      </div>
    </>
  )
}

export default Home

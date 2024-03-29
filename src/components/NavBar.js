import './NavBar.css'
import CartWidget from './CartWidget'
import { Link, NavLink } from 'react-router-dom'
import { firestoredb } from '../services/firebase/firebase'
import { useContext, useEffect, useState } from 'react'
import { CartContext } from '../context/CartContext'
import { collection } from 'firebase/firestore'
import { getDocs } from 'firebase/firestore'



const NavBar = () => {
     const   [categories, setCategories] = useState([])

    const { cart } = useContext(CartContext)

    useEffect(() => {
        getDocs(collection(firestoredb, 'categories')).then(response => {
            const categories = response.docs.map(cat =>{
                return {id: cat.id, ...cat.data()}
            })
            setCategories(categories)
        })
    }, []) 

return (
        <nav className="NavBar" >
        <Link to={'/'}>
            <h3>Ecommerce</h3>
        </Link>
        <div className="Categories">
            {categories.map(cat => <NavLink key={cat.id} to={`/category/${cat.id}`} className={({ isActive }) =>
                isActive ? 'ActiveOption' : 'Option'
            }>{cat.description}</NavLink>)}
        </div>
        {cart.length > 0 && <CartWidget />}
        </nav>
    )
}

export default NavBar
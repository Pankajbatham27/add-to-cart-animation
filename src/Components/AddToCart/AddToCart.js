import style from './AddToCart.module.css';
import React, { useEffect, useRef, useState } from 'react';
import NavBar from './NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';


const AddToCart = () => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [movePosition, setMovePosition] = useState([]);
    const [products, setProducts] = useState();
    const [cartCount, setCartCount] = useState(0);
    const [loader, setLoader] = useState({});

    const divRef = useRef([]);

    // const handleAddToCart = () => {
    //     setIsAnimating(true);
    //     setTimeout(() => {
    //         setIsAnimating(false);
    //     }, 1000);

    //     const rect = divRef.current.getBoundingClientRect();

    //     setMovePosition(`translate(calc(96vw - ${rect.x}px), calc(-${rect.y}px))`)

    // };


    useEffect(() => {

        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(json => setProducts(json))
    }, [])


    const addingToCart = (itemId) => {

        setIsAnimating(true);

        setLoader((prevState) => ({
            ...prevState,
            [itemId]: true,
        }));

        const element = divRef.current[itemId];

        if (element) {
            const rect = element.getBoundingClientRect();
            updateMovePosition(itemId, rect);

        }

        const timer = setTimeout(() => {
            setLoader((prevState) => ({
                ...prevState,
                [itemId]: false,
            }));

            const movePosition = `none`;

            setMovePosition((prevState) => ({
                ...prevState,
                [itemId]: movePosition,
            }));

            setIsAnimating(false);
            setCartCount(cartCount + 1)

        }, 2000);

        return () => clearTimeout(timer);

    }


    const updateMovePosition = (productId, rect) => {
        const movePosition = `translate(calc(85vw - ${rect.x}px + 5px), calc(-${rect.y}px + 16px))`;

        setMovePosition((prevState) => ({
            ...prevState,
            [productId]: movePosition,
        }));
    };

    return (
        <div className={style.container}>

            <NavBar cartCount={cartCount} isAnimating={isAnimating} />

            <div className='container mt-5'>
                <div className='row'>


                    {products && products.map((product, key) => (
                        <div className='col-md-3 mb-4' key={key}>
                            <div className={`${style.productItem} border p-3`}>
                                <img src={product.image} height={200} width={200} />
                                <h6 className='p-3'>{product.title}</h6>

                                <button className='btn btn-dark' onClick={() => addingToCart(product.id)} >

                                    <div style={{ transform: movePosition[product.id] || 'none' }} ref={(el) => (divRef.current[product.id] = el)}
                                        className={`${isAnimating ? style.animate : ''}`}>
                                        {loader[product.id] ? <FontAwesomeIcon className='text-info' icon={faCircle} /> : 'Add To Cart'}
                                    </div>

                                </button>
                            </div>
                        </div>
                    ))}

                </div>
            </div>


        </div>
    );
};

export default AddToCart;

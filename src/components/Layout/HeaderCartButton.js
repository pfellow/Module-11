import { useContext, useEffect, useState } from "react";

import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
import styles from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
   const [btnIsHighlighted, setBtnIsHighLIghted] = useState(false);
    
  const cartCtx = useContext(CartContext);

  const { items } = cartCtx;
  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);


  const btnClasses = `${styles.button} ${btnIsHighlighted ? styles.bump : ''}`;

  useEffect(() => {
    if (cartCtx.items.length === 0) {
        return;
    }
    setBtnIsHighLIghted(true);

    const timer = setTimeout(() => {
        setBtnIsHighLIghted(false);
    }, 300);

    return () => {
        clearTimeout(timer);
    }
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your cart</span>
      <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;

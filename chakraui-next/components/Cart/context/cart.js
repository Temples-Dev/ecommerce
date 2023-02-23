import { createContext, useContext, useEffect, useReducer } from "react";
import { commerce } from "../../../lib/commerce";

const CreateCartContext = createContext();

const CreateDispatchContext = createContext();

const SETCART = "SETCART";

const initialState = {
  total_items: 0,
  total_unique_items: 0,
  line_items: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case SETCART:
      return { ...state, ...action.payload };
    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setCart = async (payload) => {
    dispatch({ type: SETCART, payload });
  };

  const getCart = async () => {
    try {
      const currentCart = await commerce.cart.retrieve();

      setCart(currentCart);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <CreateDispatchContext.Provider value={{ setCart }}>
      <CreateCartContext.Provider value={state}>
        {children}
      </CreateCartContext.Provider>
    </CreateDispatchContext.Provider>
  );
};

export const useCartState = () => useContext(CreateCartContext);
export const useCartDispatch = () => useContext(CreateDispatchContext);

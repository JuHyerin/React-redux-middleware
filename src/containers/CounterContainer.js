import {useSelector, useDispatch} from "react-redux";
import Counter from "../components/Counter";
import {decreaseAsync, increaseAsync} from "../modules/counter";

function CounterContainer () {
    const dispatch = useDispatch();
    const state = useSelector(state => state.counter);

    // const onIncrease = () => dispatch({type: 'INCREASE'});
    // const onDecrease = () => dispatch({type: 'DECREASE'});

    const onIncrease = () => {
        dispatch(increaseAsync());
    };
    const onDecrease = () => {
        dispatch(decreaseAsync());
    };


    return (
        <Counter number={state} onIncrease={onIncrease} onDecrease={onDecrease}/>
    );
}

export default CounterContainer;
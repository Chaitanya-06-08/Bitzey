import { useSelector} from "react-redux";

export const getState=(name)=>{
    return useSelector(state=>state[`${name}`])
}

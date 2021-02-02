import error from '../lotties/43391-404-error-page-not-found-confused-robot.json'
import Lottie from 'react-lottie';
export default function Error(){
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: error,
        renderSetting:{
            preserveAspectRatio: "xMidYMid slice"
        }
    }
    
    return(
        <div>
            <Lottie 
            options={defaultOptions}
            height={600}
            width={600}/>
        </div>
    )
}
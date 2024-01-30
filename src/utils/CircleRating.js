import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function CircleRating({ rating, className }) {
    return (
        <div className="circle-rating-container">
            <CircularProgressbar
                value={rating}
                text={`${rating}%`}
                strokeWidth={10}
                minValue={0}
                maxValue={10}
                styles={buildStyles({
                    strokeLinecap: "butt",
                    pathColor: "green",
                    trailColor: "lightslategrey", 
                    textColor: "black",
                    textSize: "22px",
      
                })}
            />
        </div>
    )
}

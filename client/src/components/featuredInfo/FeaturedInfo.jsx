import "./featuredInfo.css"
import {ArrowDownward, ArrowUpward} from '@mui/icons-material';
export default function FeaturedInfo() {
  return (
    <div className="featured">
        <div className="featuredItem">
            <span className="featuredTitle">Revenue</span>
            <div className="featuredMoneyContainer">
                <span className="featuredMoney">$3245</span>
                <span className="featuredMoneyRate">
                -11.4 <ArrowDownward className="featuredIcon negative"/></span>
            </div>
            <span className="featuredSub">Compared to last month</span>
        </div>
        <div className="featuredItem">
            <span className="featuredTitle">Sales</span>
            <div className="featuredMoneyContainer">
                <span className="featuredMoney">$4245</span>
                <span className="featuredMoneyRate">
                -1.4 <ArrowDownward className="featuredIcon negative"/></span>
            </div>
            <span className="featuredSub">Compared to last month</span>
        </div>
        <div className="featuredItem">
            <span className="featuredTitle">Cost</span>
            <div className="featuredMoneyContainer">
                <span className="featuredMoney">$1245</span>
                <span className="featuredMoneyRate">
                +2.4 <ArrowUpward className="featuredIcon"/></span>
            </div>
            <span className="featuredSub">Compared to last month</span>
        </div>
      
    </div>
  )
}

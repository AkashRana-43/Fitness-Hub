// import Chart from "../../chart/Chart"
// import FeaturedInfo from "../../featuredInfo/FeaturedInfo"
import "./home.css"
// import { userData } from "../../../dummyData" //imports userData from dummyData.js
// import WidgetSm from "../../widgetSm/WidgetSm"
// import WidgetLg from "../../widgetLg/WidgetLg"
import UserList from "../userList/UserList"
export default function AdminHome() {
  return (
    <div className="home">
      {/* <FeaturedInfo/>
      <Chart data={userData} title="User Analytics" grid dataKey="Active User"/>
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div> */}
      <UserList/>
    </div>
  )
}

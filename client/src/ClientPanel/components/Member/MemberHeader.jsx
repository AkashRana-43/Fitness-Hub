import React from 'react'
import Img1 from '../../assets/img/bg/BG.jpg';

const MemberHeader = ({activeTab, onTabChange}) => {
  return (
    <>
            <section className="card-body p-0">
                <div className='cover-pic'>
                    <img src={Img1} alt="" className="img-fluid" />
                </div>
            </section>
            <div style={{ padding: '20px 40%' }}>
                <ul className="nav nav-pills user-profile-tab justify-content-center mt-0 rounded-2" id="pills-tab" role="tablist" style={{ borderRadius: '10px', background: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(10px)', boxShadow: "0 5px 15px 0 rgba(0, 0, 0, 0.25)" }}>
                    <li className="nav-item" role="presentation">
                        <button
                            className={`nav-link position-relative rounded-0 d-flex align-items-center justify-content-center bg-transparent fs-3 py-6 border-0 ${activeTab === "profile" ? "active" : ""}`}
                            id="pills-profile-tab"
                            onClick={() => onTabChange("profile")} 
                            type="button"
                            role="tab"
                            aria-controls="pills-profile"
                            aria-selected={activeTab === "profile"}
                            style={activeTab === "profile" ? { color: '#F5593D' } : null}
                        >
                            <i className="fa fa-users me-2 fs-6"></i>
                            <span className="d-none d-md-block ml-2">Members</span>
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button
                            className={`nav-link position-relative rounded-0 d-flex align-items-center justify-content-center bg-transparent fs-3 py-6 border-0 ${activeTab === "friends" ? "active" : ""}`}
                            id="pills-friends-tab"
                            onClick={() => onTabChange("friends")} 
                            type="button"
                            role="tab"
                            aria-controls="pills-friends"
                            aria-selected={activeTab === "friends"}
                            tabIndex="-1"
                            style={activeTab === "friends" ? { color: '#F5593D' } : null}
                        >
                            <i className="fa fa-users me-2 fs-6"></i>
                            <span className="d-none d-md-block ml-2">Request</span>
                        </button>
                    </li>
                </ul>
            </div>

        </>
  )
}

export default MemberHeader
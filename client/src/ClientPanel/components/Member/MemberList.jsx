import React from 'react';
import Img1 from '../../assets/img/bg/BG.jpg';

const users = [
    {
        name: "Akash",
        role: "trainer",
        socialLinks: [
            { platform: "Facebook", link: "https://www.facebook.com" },
            { platform: "Instagram", link: "https://www.instagram.com" },
            { platform: "Twitter", link: "https://www.twitter.com" },
            { platform: "LinkedIn", link: "https://www.linkedin.com" }
        ]
    },
    // Add more user objects here if needed
];

const MemberList = () => {
    return (
        <section className='container'>
            <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-friends" role="tabpanel" aria-labelledby="pills-friends-tab" tabIndex="0">
                    <div className="d-sm-flex align-items-center justify-content-between mt-3 mb-4">
                        <h3 className="mb-3 mb-sm-0 fw-semibold d-flex align-items-center">Members <span className="badge text-bg-secondary fs-2 rounded-4 py-1 px-2 ms-2">{users.length}</span></h3>
                        <form className="position-relative">
                            <input type="text" className="form-control search-chat py-2 ps-5" id="text-srh" placeholder="Search" />
                            <i className="ti ti-search position-absolute top-50 start-0 translate-middle-y text-dark ms-3"></i>
                        </form>
                    </div>
                    <div className="row">
                        {users.map((user, index) => (
                            <div className="col-sm-6 col-lg-3" key={index} style={{ paddingTop: '40px' }}>
                                <div className="card hover-img" style={{ height: '100%', position: 'relative' }}>
                                    <img src={Img1} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    <div className="card-content">
                                        <div className="px-2 py-1 bg-light list-unstyled d-flex align-items-center justify-content-center mb-0">
                                            <h5 className="fw-semibold mb-0">{user.name}</h5>
                                        </div>
                                        <div className="px-2 bg-light list-unstyled d-flex align-items-center justify-content-center mb-0">
                                            <span className="text-dark fs-2">{user.role}</span>
                                        </div>
                                        <div className="px-2 py-2 bg-light list-unstyled d-flex align-items-center justify-content-center">
                                            {user.socialLinks.map((link, index) => (
                                                <li key={index} style={{ marginRight: index === user.socialLinks.length - 1 ? '0px' : '20px' }}>
                                                    <a href={link.link} target="_blank" rel="noreferrer">
                                                        <i className={`fa fa-${link.platform.toLowerCase()}-square`} />
                                                    </a>
                                                </li>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MemberList;

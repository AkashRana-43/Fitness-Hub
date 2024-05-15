import React from 'react'

const ProfileDescBody = () => {
  return (
    <section className='container'>
            <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-friends" role="tabpanel" aria-labelledby="pills-friends-tab" tabIndex="0">
                    <div className="d-sm-flex align-items-center justify-content-between mt-3 mb-4">
                        <h3 className="mb-3 mb-sm-0 fw-semibold d-flex align-items-center">Profile <span className="badge text-bg-secondary fs-2 rounded-4 py-1 px-2 ms-2">20</span></h3>
                        <form className="position-relative">
                            <input type="text" className="form-control search-chat py-2 ps-5" id="text-srh" placeholder="Search Friends" />
                            <i className="ti ti-search position-absolute top-50 start-0 translate-middle-y text-dark ms-3"></i>
                        </form>
                    </div>
                </div>
            </div>
        </section>
  )
}

export default ProfileDescBody
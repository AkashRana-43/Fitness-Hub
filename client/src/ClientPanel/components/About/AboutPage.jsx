import React from 'react';
import Img1 from '../../assets/img/bg/BG.jpg';
import './css/AboutPage.css'

const teamMembers = [
    {
        name: "Akash Rana",
        role: "Full Stack Developer",
        socialLinks: [
            { platform: "Twitter", link: "#" },
            { platform: "Facebook", link: "#" },
            { platform: "LinkedIn", link: "#" }
        ]
    },
    {
        name: "Rohit Karki",
        role: "Backend Developer",
        socialLinks: [
            { platform: "Twitter", link: "#" },
            { platform: "Facebook", link: "#" },
            { platform: "LinkedIn", link: "#" }
        ]
    },
    {
        name: "Mingmar Tamang",
        role: "Full Stack Developer",
        socialLinks: [
            { platform: "Twitter", link: "#" },
            { platform: "Facebook", link: "#" },
            { platform: "LinkedIn", link: "#" }
        ]
    },
    {
        name: "Sanjeev Gurung",
        role: "Frontend Developer",
        socialLinks: [
            { platform: "Twitter", link: "#" },
            { platform: "Facebook", link: "#" },
            { platform: "LinkedIn", link: "#" }
        ]
    }
];

const AboutPage = () => {
    return (
        <section className="page-section bg-light" id="team">
            <div className="container">
                <div className="text-center">
                    <h2 className="section-heading text-uppercase">Our Amazing Team</h2>
                    <h3 className="section-subheading text-muted">We are very happy to develop this platform</h3>
                </div>
                <div className="row">
                    {teamMembers.map((member, index) => (
                        <div className="col-lg-3" key={index}>
                            <div className="team-member">
                                <img className="mx-auto rounded-circle" src={Img1} alt="..." />
                                <h4>{member.name}</h4>
                                <p className="text-muted">{member.role}</p>
                                <div className="px-2 py-2 bg-light list-unstyled d-flex align-items-center justify-content-center">
                                    {member.socialLinks.map((link, index) => ( // Fix here
                                        <li key={index} style={{ marginRight: index === member.socialLinks.length - 1 ? '0px' : '20px' }}>
                                            <a href={link.link} target="_blank" rel="noreferrer">
                                                {link.platform === 'Instagram' ? (
                                                    <i className="fa fa-instagram" />
                                                ) : (
                                                    <i className={`fa fa-${link.platform.toLowerCase()}-square`} />
                                                )}
                                            </a>
                                        </li>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="row">
                    <div className="col-lg-8 mx-auto text-center">
                        <p className="large text-muted">Our goal is to connect the fitness lover around the globe!!!!</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutPage;

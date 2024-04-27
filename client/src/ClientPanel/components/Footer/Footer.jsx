import React from 'react'
import { Row, Container } from "reactstrap";

const Footer = () => {
  return (
    <footer className="footer footer-black footer-white " style={{position: 'relative'}}>
      <Container>
        <Row>
          <nav className="footer-nav">
            <ul>
              <li>
                <a
                  href="https://federation.edu.au/international/education-partnerships/australian-partners/partner-information/iibit-adelaide"
                  target="_blank"
                  rel="noreferrer"
                >
                  IIBIT-Federation (Adeliade)
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fa fa-facebook-square" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fa fa-instagram" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.twitter.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fa fa-twitter" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fa fa-linkedin-square" />
                </a>
              </li>
            </ul>
          </nav>
          <div className="credits ml-auto">
            <span className="copyright">
              © {new Date().getFullYear()}, Project final year {" "}
              <i className="fa fa-heart heart" /> by Group
            </span>
          </div>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
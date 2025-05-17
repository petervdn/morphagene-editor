import { type ReactElement } from "react";
import "./Footer.css";
import { BsGithub, BsQuestionCircle, BsInfoCircle } from "react-icons/bs";

export function Footer(): ReactElement {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <a href="https://github.com/petervdn/morphagene-editor" target="_blank" rel="noopener noreferrer">
            <BsGithub /> GitHub
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); }}>
            <BsQuestionCircle /> Help
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); }}>
            <BsInfoCircle /> About
          </a>
        </div>
        <div className="footer-copyright">
          © {new Date().getFullYear()} Morphagene Editor
        </div>
        <div className="footer-version">
          Version 0.1.0
        </div>
      </div>
    </footer>
  );
}

import LogoGithub from "../img/github_logo.png";

function Footer() {
  return (
    <footer className="footer">
      <div>Copyright © {new Date().getFullYear()}</div>
      <a href="https://github.com/alexbgh1" target="_blank">
        <img src={LogoGithub} width="25px" height="25px" alt="logo github" />
      </a>
    </footer>
  );
}

export default Footer;

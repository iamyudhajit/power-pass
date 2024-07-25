import React from 'react'

const Footer = () => {
  return (
    <footer className="container text-white flex justify-between pt-20 w-full px-10">
      <div>Created With ❤️ by Yudhajit</div>
      <div>
        Check Out the Source Code On{" "}
        <a
          className="underline"
          target="_blank"
          href="https://github.com/iamyudhajit"
        >
          Github
        </a>
        .
      </div>
    </footer>
  );
}

export default Footer;
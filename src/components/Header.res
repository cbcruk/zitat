@module external styles: {..} = "./Header.module.css"

@react.component
let make = () => {
  let router = Next.Router.useRouter()

  <header className={styles["Header"]}>
    <NavLink href="/" isActive={router.asPath === "/"}>
      <svg
        width="25" height="25" viewBox="0 0 262 226" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M100.602 0C44.1492 36.1022 0 94.5878 0 158.128C0 177.623 3.61878 196.396 11.5801 213.003C22.4365 222.39 34.0166 226 47.768 226C71.6519 226 86.8508 212.281 86.8508 185.566C86.8508 168.236 81.0608 153.073 58.6243 133.578L36.1878 114.805C51.3867 70.7604 71.6519 48.377 112.182 16.607L100.602 0ZM186.006 114.805C200.481 70.7604 221.47 48.377 262 16.607L249.696 0C193.243 36.1022 149.094 94.5878 149.094 158.128C149.094 177.623 153.436 196.396 160.674 213.003C172.254 222.39 183.834 226 196.862 226C220.746 226 236.669 212.281 236.669 185.566C236.669 168.236 230.155 153.073 208.442 133.578L186.006 114.805Z"
          fill="#517DB9"
        />
      </svg>
    </NavLink>
    <div className={styles["Header-right"]}>
      <NavLink href="/list" title="기록"> <IconList /> </NavLink>
      <NavLink href="/search" title="검색" isActive={router.asPath === "/search"}>
        <IconSearch />
      </NavLink>
    </div>
  </header>
}

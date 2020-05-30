import Link from "next/link";
import { Visibility, Menu, Container } from "semantic-ui-react";
import { useState } from "react";
import styles from "./Navbar.module.css";
const Navbar = () => {
  const [isNavFixed, setIsNavFixed] = useState(false);
  return (
      <Visibility
        onBottomPassed={() => setIsNavFixed(true)}
        onBottomVisible={() => setIsNavFixed(false)}
        once={false}
        offset={[0,0]}
      >
        <Menu
          borderless
          fixed={isNavFixed ? "top" : undefined}
          className={isNavFixed ? styles.menufixed : styles.menu}
        >
          <Container>
            <Menu.Item>
              <Link href="/" passHref>
                <a>Home</a>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link href="/new" passHref>
                <a>Create new</a>
              </Link>
            </Menu.Item>
          </Container>
        </Menu>
      </Visibility>
  );
};

export default Navbar;

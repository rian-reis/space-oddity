import { Menu, MenuItem, MenuContent, MenuFooter } from "./Menu";
import { Link } from "react-router-dom";

export default function Drawer({ count }) {
  return (
    <Menu>
      <MenuContent>
        <MenuItem>
          <h2>Ground Control</h2>
        </MenuItem>
        <MenuItem>
          <Link to="/launches">Lançamentos</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/rockets">Foguetes</Link>
        </MenuItem>
      </MenuContent>
      <MenuFooter>
        <MenuItem>
          <Link to="/launches/local">{`Novos Lançamentos - ${count}`}</Link>
        </MenuItem>
      </MenuFooter>
    </Menu>
  );
}

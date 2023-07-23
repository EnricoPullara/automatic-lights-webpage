import HouseIcon from '@mui/icons-material/House';
import {
  AppBar,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});
const Navbar = () => {
  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Typography variant="h6">
          Casa
        </Typography>
        <HouseIcon />
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;
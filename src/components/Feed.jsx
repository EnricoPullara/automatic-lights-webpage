import { Box, Grid } from "@mui/material";
import DomCard from "./DomCard";
import { CATEGORIES } from "../config";

const Feed = () => {

  return (

    <Box flex={4} p={2} textAlign="center">
      <Grid container columns={{ xs:1, md: 3}}>
        {CATEGORIES.map((category, index) => (
          <Grid xs={1} key={index}>
            <DomCard component={category} type="CATEGORY"/>
          </Grid>
        ))}
      </Grid>

    </Box>
  );
};

export default Feed;
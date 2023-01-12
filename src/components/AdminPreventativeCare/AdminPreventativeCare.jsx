import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// import MUI components
import Button from "@mui/material/Button";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

function AdminPreventativeCare() {
  const dispatch = useDispatch();
  const history = useHistory();

  // reducers
  const ageRanges = useSelector((store) => store.ageRanges);
  const selectedAgeRange = useSelector((store) => store.selectedAgeRange);
  const healthCategories = useSelector((store) => store.healthCategories);
  const selectedHealthCategory = useSelector(
    (store) => store.selectedHealthCategory
  );

  useEffect(() => {
    // fetch age ranges
    dispatch({ type: "FETCH_AGE_RANGES" });

    // fetch categories
    dispatch({ type: "FETCH_HEALTH_CATEGORIES" });
  }, []);

  // functions
  // when category is selected, store selection in reducer
  const handleCategoryClick = (category) => {
    dispatch({ type: "SET_SELECTED_CATEGORY", payload: category });
  };

  // when age range is selected, store age selection in reducer
  const handleAgeSelection = (event) => {
    const newAgeRange = JSON.parse(event.target.value);
    dispatch({ type: "SET_SELECTED_AGE_RANGE", payload: newAgeRange });
  };

  // when a category is clicked, it will go to a detail view of the id of the button clicked
  const handleSectionClick = (section) => {
    if (section.name === "Resources") {
      history.push(
        `/adminprevcare/specificresources/${selectedHealthCategory.id}`
      );
    } else {
      history.push(
        `/adminprevcare/${selectedHealthCategory.id}/ages/${selectedAgeRange.id}/${section.name}`
      );
    }
  };

  // category section names are used in url for category detail view
  const categorySections = [
    { name: "Guidelines" },
    { name: "Diagnostic Tools" },
    { name: "FAQ" },
    { name: "Questions for Your Doctor" },
    { name: "Resources" },
  ];

  // MUI Breadcrumbs
  const breadcrumbs = [
    <Link className="breadcrumbs" underline="hover" key="1" color="black" href="/">
      Admin
    </Link>,
    <Link className="breadcrumbs" underline="hover" key="2" color="black" href="/#/adminprevcare">
      Preventative Care
    </Link>,
    <Typography color={'black'}>{selectedHealthCategory.category}</Typography>,
  ];

  return (
    <>
    {/* MUI Breadcrumbs */}
      <Stack spacing={2} mb={10} marginLeft={2}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          sx={{ color: "black", marginLeft: "10px" }}
          className="breadcrumbs"
        >
          {breadcrumbs}
        </Breadcrumbs>
      </Stack>
      <Container maxWidth="md">
        <Grid container spacing={2} direction="column">
          <Grid item marginLeft={2}>
            <Typography variant="h6">
              <label htmlFor="ageRange">Choose Your Age Range </label>
            </Typography>
          </Grid>
          <Grid item>
            <select
              name="ageRange"
              id="ageRangeSelect"
              onChange={(event) => handleAgeSelection(event)}
              style={{ marginBottom: "30px" }}
            >
              {ageRanges.map((ageRange) => (
                <option key={ageRange.id} value={JSON.stringify(ageRange)}>
                  {ageRange.low} - {ageRange.high}
                </option>
              ))}
            </select>
          </Grid>
          <Grid container direction="row">
            <Grid item xs={6}>
              <section>
                <ul>
                  {selectedAgeRange.id &&
                    healthCategories.map((category) => (
                      <li key={category.id}>
                        <Button
                          onClick={() => handleCategoryClick(category)}
                          variant="contained"
                          style={{
                            backgroundColor: "#8EBBA7",
                            marginBottom: "10px",
                          }}
                          size="large"
                        >
                          {category.category}
                        </Button>
                      </li>
                    ))}
                </ul>
              </section>
            </Grid>
            <Grid item xs={6}>
              {selectedAgeRange.id && selectedHealthCategory.id ? (
                <section>
                  <ul>
                    {categorySections.map((section) => (
                      <li key={section.name}>
                        <Button
                          onClick={() => handleSectionClick(section)}
                          variant="contained"
                          size="large"
                          style={{
                            backgroundColor: "#89C489",
                            marginBottom: "10px",
                          }}
                        >
                          {section.name}
                        </Button>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}
              </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default AdminPreventativeCare;

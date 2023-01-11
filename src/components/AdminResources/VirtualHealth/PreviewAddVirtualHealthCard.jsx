import * as React from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { CardHeader } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

// controls the animation of the expand button Cost/Coverage
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <Button {...other}>Cost/Coverage</Button>;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(0deg)",
  marginLeft: "auto",
//   transition: theme.transitions.create("transform", {
//     duration: theme.transitions.duration.shortest,
//   }),
}));

//preview add virtual health link card, this is the card that shows the user what the link will look like before they add it
const PreviewAddVirtualHealthCard = React.forwardRef((props,ref) => {

  //info about the virtual health link to display on this preivew card
  const { addVirtualHealthLink } =props;

  //state for the expand button Cost/Coverage
  const [expanded, setExpanded] = React.useState(false);

  //handles state of the expand button Cost/Coverage
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ minWidth: 345, marginBottom: 2, maxWidth:345 }} ref={ref} {...props}>
      {/* icon, title and subtitle */}
      <CardHeader
        avatar={
          <Avatar
            alt=""
            src={addVirtualHealthLink.logo_url}
            sx={addVirtualHealthLink.logo_url ? {bgcolor: "white"}:{ bgcolor: "#8EBBA7" }}
          />
        }
        title={addVirtualHealthLink.title && <Typography variant="body" >{addVirtualHealthLink.title}</Typography>}
        subheader={addVirtualHealthLink.specialty}
        sx={{textAlign:'left'}}
      />
      {/* description */}
      {addVirtualHealthLink.description && (
        <CardContent>
          <Typography variant="body2" sx={{textAlign:'left',wordBreak: "break-word"}} >{addVirtualHealthLink.description}</Typography>
        </CardContent>
      )}
      <CardActions disableSpacing sx={{justifyContent:'space-between'}} >
       {/* cost/coverage button */}
        {addVirtualHealthLink.info_cost && (
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            sx={{ ml: 0 }}
          >
            <ExpandMoreIcon />
          </ExpandMore>
        )}
        {/* lean more button, takes user to the link */}
         <Link mr={1} ml={0} pl={1} variant="button" underline="none" href={addVirtualHealthLink.url}>
          learn more
        </Link>
      </CardActions>
      {/* when cost/coverage is clicked expand and show info_cost */}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2" sx={{ mb: 1.5,textAlign:'left' }} >
            {addVirtualHealthLink.info_cost}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
})
export default PreviewAddVirtualHealthCard;

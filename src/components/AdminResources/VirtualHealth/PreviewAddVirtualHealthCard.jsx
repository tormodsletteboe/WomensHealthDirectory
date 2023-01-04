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

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <Button {...other}>Cost/Coverage</Button>;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
//   transition: theme.transitions.create("transform", {
//     duration: theme.transitions.duration.shortest,
//   }),
}));

const PreviewAddVirtualHealthCard = React.forwardRef((props,ref) => {
  const { addVirtualHealthLink } =props;
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ minWidth: 345, marginBottom: 2, maxWidth:345 }} ref={ref} {...props}>
      <CardHeader
        avatar={
          <Avatar
            alt=""
            src={addVirtualHealthLink.logo_url}
            sx={{ bgcolor: "#8EBBA7" }}
          />
        }
        title={addVirtualHealthLink.title && <Typography variant="body" >{addVirtualHealthLink.title}</Typography>}
        subheader={addVirtualHealthLink.specialty}
        
      />
      {addVirtualHealthLink.description && (
        <CardContent>
          <Typography variant="body2" sx={{textAlign:'left',wordBreak: "break-word"}} >{addVirtualHealthLink.description}</Typography>
        </CardContent>
      )}
      <CardActions disableSpacing sx={{justifyContent:'space-between'}} >
       
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
         <Link mr={1} ml={0} pl={1} variant="button" underline="none" href={addVirtualHealthLink.url}>
          learn more
        </Link>
      </CardActions>
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

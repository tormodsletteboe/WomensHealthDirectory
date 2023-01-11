import * as React from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { CardHeader } from "@mui/material";
import Avatar from "@mui/material/Avatar";

const AddPreviewMedicalLinkCard = React.forwardRef((props,ref) => {
  const {addMedicalLink} = props;
  return (
    <Card sx={{ minWidth: 345, marginBottom: 2, maxWidth:345 }} ref={ref} {...props} >
      <CardHeader
        avatar={
          <Avatar
            alt=""
            src={addMedicalLink.logo_url}
            sx={addMedicalLink.logo_url ? { bgcolor: "white" }:{ bgcolor: "#8EBBA7" } }
          />
        }
        sx={{textAlign:'left'}}
        title={addMedicalLink.title && <Typography variant="body" >{addMedicalLink.title}</Typography>}
      />
      
      {addMedicalLink.description && (
        <CardContent>
          <Typography  variant="body2" sx={{textAlign:'left',wordBreak: "break-word"}} >{addMedicalLink.description}</Typography>
        </CardContent>
      )}
      
      <CardActions disableSpacing sx={{justifyContent:'space-between'}} >
         <Link mr={1} ml={0} pl={1} variant="button" underline="none" href={addMedicalLink?.url}>
          learn more
        </Link>
      </CardActions>
    </Card>
  );
})
export default AddPreviewMedicalLinkCard;

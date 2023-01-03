import * as React from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { CardHeader } from "@mui/material";
import Avatar from "@mui/material/Avatar";

function MedicalLinkCard({ medicallink }) {

  return (
    <Card sx={{ minWidth: 275, marginBottom: 2 }}>
      <CardHeader
        avatar={
          <Avatar
            alt=""
            src={medicallink.logo_url}
            sx={medicallink.logo_url ? { bgcolor: "white" }:{ bgcolor: "#8EBBA7" } }
          />
        }
        title={<Typography variant="body" >{medicallink.name}</Typography>}
      />
      {medicallink.description && (
        <CardContent>
          <Typography variant="body2" sx={{textAlign:'left'}} >{medicallink.description}</Typography>
        </CardContent>
      )}
      <CardActions disableSpacing sx={{justifyContent:'space-between'}} >
         <Link mr={1} ml={0} pl={1} variant="button" underline="none" href={medicallink.link}>
          learn more
        </Link>
      </CardActions>
    </Card>
  );
}
export default MedicalLinkCard;

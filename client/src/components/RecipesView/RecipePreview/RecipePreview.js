import React from "react";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InfoIcon from '@mui/icons-material/Info';

const RecipePreview = (id, name, description, image) => {
    return (
        <Link key={id} href={'/recipe/' + id } sx={{padding: 1}} >
            <Box position="relative" sx={{
                '& > img': {
                    width: '354px',
                    height: '216px',
                    objectFit: 'cover'
                }
            }}>
                <img src={"http://localhost:3001/" + image} alt={name} />
                <Box position="absolute" sx={{
                    bottom: 0,
                    left: 0,
                    right: 0,
                    display: 'flex',
                    height: '64px',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    alignItems: 'center'
                }}>
                    <Box sx={{flexGrow: '1', paddingY: 1, px: 2, color: 'white', overflow: 'hidden', width: '100%'}}>
                        <Typography sx={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', width: '100%', display: 'block'}}>{name}</Typography>
                        <Typography variant='caption' sx={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', width: '100%', display: 'block'}}>{description}</Typography>
                    </Box>
                    <Box >
                        {/*<IconButton>*/}
                        {/*    <InfoIcon sx={{ color: 'white' }} />*/}
                        {/*</IconButton>*/}
                    </Box>
                </Box>
            </Box>
        </Link>
    )
}

export default RecipePreview;
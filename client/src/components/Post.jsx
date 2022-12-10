import Deso from 'deso-protocol';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';

import './css/post.scss'

export default function Post(props) {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                component="img"
                height="170"
                image={props.image}
                alt="amogus"
                />
                <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    {props.body}
                </Typography>
                </CardContent>
            </CardActionArea>
            </Card>
    )

}

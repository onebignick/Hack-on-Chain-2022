import Deso from 'deso-protocol';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';

import './css/post.scss'

export default function Post(props) {
    /*async function getPost () {
        const deso = new Deso();
        const request = {
        "PostHashHex": props.hashHex
        };
        const response = await deso.posts.getSinglePost(request);
        return response
    }

    const data = getPost()*/
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                component="img"
                height="170"
                image="https://pbs.twimg.com/profile_images/1572281888127193097/y0cpTlQO_400x400.jpg"
                alt="amogus"
                />
                <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    Amogus
                </Typography>
                </CardContent>
            </CardActionArea>
            </Card>
    )

}

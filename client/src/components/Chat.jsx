import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import {useState, useEffect} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';

function intersperse(arr, sep) {
	if (arr.length === 0) {
		return [];
	}

	return arr.slice(1).reduce((xs, x, idx) => {
		const separator = (typeof sep === 'function')
			? sep(idx)
			: sep;
		return xs.concat([separator, x]);
	}, [arr[0]]);
}
const Messages = ({textfieldtext, settextfieldtext})=> {
    const handleChange = (e) => {settextfieldtext(e.target.value)}
    return (
    <Box sx={{ width: "70%", height:"60%"}}>

        <Typography>Current item name </Typography>
        <Box>
        {messages.map(({owner, text}) =>
          <Message owner={owner} text={text} />
        )}
        </Box>
        <TextField key="fwfefew" value = {textfieldtext} id="standard-basic" label="Chat!" variant="standard" onChange={handleChange}/>
    </Box>
    )
};
export default function Chat () {
    //login check
    const [halfscreen, sethalfscreen] = useState(true)
    const [listings,setlistings]= useState([1,2,3,4])
    
    const [messages, setmessages] = useState([{owner: false, text:"wefefew"},{owner: true, text:"wefefewfwef"}]) // current chat history ( change if chat changes) 
    //messages probably need a timestamp then just sort by time
    const [currentchat, setcurrentchat] = useState('') // current chat id 
    const [textfieldtext, settextfieldtext] = useState('')
    const Message = ({owner, text}) => {

        return (
            <Paper > 
                <Typography variant="body1" align={owner ? "right" :"left"}>{text}</Typography>
            </Paper>

        )
    }
    // <Message owner={owner} text={text}/>
   
    const openChat = (id) =>  {
        // add a new chat and open the full display
        sethalfscreen(false)
        
    }
    const Listings = () => {
        const id = "eijiojhfeow" //eg 
        // in production id is included as part of the object in listing
         return (
        <List className="noscroll" sx={{ cursor:'pointer',overflowY: "scroll" ,width: halfscreen ? "100%" : "30%", height:"80%", display:"flex", flexDirection:"column"}}>
            <Button onClick={() => {sethalfscreen(i => !i)}}>{halfscreen? 'open' :"close"}</Button>
            { intersperse(listings.map(() =>  
            <ListItem alignItems="flex-start" onClick={()=> openChat(id)}>
                {halfscreen? <img style={{height:'auto', maxWidth:"30%", paddingRight:"5vw"}}
                    src="https://pbs.twimg.com/profile_images/1572281888127193097/y0cpTlQO_400x400.jpg"></img> : null}
                    <h6>amogus merch</h6>
            </ListItem>
                  ), ()=>{ return <Divider variant="inset" component="li" />} )}
        </List>
        )
    }

    return (
        <Box sx={{ paddingBottom: "5vh",width: halfscreen ? "30vw" : "60vw", height: "100%", flexDirection:"row" , display:"flex" , justifyContent:'center',
         alignItems:"flex-end"}}>
            <Listings />
            {halfscreen ? null : <Messages textfieldtext={textfieldtext} settextfieldtext={settextfieldtext}/>}
        </Box>

    )
}
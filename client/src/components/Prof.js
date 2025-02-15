import React from 'react';
import './prof.css'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import Typography from '@material-ui/core/Typography';


const styles = {
 
    backgroundColor: '#00ffff',
    ':hover':  {
      cursor: 'pointer',
      backgroundColor: 'red'
    }
  
}
class Prof extends React.Component{
  constructor(props){
        super(props);
      this.state = { 
          books:[],
          blogs:[]           
       
      }
  }
  


      componentDidMount(){
      fetch("/post")
     
        .then(data => data.json())
        .then((data) => {
      
        for (var i = 0 ; i < data.length ; i++){
            if(data[i].username === this.props.username){
               this.setState({ books: data[i] },()=>{
                this.blogs()
      }
               )}

        }
            
         })
      }
      blogs(){
        var that = this
        fetch("/blogs")
        .then(data => data.json())
        .then((data) => {
          console.log(this.state.books.id)
          console.log(data[0].ProfileId)
          var arr = []
          for (var i = 0 ; i < data.length ;i++){
            if (data[i].ProfileId === this.state.books.id){
              arr.push(data[i])
            }
          }
          that.setState({blogs:arr})
         })
      }
  
     render(){
      return(
            <div className="container">
              <div className="size">
                <img id = "a"
                src={
                  this.state.books.url ||
                  'https://i0.wp.com/addisonavenuemarketing.com/wp-content/uploads/2016/07/facebook-avatar.jpg?fit=690%2C435'
                }
              alt="uploaded image"
              className="image"
              />
              <div className="overlay">
                <div className="text">
                  <h1 style={{color:'white',fontFamily:'cursive',fontSize:'50px'}}>Name:{this.state.books.username}</h1>
                  <h2 style={{color:'white',fontFamily:'cursive',fontSize:'40px'}}>Email:{this.state.books.email}</h2>
                  <h3 style={{color:'white',fontFamily:'cursive',fontSize:'50px'}}>Bio:{this.state.books.bio}</h3>
                </div>
              </div>
              </div>
             <h1> blogs</h1>
             {this.state.blogs.map(blog =>
           
                  <Card style={{maxWidth: 320 ,maxHeight: 410,float:"left",margin:"10px"}}>
                    <CardHeader
                        avatar={
                          <Avatar aria-label="Recipe" style={{ backgroundColor:"#E72C32"}}>
                            P
                          </Avatar>
                        }
                        title={blog.title}
                        subheader="September 14, 2018"
                        action={blog.country}
                        />
                    <CardMedia
                      style={{height: "0", paddingTop: '56.25%'}}
                      image={blog.image}
                    />
                    <CardContent>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {blog.Blog}
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton aria-label="Add to favorites" style={{color: "#E72C32"}}>
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="Share" style={{color: "#3D91EA"}}>
                        <ShareIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                )}     
             
           </div>
    )}
  }
export default Prof;


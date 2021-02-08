import axios from "axios";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import * as md from "@material-ui/core";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {
  useTheme,
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import "../Products/style.css";
import MenuIcon from "@material-ui/icons/Menu";
const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: "left",
      color: theme.palette.text.secondary,
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      display: "inline-block",
      height: "96px",
      objectFit: "cover",
    },
    appBar: {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  })
);

interface images {
  id: number;
  url: string;
}
interface IProducts {
  nome: string;
  descricao: string;
  quantidade: number;
  preco: number;
  dataCadastro: string;
  images: Array<images>;
}
function Products() {
  const classes = useStyles();
  const theme = useTheme();
  const [products, setProducts] = useState<IProducts[]>([]);
  const url = "http://localhost:3333/produtos/";
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios.get(url).then((response) => {
      setProducts(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <React.Fragment>
      <md.CssBaseline />
      <md.AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <md.Toolbar>
          <md.IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </md.IconButton>
          <md.Typography variant="h6" noWrap>
              Produtos
          </md.Typography>
        </md.Toolbar>
      </md.AppBar>
      <md.Drawer 
         className={classes.drawer}
         variant="persistent"
         anchor="left"
         open={open}
         classes={{
           paper: classes.drawerPaper,
         }}>
           <div className={classes.drawerHeader}>
               <md.IconButton onClick={handleDrawerClose}>
               {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
               </md.IconButton>
           </div>
      </md.Drawer>
      <main className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}>
            
      </main>
      <div className={classes.drawerHeader}/>

        
      <md.Grid container spacing={3}>
        {products.map((values) => (
          <md.Grid item xs={12} md={6}>
            <div className={classes.paper}>
              <Paper className={classes.paper}>
                <md.Grid container>
                  <md.Grid>
                    {values.images.map((imgVal) => (
                      <md.ButtonBase className={classes.img}>
                        <img
                          id="product-images"
                          src={imgVal.url}
                          className={classes.img}
                        ></img>
                      </md.ButtonBase>
                    ))}
                  </md.Grid>
                  <md.Grid item xs={12} sm container>
                    <md.Grid item xs container direction="column" spacing={2}>
                      <md.Grid item xs>
                        <md.Typography gutterBottom variant="subtitle1">
                          {values.nome}
                        </md.Typography>
                        <md.Typography variant="body2" gutterBottom>
                          {values.descricao}
                        </md.Typography>
                      </md.Grid>
                      <md.Grid item>
                        <md.Button variant="contained" color="primary">
                          Comprar
                        </md.Button>
                      </md.Grid>
                    </md.Grid>
                    <md.Grid item>
                      <md.Typography variant="subtitle1">
                        {"R$ " + values.preco}
                      </md.Typography>
                    </md.Grid>
                  </md.Grid>
                </md.Grid>
              </Paper>
            </div>
          </md.Grid>
        ))}
      </md.Grid>
    </React.Fragment>
  );
}

export default Products;

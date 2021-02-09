import axios from "axios";
import React, { useEffect, useState } from "react";
import * as md from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  useTheme,
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import "../Products/style.css";
import MenuIcon from "@material-ui/icons/Menu";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { set } from "date-fns";
const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
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
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    gridList: {
      width: "auto",
      height: 450,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

interface images {
  id: number;
  url: string;
}
interface IProducts {
  id: number;
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
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [nome, setNome] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [preco, setPreco] = useState<number>();
  const [images, setImages] = useState<images[]>([]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  function listProduct(id: number) {
    setOpen(true);
    axios.get(`http://localhost:3333/produtos/${id}`).then((response) => {
      setNome(response.data.nome);
      setDescricao(response.data.descricao);
      setPreco(response.data.preco);
      setImages(response.data.images);
      console.log(response.data);
    });
  }
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <md.Divider />
      <md.List>
        {["Carrinho", "Categorias"].map((text, index) => (
          <md.ListItem button key={text}>
            <md.ListItemIcon>{<ShoppingCartIcon />}</md.ListItemIcon>
            <md.ListItemText primary={text} />
          </md.ListItem>
        ))}
      </md.List>
      <md.Divider />
    </div>
  );

  useEffect(() => {
    axios.get(url).then((response) => {
      setProducts(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <div className={classes.root}>
      <md.Dialog
        fullScreen={fullScreen}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <md.DialogTitle>{nome}</md.DialogTitle>
        <md.DialogTitle>R$ {preco}</md.DialogTitle>
        <md.DialogContent>
          <div>
            <md.GridList cellHeight={300} className={classes.gridList}>
              <md.GridListTile
                key="Subheader"
                cols={2}
                style={{ height: "auto" }}
              >
                <md.ListSubheader> Imagens do Produto</md.ListSubheader>
              </md.GridListTile>

              {images.map((tile) => (
                <md.GridListTile key={tile.id}>
                  <img src={tile.url} alt={tile.url} />
                  <md.GridListTileBar
                    title={nome}
                    subtitle={<span>{descricao}</span>}
                  />
                </md.GridListTile>
              ))}
            </md.GridList>
          </div>
        </md.DialogContent>
        <md.DialogActions>
          <md.Button color="secondary" onClick={handleClose}>
            Fechar
          </md.Button>
        </md.DialogActions>
      </md.Dialog>
      <md.CssBaseline />
      <md.AppBar position="fixed" className={classes.appBar}>
        <md.Toolbar>
          <md.IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </md.IconButton>
          <md.Typography variant="h6" noWrap>
            Produtos
          </md.Typography>
        </md.Toolbar>
      </md.AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <md.Hidden smUp implementation="css">
          <md.Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </md.Drawer>
        </md.Hidden>
        <md.Hidden xsDown implementation="css">
          <md.Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </md.Drawer>
        </md.Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <md.Grid container spacing={3}>
          {products.map((values) => (
            <md.Grid item xs={12} md={6}>
              <div className={classes.paper}>
                <Paper className={classes.paper}>
                  <md.Grid container>
                    <md.Grid>
                      {values.images.map((imgVal) => (
                        <md.ButtonBase
                          className={classes.img}
                          onClick={() => {
                            listProduct(values.id);
                          }}
                        >
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
                          <md.Button
                            variant="contained"
                            color="primary"
                            id="btn-comprar"
                          >
                            Adicionar ao carrinho
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
      </main>
    </div>
  );
}

export default Products;

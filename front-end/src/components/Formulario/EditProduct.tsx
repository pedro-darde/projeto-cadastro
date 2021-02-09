import * as icons from "react-icons/fa";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "./cadastro-produto.css";
import * as md from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router-dom";
interface RegisterParams {
  id: string;
}
interface Iimage {
  id: number;
  url: string;
}

function EditProduct() {
  const [nomeProduto, setNomeProduto] = useState<string>("");
  const [descricaoProduto, setDescricaoProduto] = useState<string>("");
  const [precoProduto, setPrecoProduto] = useState<number | string>();
  const [quantidadeProduto, setQuantidadeProduto] = useState<number | string>();
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [open, setOpen] = React.useState(false);

  const notify = () => toast("Produto cadastrado com sucesso");
  const params = useParams<RegisterParams>();

  function handleCloseAccept(id: number) {
    setOpen(false);
    let newPreViewImages = previewImages;
    let newImages = images;

    newPreViewImages.splice(id, 1);
    newImages.splice(id, 1);

    setPreviewImages([...newPreViewImages]);
    setImages([...newImages]);
  }
  function handleCloseReject() {
    setOpen(false);
  }

  function cleanFields() {
    setDescricaoProduto("");
    setPrecoProduto("");
    setQuantidadeProduto("");
    setDescricaoProduto("");
    setImages([]);
  }

  useEffect(() => {
    axios
      .get(`http://localhost:3333/produtos/${params.id}`)
      .then((response) => {
        setNomeProduto(response.data.nome);
        setDescricaoProduto(response.data.descricao);
        setPrecoProduto(response.data.preco);
        setQuantidadeProduto(response.data.quantidade);
        setImages(response.data.images);
        setPreviewImages(response.data.images.map((images : any) =>{
          return images.url;
        }))

        console.log(images)
        
      });
      
  }, [params.id]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const url = "http://localhost:3333/produtos";
    const data = new FormData();
    data.append("id",params.id);
    data.append("nome", nomeProduto);
    data.append("descricao", descricaoProduto);
    data.append("quantidade", String(quantidadeProduto));
    data.append("preco", String(precoProduto));
    images.forEach((image) => {
      data.append("images", image);
    });
    
    await axios.patch(url, data);
    notify();
    cleanFields();
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }
    const selectedImages = Array.from(event.target.files);
    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map((image) => {
      return URL.createObjectURL(image);
    });

    setPreviewImages(selectedImagesPreview);
  }

  return (
    <div className="container" id="container-cadastro-produtos">
      <form className="form-submit" onSubmit={handleSubmit}>
        <md.DialogTitle id="product-title"> Cadastrar Produto </md.DialogTitle>
        <md.TextField
          label="Nome do Produto"
          fullWidth={true}
          id="input-nome-produto"
          margin="normal"
          variant="outlined"
          required={true}
          value={nomeProduto}
          onChange={(event) => {
            setNomeProduto(event.target.value);
          }}
                    
        />
        <md.TextField
          label="Descrição"
          fullWidth={true}
          margin="normal"
          value={descricaoProduto}
          multiline={true}
          id="input-cadastro"
          required={true}
          variant="outlined"
          onChange={(event) => {
            setDescricaoProduto(event.target.value);
          }}
        />
        <md.TextField
          label="Quantidade"
          fullWidth={true}
          variant="outlined"
          id="input-cadastro"
          margin="normal"
          required={true}
          type="number"
          value={quantidadeProduto}
          onChange={(event) => {
            setQuantidadeProduto(event.target.value);
            console.log(event.target.value);
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <md.TextField
          variant="outlined"
          label="Preço"
          type="number"
          value={precoProduto}
          fullWidth={true}
          margin="normal"
          id="input-cadastro"
          required={true}
          onChange={(event) => {
            setPrecoProduto(event.target.value);
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <div className="input-block">
          <label> Selecione imagens do seu produto : </label>
          <div className="container" id="container-img">
            {previewImages.map((image, key) => {
              return (
                <div className="container-wraper" key={key}>
                  <img
                    key={key}
                    src={image}
                    alt="Nome"
                    className="product-image"
                  />
                  <div className="overlay">
                    <icons.FaTrash
                      color="red"
                      className="icon-style"
                      onClick={() => {
                        setOpen(true);
                      }}
                    />
                  </div>
                  <md.Dialog
                    open={open}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <md.DialogTitle>
                      {"Tem certeza que deseja excluir a imagem selecionada ?"}
                    </md.DialogTitle>
                    <md.DialogContent>
                      <md.DialogContentText>
                        Ao aceitar essa mudança a imagem não sera exibida nos
                        detalhes do produto cadastrado
                      </md.DialogContentText>
                    </md.DialogContent>
                    <md.DialogActions>
                      <md.Button onClick={handleCloseReject} color="secondary">
                        {" "}
                        Rejeitar{" "}
                      </md.Button>
                      <md.Button
                        onClick={() => {
                          handleCloseAccept(key);
                        }}
                        color="primary"
                      >
                        {" "}
                        Aceitar
                      </md.Button>
                    </md.DialogActions>
                  </md.Dialog>
                </div>
              );
            })}
            <label htmlFor="image[]" className="new-image">
              <icons.FaPlus size={24} color="15b6d6" />
            </label>
          </div>
          <input
            type="file"
            id="image[]"
            onChange={handleSelectImages}
            multiple
          ></input>
          <md.Button
            variant="contained"
            color="primary"
            size="small"
            type="submit"
            className="button-submit"
            id="btn-submit-produtos"
          >
            {" "}
            Cadastrar{" "}
          </md.Button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default EditProduct;

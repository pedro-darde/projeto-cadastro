import * as icons from "react-icons/fa";
import React, { ChangeEvent, FormEvent, useState } from "react";
import "./cadastro-produto.css";
import * as md from "@material-ui/core";
import axios from "axios";
function CadastroProdutos() {
  const [nomeProduto, setNomeProduto] = useState<string>("");
  const [descricaoProduto, setDescricaoProduto] = useState<string>("");
  const [precoProduto, setPrecoProduto] = useState<number | string>();
  const [quantidadeProduto, setQuantidadeProduto] = useState<number | string>();
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const url = "http://localhost:3333/produtos";
    const data = new FormData();

    data.append("nome", nomeProduto);
    data.append("descricao", descricaoProduto);
    data.append("quantidade", String(quantidadeProduto));
    data.append("preco", String(precoProduto));

    images.forEach((image) => {
      data.append("images", image);
    });

    await axios.post(url, data);

    console.log(data.entries);
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
        <md.DialogTitle id="title-form"> Cadastrar Produto </md.DialogTitle>
        <md.TextField
          label="Nome do Produto"
          variant="outlined"
          fullWidth={true}
          id="input-nome-produto"
          margin="normal"
          required={true}
          value={nomeProduto}
          onChange={(event) => {
            setNomeProduto(event.target.value);
          }}
        />
        <md.TextField
          label="Descrição"
          variant="outlined"
          fullWidth={true}
          margin="normal"
          value={descricaoProduto}
          multiline={true}
          id="input-cadastro"
          required={true}
          onChange={(event) => {
            setDescricaoProduto(event.target.value);
          }}
        />
        <md.TextField
          label="Quantidade"
          variant="outlined"
          fullWidth={true}
          id="input-cadastro"
          margin="normal"
          required={true}
          type="number"
          value={quantidadeProduto}
          onChange={(event) => {
            setQuantidadeProduto(event.target.value);
            console.log(event.target.value);
          }}
        />
        <md.TextField
          label="Preço"
          variant="outlined"
          type="number"
          value={precoProduto}
          fullWidth={true}
          margin="normal"
          id="input-cadastro"
          required={true}
          onChange={(event) => {
            setPrecoProduto(event.target.value);
          }}
        />
        <div className="input-block">
          <label> Selecione imagens do seu produto </label>
          <div className="container" id="container-img">
            {previewImages.map((image) => {
              return (
                <div className="container-wraper">
                  <icons.FaTrash color="red" className="icon-style"/>
                  <img key={image} src={image} alt="Nome" />
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
    </div>
  );
}

export default CadastroProdutos;

import * as icons from "react-icons/fa";
import { ChangeEvent, FormEvent, useState } from "react";
import "./cadastro-produto.css";
import * as md from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router-dom";
function CadastroProdutos() {
  const[nomeProduto,setNomeProduto] = useState<string>("");
  const[descricaoProduto, setDescricaoProduto] = useState<string>("")
  const[precoProduto,setPrecoProduto] = useState<number>();
  const[dataCadastroProduto,setDataCadastroProduto] = useState<Date>();
  const[quantidadeProduto,setQuantidadeProduto] = useState<number>();
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const history = useHistory();
  function handleSubmit(event : FormEvent){
    const url = "http://localhost:3333/produtos/"
    axios.post(url,{

    }).then(response=>{
      console.log(response.data)
    })
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
    <div className="container">
      <form className="form-submit">
        <md.DialogTitle id="title-form">
          {" "}
          Formulário de Cadastro{" "}
        </md.DialogTitle>
        <md.TextField
          label="Esreva seu nome"
          variant="outlined"
          fullWidth={true}
          id="input-nome"
          margin="normal"
          required={true}
        />
        <md.TextField
          label="Esreva seu sobrenome"
          variant="outlined"
          fullWidth={true}
          margin="normal"
          id="input-cadastro"
          required={true}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <md.TextField
          inputProps={{
            maxlength: 11,
          }}
          label="Escreva seu cpf"
          variant="outlined"
          fullWidth={true}
          id="input-cadastro"
          margin="normal"
          required={true}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <md.TextField
          label="Esreva seu email"
          variant="outlined"
          type="email"
          fullWidth={true}
          margin="normal"
          id="input-cadastro"
          required={true}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <div className="input-block">
          <label> Fotos </label>
          <div className="container" id="container-img">
            {previewImages.map((image) => {
              return <img key={image} src={image} alt="Nome" />;
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
        </div>
      </form>
    </div>
  );
}

export default CadastroProdutos;

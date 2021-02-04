import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import Produtos from "./Produto";

@Entity("images")
export default class Image {
  
  @PrimaryGeneratedColumn("increment")
  id: number;
  
  @Column()
  path: string;
  

  @ManyToOne(()=> Produtos, produtos  => produtos.images)
  @JoinColumn({name:'produto_id'})
  produtos: Produtos;
}

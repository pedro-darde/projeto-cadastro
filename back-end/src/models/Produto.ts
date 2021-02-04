import { Entity, Column, PrimaryGeneratedColumn , OneToMany, JoinColumn} from "typeorm";
import Image from './Image'
@Entity("produtos")
export default class Produtos {
  
  @PrimaryGeneratedColumn("increment")
  id: number;
  
  @Column()
  nome: string;
  
  @Column()
  descricao: string;
  
  @Column()
  quantidade: number;
  
  @Column()
  preco: number;
  
  @Column()
  dataCadastro: Date;

  @OneToMany(() =>Image, image => image.produtos,{
    cascade: ['insert','update']
  })
  @JoinColumn({name: 'produto_id'})
  images: Image[];
}

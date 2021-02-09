import { Entity, Column, PrimaryGeneratedColumn , OneToMany, JoinColumn, BaseEntity} from "typeorm";
import Image from './Image'
@Entity("produtos")
export default class Produtos extends BaseEntity {
  
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
  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  dataCadastro: string;

  @OneToMany(() =>Image, image => image.produtos,{
    cascade: ['insert','update'],
    onUpdate: "CASCADE"
  })
  @JoinColumn({name: 'produto_id'})
  images: Image[];
}

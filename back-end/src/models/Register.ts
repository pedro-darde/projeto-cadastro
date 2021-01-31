import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("register")
export default class Register {
  
  @PrimaryGeneratedColumn("increment")
  id: number;
  
  @Column()
  nome: string;
  
  @Column()
  sobrenome: string;
  
  @Column()
  cpf: string;
  
  @Column()
  promocao: boolean;
  
  @Column()
  novidades: boolean;
  
  @Column()
  dataCadastro: Date;

  @Column()
  email: string;

  @Column()
  dataNascimento: Date;
}

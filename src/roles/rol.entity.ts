import { User } from "src/users/user.entity";
import { Column, Entity, ManyToMany, PrimaryColumn } from "typeorm";

@Entity({name:'roles'})
export class Rol{
    
    @PrimaryColumn()
    id: String;

    @Column({unique:true})
    name: String;

    @Column()
    image: String;

    @Column()
    route: String;
    
    @Column({type: 'datetime',default: () =>'CURRENT_TIMESTAMP'})
    created_at: Date;

    @Column({type: 'datetime',default: () =>'CURRENT_TIMESTAMP'})
    updated_at: Date;

    //relaciones 

    @ManyToMany(()=> User,(user)=> user.roles)
    users: User[]
}
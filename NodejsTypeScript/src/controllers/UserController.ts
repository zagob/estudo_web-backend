import { Request, Response } from 'express';
import db from '../database/connections';


class UserController {
    async index(request: Request, response: Response) {
        
        const users = await db('users')

        return response.json(users);
    }

    async indexUser(request: Request, response: Response) {
        const { id } = request.params;
        const {name, sobre} = request.body
        
       try {
            await db('users').where('id', id);

            return response.status(204).json({
                name,
                sobre
            });
       } catch (err) {
            return response.status(400).json({
                error: 'User id not found'
            })
       }
    }

    async create(request: Request, response: Response) {
        // uma desestruturação
        const {
            name,
            sobre
        } = request.body; // todos os dados para criação da aula
    
        const trx = await db.transaction(); // ele faz tudo ao mesmo tempo e se houver algum erro, se desfaz
    
        try {
            await trx('users').insert({
                name,
                sobre
            });
        
            await trx.commit(); // depois de tudo feito, ai que insere no banco de dados
        
            return response.status(201).send();
        } catch (err) {
            await trx.rollback(); // desfaz tudo que banco de dados fez e gerou um erro
    
            console.log(err)
            return response.status(400).json({
                error: 'Unexpected error while creating new class'
            })
        }
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;
        
        try {
            await db('users').where('id', id).delete();

            return response.status(204).send();
        } catch (err) {

            return response.status(400).json({
                error: 'User id not found'
            })
        }
    }

    async update(request: Request, response: Response) {
        const { id } = request.params
        const {name, sobre} = request.body
    
        // const trx = await db.transaction(); // ele faz tudo ao mesmo tempo e se houver algum erro, se desfaz
    
        try {
            await db('users')
                .update({
                    name,
                    sobre,
                })
                .where('id', id)
                
        
            // await trx.commit(); // depois de tudo feito, ai que insere no banco de dados
        
            return response.status(201).send();
        } catch (err) {
            // await trx.rollback(); // desfaz tudo que banco de dados fez e gerou um erro
    
            console.log(err)
            return response.status(400).json({
                error: 'Unexpected error while creating new class'
            })
        }
    }
}

export default UserController;
import 'reflect-metadata';
import express from 'express';
import { prisma } from './prisma'

const app = express();

app.use(express.json());

app.get('/users', async (req, res) => {
    // creating data
    const newUser = await prisma.usuarios.create({
    data: {
            nome: 'John Doe',
            email: 'teste@teste.com',
            telefone: 123456789,
            data_nascimento: '2020-01-01',
            palavra_passe: '111',
        }
    });
    // find one data
    const oneUser = await prisma.usuarios.findUnique({ where: { id: newUser.id } });
    // all datas
    const users = await prisma.usuarios.findMany();

    // returning data
    return res.status(200).json({ status: 'Passed', data: users, oneUser });
})

// sever
app.listen(3333, () => {
    console.log('Server started on port 3333!');
});
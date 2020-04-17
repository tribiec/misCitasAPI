import db from '../database';
import { verifyToken, createToken } from '../auth/Token';
import resolver from '../utils/resolvers';

class User {

    static async checkLogin(req, res) {
        verifyToken(req.body.token, async (err, authData) => {
            if (err) {
                resolver(401, "Token Invalid", res);
            } else {
                const users = db.collection("users");
                const user = await users.findOne({ correo: authData.correo});
                const { fullNombre, gustos, correo } = user;
                resolver(200, {fullNombre, gustos, correo, ...authData}, res);
            }
        })
    }

    static async updateLoc(req,res){
        const users = db.collection("users");
        verifyToken(req.token, (err, authData) => {
            if (err) {
                resolver(401, "Token Invalid", res);
            } else {
                users.updateOne({ correo: authData.correo}, { $set: req.body}).catch(err => {
                    resolver(500, "Error interno en el servidor...", res);
                }).then(() => {
                    resolver(200, "Coordenadas actualizadas", res);
                });
            }
        })
    }


    static async Login(req, res) {
        const users = db.collection("users");
        const usuario = await users.findOne({ correo: req.body.correo }).then(e=> e);
        if(usuario.length === 0){
            resolver(400, "No existe cuenta asociada al correo",res);
        }else{
            if(usuario.clave == req.body.clave){
                createToken({correo: req.body.correo}, (err, authData) => {
                    const { correo, ciudad, fullNombre, gustos } = usuario;
                    if(err) return resolver(500, "Error en Login", res);
                    resolver(200, {
                        correo,
                        ciudad,
                        fullNombre,
                        gustos,
                        token: authData
                    },res);
                });
            }else{
                resolver(400, "Contraseña Incorrecta",res);
            }
        }
    }

    static async Register(req,res){
        console.log(req.body);
        const users = db.collection('users');
        const usuarios_match = await users.find({ correo: req.body.correo}).toArray().then(e => e);
        if(usuarios_match.length > 0){
            resolver(500, "Ya existe una cuenta con ese correo", res);
        }else{
            users.insertOne(req.body);
            resolver(200, "Cuenta agregada con exito",res);
        }
    }

    static async getUsers(req,res){
        const users = db.collection("users");
        const response = await users.find({}).toArray().then(e => e);
        res.json(response);
    }

}

export default User;
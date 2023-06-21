const express =  require('express');
const cors = require ('cors');
const {Sequelize} = require ('./models');
const models= require ('./models');

const app = express();
app.use(cors());
app.use(express.json());

let cliente = models.Cliente;
let cartao  = models.Cartao;
let compra  = models.Compra;
let empresa = models.Empresa;
let promocao= models.Promocao;

let port = process.env.PORT || 3001;

app.listen(port, (req, res)=>{
    console.log('Servidor está ativo: '+
    'http://localhost:3001');
})

app.get('/', function(req, res) {
    res.send('Bem-vindo(a) a Ti Academy Brasil.');
});

//Inserir novos 

//Inserir novo cliente

app.post('/cliente', async(req, res)=>{
    await cliente.create(
        req.body
    ).then(cli=>{
        return res.json({
            error: false,
            message: "Cliente foi inserido com sucesso.",
            cli
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Problema de conexão com a API."
        });
    });
});

//Inserir nova empresa

app.post('/empresa', async(req, res)=>{
    await empresa.create(
        req.body
    ).then(emp=>{
        return res.json({
            error: false,
            message: "Empresa foi inserida com sucesso.",
            emp
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Problema de conexão com a API."
        });
    });
});

//Inserir nova promoção (com erro: message": "Problema de conexão com a API.")

app.post('/empresa/:id/promocao', async(req, res)=>{
    const promo = {
        EmpresaId: req.params.id,
        nome: req.body.nome,
        descricao: req.body.descricao,
        validade: req.body.validade,
      };
      if (! await empresa.findByPk(req.params.id)){
        return res.status(400).json({
            error: true,
            message: "Empresa não Existe."
        });
      };

      await promocao.create(promo)
      .then(emppromo=>{
        return res.json({
            error: false,
            message: "Promoção foi cadastrada com sucesso.",
            emppromo
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Problema de conexão com a API."
        });
    });   
});
//Inserir novo cartao

app.post('/cliente/:id/cartao', async(req, res)=>{
    const card = {
        ClienteId: req.params.id,
        dataCartao: req.body.dataCartao,
        validade: req.body.validade,
      };
      if (! await cliente.findByPk(req.params.id)){
        return res.status(400).json({
            error: true,
            message: "Cliente não Existe."
        });
      };

      await cartao.create(card)
      .then(cardcli=>{
        return res.json({
            error: false,
            message: "Cartão foi inserido com sucesso.",
            cardcli
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Problema de conexão com a API."
        });
    });   
});

//Inserir nova compra (com erro: sqlMessage: "Unknown column 'CartaoId' in 'field list'",no)

app.post('/cartao/:CartaoId/compra', async(req, res)=>{
    const comp = {
        CartaoId: req.params.CartaoId,
        PromocaoId: req.body.PromocaoId,
        data: req.body.data,
        quantidade: req.body.quantidade,
        valor: req.body.valor
      };
      if (! await cartao.findByPk(req.params.CartaoId)){
        return res.status(400).json({
            error: true,
            message: "Cartão não Existe."
        });
      };

      await compra.create(comp)
      .then(compcli=>{
        return res.json({
            error: false,
            message: "Compra foi inserido com sucesso.",
            compcli
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Problema de conexão com a API."
        });
    });   
});
//-----------------------------------------------------------------------------
//listar

//listar todos clientes

app.get('/clientes', async(req, res)=>{
    await cliente.findAll()
    .then(cli=>{
        return res.json({
            error: false,
            cli
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Problema de conexão com a API."
        });
    });   
});
//listar todos os cartoes dos clientes (com erro: "Problema de conexão com a API.")
app.get('/clientes-cartoes', async(req, res)=>{
    await cliente.findAll({include : [{all: true}]})
    .then(cli=>{
        return res.json({
            error: false,
            cli
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Problema de conexão com a API."
        });
    });
});

//listar cartoes de um cliente (com erro: "Problema de conexão com a API.")
app.get('/cliente/:id/cartoes' ,async(req, res)=>{
    await cliente.findAll({
        where: {ClienteId: req.params.id}
    }).then(cartaos=>{
        return res.json({
            error: false,
            cartaos
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Problema de conexão com a API."
        });
    });
})


//listar todos cartoes (com erro:"Problema de conexão com a API.")

app.get('/cartoes', async(req, res)=>{
    await cartao.findAll()
    .then(listcard=>{
        return res.json({
            error: false,
            listcard
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Problema de conexão com a API."
        });
    });   
});

//listar todas compras (com erro: sqlMessage: "Unknown column 'CartaoId' in 'field list'",)

app.get('/compras', async(req, res)=>{
    await compra.findAll()
    .then(compracli=>{
        return res.json({
            error: false,
            compracli
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Problema de conexão com a API."
        });
    });   
});

//listar todas promocoes (com erro, nao lista porque nao foi possivel cadastrar promo)

app.get('/promocoes', async(req, res)=>{
    await promocao.findAll()
    .then(promocli=>{
        return res.json({
            error: false,
            promocli
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Problema de conexão com a API."
        });
    });   
});

//listar todas empresas

app.get('/empresas', async(req, res)=>{
    await empresa.findAll()
    .then(empresacli=>{
        return res.json({
            error: false,
            empresacli
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Problema de conexão com a API."
        });
    });   
});

//atualizar-----------------------------------------------------------
//atualizar cliente

app.put('/cliente/:id', async(req, res)=>{
    const altcli = {
        id: req.params.id,
        nome: req.body.nome,
        cidade: req.body.cidade,
        uf: req.body.uf,
        nascimento: req.body.nascimento
    }
    if(! await cliente.findByPk(req.params.id)){
        return res.status(400).json({
            error:true,
            message:"Cliente não existe."
        });
    };

    await cliente.update(altcli,{
        where: Sequelize.and({id: req.params.id})
    }).then(umcliente =>{
        return res.json({
            error: false,
            message: "Cliente foi alterado com sucesso.",
            umcliente
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Problema de conexão com a API."
        });
    });
});

//atualizar cartao ( com erro:sqlMessage: "Unknown column 'CartaoId' in 'field list'")

app.put('/cartao/:id', async(req, res)=>{
    const altcart = {
        id: req.params.id,
        ClienteId: req.body.ClienteId,
        dataCartao: req.body.dataCartao,
        validade: req.body.validade
    }
    if(! await cartao.findByPk(req.params.id)){
        return res.status(400).json({
            error:true,
            message:"Cartão não existe."
        });
    };

    await cartao.update(altcart,{
        where: Sequelize.and({id: req.params.id})
    }).then(umcartao =>{
        return res.json({
            error: false,
            message: "Cartão foi alterado com sucesso.",
            umcartao
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Problema de conexão com a API."
        });
    });
});

//atualizar compra( erro: nao foi testado porque nao foi possivel incluir compra)

app.put('/compra/:CartaoId', async(req, res)=>{
    const altcomp = {
        CartaoId: req.params.CartaoId,
        PromocaoId: req.body.PromocaoId,
        data: req.body.data,
        quantidade: req.body.quantidade,
        valor: req.body.valor
    }
    if(! await compra.findByPk(req.params.CartaoId)){
        return res.status(400).json({
            error:true,
            message:"Cartão não existe."
        });
    };

    await compra.update(altcomp,{
        where: Sequelize.and({CartaoId: req.params.CartaoId})
    }).then(umacompra =>{
        return res.json({
            error: false,
            message: "Compra foi alterado com sucesso.",
            umacompra
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Problema de conexão com a API."
        });
    });
});

//atualizar promocao ( com erro: nao foi possivel testar porque nao foi possivel incluir promoção)

app.put('/promocao/:id', async(req, res)=>{
    const altpromo = {
        id: req.params.id,
        EmpresaIdId: req.body.EmpresaIdId,
        nome: req.body.nome,
        descricao: req.body.descricao,
        validade: req.body.validade
    }
    if(! await promocao.findByPk(req.params.id)){
        return res.status(400).json({
            error:true,
            message:"Promoção não existe."
        });
    };

    await promocao.update(altpromo,{
        where: Sequelize.and({id: req.params.id})
    }).then(umapromo =>{
        return res.json({
            error: false,
            message: "Promoção foi alterado com sucesso.",
            umapromo
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Problema de conexão com a API."
        });
    });
});

//atualizar empresa 
app.put('/empresa/:id', async(req, res)=>{
    const altemp = {
        id: req.params.id,
        nome: req.body.nome,
        dataAdesao: req.body.dataAdesão
    }
    if(! await empresa.findByPk(req.params.id)){
        return res.status(400).json({
            error:true,
            message:"Cartão não existe."
        });
    };

    await empresa.update(altemp,{
        where: Sequelize.and({id: req.params.id})
    }).then(umaempresa =>{
        return res.json({
            error: false,
            message: "Empresa foi alterada com sucesso.",
            umaempresa
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Problema de conexão com a API."
        });
    });
});
//-------------------------------------------------------------
//excluir

//exlcuir cliente
app.delete('/excluir-cliente/:id', async(req, res)=>{
    await cliente.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error:false,
            message: "Cliente foi excluido com sucesso.",
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Problema de conexão com a API."
        });
    });
});

//exlcuir cartao
app.delete('/excluir-cartao/:id', async(req, res)=>{
    await cartao.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error:false,
            message: "Cartao foi excluido com sucesso.",
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Problema de conexão com a API."
        });
    });
});

//exlcuir compra (esta com erro porque nao foi possivel incluir compra)
app.delete('/excluir-compra/:CartaoId', async(req, res)=>{
    await compra.destroy({
        where: {CartaoId: req.params.CartaoId}
    }).then(function(){
        return res.json({
            error:false,
            message: "Compra foi excluido com sucesso.",
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Problema de conexão com a API."
        });
    });
});

//exlcuir promoção (esta com erro porque nao foi possivel incluir promoção)
app.delete('/excluir-promocao/:id', async(req, res)=>{
    await promocao.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error:false,
            message: "Promoção foi excluido com sucesso.",
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Problema de conexão com a API."
        });
    });
});

//exlcuir empresa
app.delete('/excluir-empresa/:id', async(req, res)=>{
    await empresa.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error:false,
            message: "Empresa foi excluido com sucesso.",
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Problema de conexão com a API."
        });
    });
});
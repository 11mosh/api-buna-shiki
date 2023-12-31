import conexao from "./connection.js"





// Cadastrando

export async function cadastrarPedido(pedido){
    const comando = `insert into tb_pedido(id_cliente, id_endereco_entrega, id_cartao, tp_entrega, tp_forma_pagamento, dt_pedido, dt_entrega_pedido, ds_situacao, vl_subtotal, vl_frete, vl_total, ds_avaliacao)
                                    values(?, ?, ?, ?, ?, ?, ?, 'Pedido realizado' ,  ?, ?, ?, 0)`

    const [resp] = await conexao.query(comando, [pedido.id_cliente, pedido.id_endereco, pedido.id_cartao, pedido.tp_entrega, pedido.forma_pagamento, pedido.dt_pedido, pedido.dt_entrega, pedido.subtotal, pedido.frete, pedido.total])                            

    pedido.id = resp.insertId

    return pedido
}


export async function cadastrarItemPedido(item){
    const comando = `insert into tb_pedido_item(id_pedido, id_produto, qtd_itens)
                                        values(?, ?, ?)`

    const [resp] = await conexao.query(comando, [item.id_pedido, item.id_produto, item.qtd])

    item.id = resp.insertId

    return item;
}










// Buscando
 
export async function buscarTodosPedidos(){
    const comando = `select id_pedido           as id,
                            id_cliente,
                            id_endereco_entrega as id_endereco,
                            id_cartao,
                            tp_entrega,
                            tp_forma_pagamento  as forma_pagamento,
                            dt_pedido,
                            dt_entrega_pedido   as dt_entrega,
                            ds_situacao         as situacao,
                            vl_subtotal         as subtotal,
                            vl_frete            as frete,
                            vl_total            as total,
                            ds_avaliacao        as avalicao
                       from tb_pedido`

    const [resp] = await conexao.query(comando)
                             
    return resp
}


export async function buscarTodosPedidosPrimeiroProduto(){
    const comando = `select id_pedido_item,
                            id_pedido,
                            id_produto,
                            qtd_itens as qtd
                       from tb_pedido_item;`

    const [resp] = await conexao.query(comando)
                             
    return resp
}

export async function buscarPedidosPorStatus(status){
    const comando = `select id_pedido           as id,
                            id_cliente,
                            id_endereco_entrega as id_endereco,
                            id_cartao,
                            tp_entrega,
                            tp_forma_pagamento  as forma_pagamento,
                            dt_pedido,
                            dt_entrega_pedido   as dt_entrega,
                            ds_situacao         as situacao,
                            vl_subtotal         as subtotal,
                            vl_frete            as frete,
                            vl_total            as total,
                            ds_avaliacao        as avalicao
                       from tb_pedido
                      where ds_situacao = ?`
        
    const [resp] = await conexao.query(comando, [status])
    
    return resp
}

export async function buscarPedidosPorFormaPagamento(forma){
    const comando = `select id_pedido           as id,
                            id_cliente,
                            id_endereco_entrega as id_endereco,
                            id_cartao,
                            tp_entrega,
                            tp_forma_pagamento  as forma_pagamento,
                            dt_pedido,
                            dt_entrega_pedido   as dt_entrega,
                            ds_situacao         as situacao,
                            vl_subtotal         as subtotal,
                            vl_frete            as frete,
                            vl_total            as total,
                            ds_avaliacao        as avalicao
                       from tb_pedido
                      where tp_forma_pagamento = ?`
            
    const [resp] = await conexao.query(comando, [forma])   
    
    return resp
}

export async function buscarPedidosPorData(data) {
    const comando = `select id_pedido           as id,
                            id_cliente,
                            id_endereco_entrega as id_endereco,
                            id_cartao,
                            tp_entrega,
                            tp_forma_pagamento  as forma_pagamento,
                            dt_pedido,
                            dt_entrega_pedido   as dt_entrega,
                            ds_situacao         as situacao,
                            vl_subtotal         as subtotal,
                            vl_frete            as frete,
                            vl_total            as total,
                            ds_avaliacao        as avalicao
                       from tb_pedido
                      where dt_pedido like ?`
            
    const [resp] = await conexao.query(comando, [`%${data}%`])
    
    return resp;
}

export async function buscarPedidosPorCodigo(busca){
    const comando = `select id_pedido           as id,
                            id_cliente,
                            id_endereco_entrega as id_endereco,
                            id_cartao,
                            tp_entrega,
                            tp_forma_pagamento  as forma_pagamento,
                            dt_pedido,
                            dt_entrega_pedido   as dt_entrega,
                            ds_situacao         as situacao,
                            vl_subtotal         as subtotal,
                            vl_frete            as frete,
                            vl_total            as total,
                            ds_avaliacao        as avalicao
                       from tb_pedido
                      where id_pedido = ?`

    const [resp] = await conexao.query(comando, [busca])

    return resp
}

export async function buscarClientePorNome(nome){
    const comando = `select id_cliente      as id,
                            nm_cliente      as nome,
                            ds_telefone     as telefone,
                            ds_cpf          as cpf,
                            dt_nascimento   as nascimento,
                            ds_email        as email,
                            dt_cadastro
                       from tb_cliente
                      where nm_cliente like ?`

    const [resp] = await conexao.query(comando, [`%${nome}%`])

    return resp
}

export async function buscarClientePorId(id){
    const comando = `select id_cliente      as id,
                            nm_cliente      as nome,
                            ds_telefone     as telefone,
                            ds_cpf          as cpf,
                            dt_nascimento   as nascimento,
                            ds_email        as email,
                            dt_cadastro
                       from tb_cliente
                      where id_cliente = ?`
    
    const [resp] = await conexao.query(comando, [id])          
    
    return resp[0]
}

export async function ordenarPedidosPorFaturamento(){
    const comando = ` select    id_pedido           as id,
                                id_cliente,
                                id_endereco_entrega as id_endereco,
                                id_cartao,
                                tp_entrega,
                                tp_forma_pagamento  as forma_pagamento,
                                dt_pedido,
                                dt_entrega_pedido   as dt_entrega,
                                ds_situacao         as situacao,
                                vl_subtotal         as subtotal,
                                vl_frete            as frete,
                                vl_total            as total,
                                ds_avaliacao        as avalicao
                        from    tb_pedido
                    order by    vl_total desc`

    const [resp] = await conexao.query(comando)

    return resp
}

export async function buscarPedidosPorIdCliente(id){
    const comando = `select id_pedido           as id,
                            id_cliente,
                            id_endereco_entrega as id_endereco,
                            id_cartao,
                            tp_entrega,
                            tp_forma_pagamento  as forma_pagamento,
                            dt_pedido,
                            dt_entrega_pedido   as dt_entrega,
                            ds_situacao         as situacao,
                            vl_subtotal         as subtotal,
                            vl_frete            as frete,
                            vl_total            as total,
                            ds_avaliacao        as avalicao
                       from tb_pedido
                      where id_cliente = ?
                      ORDER BY FIELD(ds_situacao, 'Pedido Realizado', 'Pagamento', 'Pedido em preparo', 'À caminho', 'Entregue', 'Cancelado');
                    `

    const [resp] = await conexao.query(comando, [id])

    return resp
}

export async function ordenarClientePorNome(){
    const comando = ` select id_cliente      as id,
                             nm_cliente      as nome,
                             ds_telefone     as telefone,
                             ds_cpf          as cpf,
                             dt_nascimento   as nascimento,
                             ds_email        as email,
                             dt_cadastro
                        from tb_cliente
                    order by nm_cliente`

    const [resp] = await conexao.query(comando)

    return resp
}

export async function ordenarPedidosPorData(){
    const comando = `select  id_pedido           as id,
                             id_cliente,
                             id_endereco_entrega as id_endereco,
                             id_cartao,
                             tp_entrega,
                             tp_forma_pagamento  as forma_pagamento,
                             dt_pedido,
                             dt_entrega_pedido   as dt_entrega,
                             ds_situacao         as situacao,
                             vl_subtotal         as subtotal,
                             vl_frete            as frete,
                             vl_total            as total,
                             ds_avaliacao        as avalicao
                        from tb_pedido
                    order by dt_pedido desc`
    
    const [resp] = await conexao.query(comando)
    
    return resp
}

export async function buscarPedidoPorIdPedido(id){
    const comando = `select id_pedido           as id,
                            id_cliente,
                            id_endereco_entrega as id_endereco,
                            id_cartao,
                            tp_entrega,
                            tp_forma_pagamento  as forma_pagamento,
                            dt_pedido,
                            dt_entrega_pedido   as dt_entrega,
                            ds_situacao         as situacao,
                            vl_subtotal         as subtotal,
                            vl_frete            as frete,
                            vl_total            as total,
                            ds_avaliacao        as avalicao
                       from tb_pedido
                      where id_pedido = ?`

    const [resp] = await conexao.query(comando, [id])

    return resp[0]
}

export async function buscarItemsPedidoPorIdPedido(id){

    const comando = `select id_pedido_item  as id,
                            id_pedido,
                            id_produto,
                            qtd_itens       as qtd
                       from tb_pedido_item     
                      where id_pedido = ?`

    const [resp] = await conexao.query(comando, [id])

    return resp
}















/// Alterando

export async function alterarStatus(novoStatus, id){
    const comando = `update tb_pedido
                        set ds_situacao = ?
                      where id_pedido = ?`
                    
    const [resp] = await conexao.query(comando, [novoStatus, id])     
    
    return resp.affectedRows
}

export async function avaliacaoPedido (avaliacao, id) {
    const sql = `
                UPDATE bunaShiki.tb_pedido
                SET ds_avaliacao = ? 
                WHERE id_pedido = ?;
    `
    const [resp] = await conexao.query(sql, [avaliacao, id]);

    return resp.affectedRows;
}
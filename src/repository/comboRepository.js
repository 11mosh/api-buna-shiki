import conexao from './connection.js'





export async function criarCombo(combo) {
    const sql = `insert into tb_combo(id_admin, nm_combo, vl_preco)
                               values(?, ?, ?)`;
 
    const [resp] = await conexao.query(sql, [combo.id_admin, combo.nome, combo.preco]);

    combo.id = resp.insertId

    return combo
} 

export async function adicionarItemCombo(item) {
    const sql = `insert into tb_combo_item(id_combo, id_produto)
                                    values(?, ?)`;

    const [resp] = await conexao.query(sql, [item.id_combo, item.id_produto])

    item.id = resp.insertId

    return item
}

// Buscando 


export async function buscarCombos() {
    const comando = `select id_combo 	as id,
                            id_admin,
                            nm_combo	as nome,
                            vl_preco	as preco
                       from tb_combo`

    const [resp] = await conexao.query(comando, [])
    
    return resp
}

export async function buscarComboPorNome(nome){
    const sql = `select id_combo 	as id,
                        id_admin,
                        nm_combo	as nome,
                        vl_preco	as preco
                   from tb_combo
                  where nm_combo like ?`

    const [resp] = await conexao.query(sql, [`%${nome}%`])
    
    return resp[0]
}

export async function buscarComboPorIdCombo(id) {
    const sql = `select id_combo 	as id,
                        id_admin,
                        nm_combo	as nome,
                        vl_preco	as preco
                   from tb_combo
                  where id_combo = ?`

    const [resp] = await conexao.query(sql, [id])

    return resp[0];
}

export async function buscarCombosPorIdAdm(id) {
    const comando = `select id_combo 	as id,
                            id_admin,
                            nm_combo	as nome,
                            vl_preco	as preco
                       from tb_combo
                      where id_admin = ?`

    const [resp] = await conexao.query(comando, [id])

    return resp
}

export async function buscarItensComboPorIdCombo(id){
    const comando = `select id_combo_item  as id,
                            id_combo,
                            id_produto
                       from tb_combo_item
                      where id_combo = ?`

    const [resp] = await conexao.query(comando, [id])

    return resp;
}

export async function ordenarCombosPorPrecoMaiorAoMenor() {
    const comando = ` select id_combo 	as id,
                             id_admin,
                             nm_combo	as nome,
                             vl_preco	as preco
                        from tb_combo
                    order by vl_preco desc`

    const [resp] = await conexao.query(comando, [])

    return resp
}

export async function ordenarCombosPorPrecoMenorAoMaior() {
    const comando = `select id_combo 	as id,
                            id_admin,
                            nm_combo	as nome,
                            vl_preco	as preco
                        from tb_combo
                        order by vl_preco asc`

    const [resp] = await conexao.query(comando, [])

    return resp
}

export async function buscarIdsComboPorIdProduto(id) {
    const comando = `select  id_combo   
                        from tb_combo_item
                        where id_produto = ?`

    const [resp] = await conexao.query(comando, [id])

    return resp
}

export async function buscarCombosPorIdOuNome(valor) {
    const comando = `select id_combo 	as id,
                            id_admin,
                            nm_combo	as nome,
                            vl_preco	as preco
                       from tb_combo
                      where nm_combo like ?
                         or id_combo = ?`

    const [resp] = await conexao.query(comando, [`%${valor}%`, valor])

    return resp
}



// Deletando 

export async function deletarComboPorIdCombo(id){
    const comando = `delete
                       from tb_combo
                      where id_combo = ?`
    
    const [resp] = await conexao.query(comando, [id])
    
    return resp.affectedRows
}

export async function deletarItensComboPorIdCombo(id){
    const comando = `delete
                       from tb_combo_item
                      where id_combo = ?`
        
    const [resp] = await conexao.query(comando, [id])
    
    return resp.affectedRows
}







// Alterando

export async function alterarCombo(id, combo) {
    const comando = `update tb_combo
                        set id_admin = ?,
                            nm_combo = ?,
                            vl_preco = ?
                      where id_combo = ?;`
                    
    const [resp] = await conexao.query(comando, [combo.id_admin, combo.nome, combo.preco, id])
    
    return resp.affectedRows
}

export async function alterarItemCombo(id, item) {
    const comando = `update tb_combo_item
                        set id_produto    = ?,
                            id_combo      = ?
                      where id_combo_item = ?;`

    const [resp] = await conexao.query(comando, [item.id_produto, item.id_combo, id]) 
    
    return resp.affectedRows;
}
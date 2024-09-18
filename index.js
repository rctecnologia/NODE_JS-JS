const { select, input, checkbox } = require('@inquirer/prompts')

let mensagem = ":: Bem Vindo ao Sistema de Metas ::"

// meta modelo
let meta = {
    value: "Ligar para a Claro",
    checked: false
}

let metas = [ meta ]

const cadastrarMeta = async () => {
    const meta = await input({ message: "Digite a meta:"})

    if(meta.length == 0) {
        mensagem = "A meta não pode ser vazia"
        return
    }

    metas.push(
        { value: meta, checked: false }
    )

    mensagem = "Meta cadastrada com sucesso!"
}

    

const listarMetas = async () => {
    const respostas = await checkbox ({
        message: "Use as setas para navegar entre as metas. Espço para marcar/desmarcar, e o Enter para finalizar.",
        choices: [...metas],
        instructions: false
    })

    metas.forEach((m) => {
        m.checked = false
    })

    if(respostas.length == 0){
        mensagem = "Nenhuma meta selecionada"
        return
    }
   

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true
    })

    mensagem = "Meta(s) Marcada(s) como Conclusida(s)"
    
}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if(realizadas.length == 0){
        mensagem = "Não existem metas realizadas!"
        return    
    }

    await select({
        message: "Metas Realizadas - " + realizadas.length,
        choices: [...realizadas]

    })
}

const metasAbertas = async () => {
    const abertas = metas.filter((meta) => {
        return meta.checked != true
    })

    if(abertas.length == 0){
        mensagem = "Não existem metas abertas!"
    }

    await select({
        message: "Metas Abertas - " + abertas.length,
        choices: [...abertas]        
    })
} 

const deletarMetas = async () => {
    const metasDesmarcadas = metas.map((meta) => {
        return { value: meta.value, checked: false}
    })

    const itensADeletar = await checkbox({
        message: "Selecione uma meta para deletar",
        choices: [...metasDesmarcadas],
        instructions: false
    })

    if(itensADeletar == 0){
        mensagem = "Nenhuma meta para deletar"
        return
    }

    itensADeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item
        })
    })

    mensagem = "Meta(s) Deletada(s) com sucesso!"
}

const mostrarMensagem = () => {
    console.clear();
    if(mensagem != ""){
        console.log(mensagem)
        console.log("")
        mensagem = ""
    }
}

const start = async () => {

    while(true){
        mostrarMensagem()
        
        const opcao = await select ({
            message: "Menu >",
            choices: [
                {
                    name: "Cadastrar Meta",
                    value: "cadastrar"
                },
                {
                    name: "Listar Metas",
                    value: "listar"
                },
                {
                    name: "Metas Realizadas",
                    value: "realizadas"
                },
                {
                    name: "Metas Abertas",
                    value: "abertas"
                },
                {
                    name: "Deletar Metas",
                    value: "deletar"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
        })
        switch(opcao) {
            case "cadastrar":
                await cadastrarMeta()
                break

            case "listar":
                await listarMetas()
                break

            case "realizadas":
                await metasRealizadas()
                break

            case "abertas":
                await metasAbertas()
                break

            case "deletar":
                await deletarMetas()
                break

            case "sair":
                console.log("Até Logo!")
                return
        }
    }

}

start()
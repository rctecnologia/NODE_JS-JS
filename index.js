const { select } = require('@inquirer/prompts')

const start = async () => {

    while(true){
        const opcao = await select ({
            message: "Menu >",
            choices: [
                {
                    name: "Cadastrar Meta",
                    value: "cadastrar"
                },
                {
                    name: "Listar Metas",
                    value: "listas"
                }
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
        })
        switch(opcao) {
            case "cadastrar":
                console.log(opcao)
                break
            case "listar":
                console.log("listar")
                break
            case "sair":
                return
        }
    }

}

start()
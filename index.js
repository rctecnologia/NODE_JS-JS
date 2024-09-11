const start = () => {

    while(true){
        let opcao = "cadastrar"
        switch(opcao) {
            case "cadastrar":
                console.log("cadastrar")
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
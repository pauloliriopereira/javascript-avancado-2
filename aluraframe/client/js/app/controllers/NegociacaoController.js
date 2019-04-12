class NegociacaoController {

    constructor() {
        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");
        this._ordemAtual = '';

        this._listaNegociacoes = new Bind(new ListaNegociacoes(),
                                          new NegociacoesView($("#negociacoesView")), "adiciona", "esvazia", "ordena", "inverteOrdem");
        
        this._mensagem = new Bind(new Mensagem(), new MensagemView($("#mensagemView")), "texto");
    }

    adiciona(event) {
        event.preventDefault();
        
        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._mensagem.texto = "Negociação adicionada com sucesso";
        this._limpaFormulario();
    }

    importaNegociacoes() {
        let service = new NegociacaoService();

        Promise.all([service.obterNegociacoesDaSemana(),
                     service.obterNegociacoesDaSemanaAnterior(),
                     service.obterNegociacoesDaSemanaRetrasada()]
        ).then(negociacoes => {
            negociacoes.reduce((arrayAchatado, array) => arrayAchatado.concat(array), [])
                       .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
        })
        .catch(erro => this._mensagem.texto = erro);
    }

    apaga() {
        this._listaNegociacoes.esvazia();
        this._mensagem.texto = "Negociações apagadas com sucesso";
    }

    ordena(coluna) {
        if (this._ordemAtual == coluna) {
            this._listaNegociacoes.inverteOrdem(); 
        } else {
            this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
        }
        this._ordemAtual = coluna;
    }
    _criaNegociacao() {
        return new Negociacao(DateHelper.textoParaData(this._inputData.val()),
                                                       this._inputQuantidade.val(),
                                                       this._inputValor.val());
    }

    _limpaFormulario() {
        this._inputData.val("");
        this._inputQuantidade.val(1);
        this._inputValor.val(0.0);
        this._inputData.focus();
    }
}

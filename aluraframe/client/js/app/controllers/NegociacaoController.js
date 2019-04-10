class NegociacaoController {

    constructor() {
        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");
    }

    adiciona(event) {
        event.preventDefault();

        let negociacao = new Negociacao(DateHelper.textoParaData(this._inputData.val()),
                                        this._inputQuantidade.val(),
                                        this._inputValor.val());
        console.log(negociacao);
        console.log(DateHelper.dataParaTexto(negociacao.data));
    }
}
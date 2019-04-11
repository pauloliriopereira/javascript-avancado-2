class View {

    constructor(elemento) {
        this._elemento = elemento;
    }

    template(model) {
        throw new Error('O método template deve ser implementado');
    }

    update(model) {
        this._elemento.html(this.template(model));
    }
}
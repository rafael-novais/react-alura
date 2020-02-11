import React, { Component } from "react";
import FormularioAutor from "./FormularioAutor.js";
import TabelaAutores from "./TabelaAutores.js";

export default class AutorBox extends Component {

    constructor(){
        super();
        this.state = {lista : []};
        this.listar = this.listar.bind(this);
    }

    componentWillMount(){

        fetch('http://localhost:8082/autores')
            .then(function(response) {
                return response.json()
            })
            .then(data => {
                this.setState({lista : data});
            })
            .catch(err => {
                console.log(err);
            })
    }

    listar(novaLista){
        this.setState({lista: novaLista});
    }

    render(){
        return (
            <div>
                <FormularioAutor callBackListagem={this.listar}></FormularioAutor>
                <TabelaAutores lista={this.state.lista}></TabelaAutores>
            </div>
        );
    }
}
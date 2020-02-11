import React, { Component } from "react";
import InputCustomizado from './InputCustomizado.js';

export default class FormularioAutor extends Component {

    constructor(){
        super();
        this.state = {nome: "", email: "", senha: ""};
        this.setNome = this.setNome.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setSenha = this.setSenha.bind(this);
    }

    enviarForm(event){

        event.preventDefault();

        let data = {
            "nome": this.state.nome, 
            "email": this.state.email,
            "senha": this.state.senha
        };

        fetch("http://localhost:8082/autores", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
          }).then(response => {
            console.log(response.json());
            this.nome = "";
            this.email = "";
            this.senha = "";
            fetch("http://localhost:8082/autores")
                .then(response => {
                    return response.json();
                })
                .then(autores => {
                    this.props.callBackListagem(autores);
                })
                .catch(err => {
                    console.log(err);
                })
          });

    }

    setNome(evento){
        this.setState({nome:evento.target.value});
    }

    setEmail(evento){
        this.setState({email:evento.target.value});
    }

    setSenha(evento){
        this.setState({senha:evento.target.value});
    }

    render(){
        return (
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviarForm.bind(this)} method="post">
                    <InputCustomizado id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome} label="Nome"></InputCustomizado>
                    <InputCustomizado id="email" type="email" name="email" value={this.state.email} onChange={this.setEmail} label="Email"></InputCustomizado>
                    <InputCustomizado id="senha" type="password" name="senha" value={this.state.senha} onChange={this.setSenha} label="Senha"></InputCustomizado>
                
                    <div className="pure-control-group">                                  
                        <label></label> 
                        <button type="submit" className="pure-button pure-button-primary">Gravar</button>                                    
                    </div>
                 </form>            
            </div>  
        );
    }

}
import React, { Component } from "react";
import PubSub from 'pubsub-js';

export default class TratadorErros extends Component {

    verificaCampos(objeto){

        let executarRequisicao = true;

        if(objeto.nome == "") {
            PubSub.publish("erro-validacao", {campo: "nome", erro: "Nome não pode estar vazio"});
            executarRequisicao = false;
        }else{
            PubSub.publish("teste", {campo: "nome"});
        }
        if(objeto.email == "") {
            PubSub.publish("erro-validacao", {campo: "email", erro: "Email não pode estar vazio"});
            executarRequisicao = false;
        }else{
            PubSub.publish("teste", {campo: "email"});
        }
        if(objeto.senha == "") {
            PubSub.publish("erro-validacao", {campo: "senha", erro: "Senha não pode estar vazio"});
            executarRequisicao = false;
        }else{
            PubSub.publish("teste", {campo: "senha"});
        }
            
        return executarRequisicao;
        
    }

    render(){
        return null;
    }
}
import React, { Component } from 'react';
import logo from './logo.svg';
import './css/pure-min.css';
import './css/side-menu.css';

class App extends Component {

    constructor(){
        super();
        this.state = {lista : [], nome: "", email: "", senha: ""};
        this.setNome = this.setNome.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setSenha = this.setSenha.bind(this);
    }

    componentWillMount(){

        fetch('http://localhost:8082/autores')
            .then(function(response) {
                return response.json()
            })
            .then(data => {
                console.log(data);
                this.setState({lista : data});
            })
            .catch(err => {
                console.log(err);
            })
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
            this.componentWillMount();
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
            <div id="layout">
    
            <a href="#menu" id="menuLink" className="menu-link">
                <span></span>
            </a>
        
            <div id="menu">
                <div className="pure-menu">
                    <a className="pure-menu-heading" href="#">Livraria</a>
        
                    <ul className="pure-menu-list">
                        <li className="pure-menu-item"><a href="#" className="pure-menu-link">Home</a></li>
                        <li className="pure-menu-item"><a href="#" className="pure-menu-link">Livros</a></li>
                        <li className="pure-menu-item"><a href="#" className="pure-menu-link">Autores</a></li>
                    </ul>
                </div>
            </div>
        
            <div id="main">
                <div className="header">
                  <h1>Cadastro de Autores</h1>
                </div>
                <div className="content" id="content">
                  <div className="pure-form pure-form-aligned">
                    <form className="pure-form pure-form-aligned" onSubmit={this.enviarForm.bind(this)} method="post">
                      <div className="pure-control-group">
                        <label htmlFor="nome">Nome</label> 
                        <input id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome} />                  
                      </div>
                      <div className="pure-control-group">
                        <label htmlFor="email">Email</label> 
                        <input id="email" type="email" name="email" value={this.state.email} onChange={this.setEmail}/>                  
                      </div>
                      <div className="pure-control-group">
                        <label htmlFor="senha">Senha</label> 
                        <input id="senha" type="password" name="senha" value={this.state.senha} onChange={this.setSenha}/>                                      
                      </div>
                      <div className="pure-control-group">                                  
                        <label></label> 
                        <button type="submit" className="pure-button pure-button-primary">Gravar</button>                                    
                      </div>
                    </form>             
    
                  </div>  
                  <div>            
                    <table className="pure-table">
                      <thead>
                        <tr>
                          <th>Nome</th>
                          <th>email</th>
                        </tr>
                      </thead>
                      <tbody>
                          {
                              this.state.lista.map(autor => {
                                  return (
                                  <tr key={ autor.id }>
                                     <td>{ autor.nome }</td> 
                                     <td>{ autor.email }</td> 
                                  </tr>
                                  );
                              })
                          }     
                      </tbody>
                    </table> 
                  </div>             
                </div>
              </div>       
        </div>
        );
    }
}

export default App;
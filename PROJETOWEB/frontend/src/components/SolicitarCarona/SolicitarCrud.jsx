import React, { Component } from 'react'
import axios from 'axios'
import Main from '../templates/Main'

const headerProps = {
    title: 'Solicitar Carona',
    subtitle: 'CADASTRAR, ACOMPANHAR, ALTERAR E EXCLUIR SUAS SOLICITAÇÕES DE CARONA.'
}

const baseUrl = "http://localhost:3001/requests"
const initialState = {
    solicitation: { name: '', exit: '', destiny: '', date:''},
    list: []
}

export default class ofertarCrud extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({list: resp.data});
        })
    }
     clear() {
         this.setState({ solicitation: initialState.solicitation });
     }

     save() {
         const solicitation = this.state.solicitation;
         const method = solicitation.id ? 'put' : 'post';
         const url = solicitation.id ? `${baseUrl}/${solicitation.id}` : baseUrl;
         axios[method](url, solicitation).then(resp => {
                const list = this.getUpdateList(resp.data);
                this.setState({ solicitation: initialState.solicitation, list});
            })
     }

     getUpdateList(solicitation, add = true) {
         const list = this.state.list.filter(o => o.id !== solicitation.id)
         if(add) list.unshift(solicitation)
         return list
     }

     updateField(event) {
         const solicitation = { ...this.state.solicitation }
         solicitation[event.target.name] = event.target.value
         this.setState({ solicitation })
     }

     renderForm() {
         return (
             <div className="form">
                <div className="row">
                    <div className="col-12 col-md-3">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control" required="required" 
                                name="name"
                                value={this.state.solicitation.name}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o seu nome" />
                        </div>
                    </div>

                    <div className="col-12 col-md-3">
                        <div className="form-group">
                            <label>Saída</label>
                            <input type="text" className="form-control" required="required" 
                                name="exit"
                                value={this.state.solicitation.exit}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o seu local de saída" />
                        </div>
                    </div>

                    <div className="col-12 col-md-3">
                        <div className="form-group">
                            <label>Destino</label>
                            <input type="text" className="form-control" required="required" 
                                name="destiny"
                                value={this.state.solicitation.destiny}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o seu destino" />
                        </div>
                    </div> 

                    <div className="col-12 col-md-3">
                        <div className="form-group">
                            <label>Data</label>
                            <input type="date" className="form-control" required="required" 
                                name="date"
                                value={this.state.solicitation.date}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite a data" />
                        </div>
                    </div> 
                </div>

                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
             </div>
         )
     }

     load(solicitation) {
         this.setState({ solicitation })
     }

     remove(solicitation) {
         axios.delete(`${baseUrl}/${solicitation.id}`).then(resp => {
             const list = this.getUpdateList(solicitation, false)
             this.setState({ list })
         })
     }

     renderTable() {
         return (
             <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Saída</th>
                        <th>Destino</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
             </table>
         )
     }

     renderRows() {
         return this.state.list.map(solicitation => {
             return (
                 <tr key={solicitation.id}>
                    <td>{solicitation.name}</td>
                    <td>{solicitation.exit}</td>
                    <td>{solicitation.destiny}</td>
                    <td>{solicitation.date}</td>
                    <td>
                        <button className="btn btn-warning"
                        onClick={() => this.load(solicitation)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                        onClick={() => this.remove(solicitation)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                    
                 </tr>
             )
         })
     }

    render() {
       return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}
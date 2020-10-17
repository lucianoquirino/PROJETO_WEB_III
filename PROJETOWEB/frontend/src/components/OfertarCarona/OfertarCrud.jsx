import React, { Component } from 'react'
import axios from 'axios'
import Main from '../templates/Main'

const headerProps = {
    title: 'Ofertar Carona',
    subtitle: 'CADASTRAR, ACOMPANHAR, ALTERAR E EXCLUIR SUAS OFERTAS DE CARONA.'
}

const baseUrl = "http://localhost:3001/offers"
const initialState = {
    offer: { name: '', exit: '', destiny: '', date:''},
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
         this.setState({ offer: initialState.offer });
     }

     save() {
         const offer = this.state.offer;
         const method = offer.id ? 'put' : 'post';
         const url = offer.id ? `${baseUrl}/${offer.id}` : baseUrl;
         axios[method](url, offer).then(resp => {
                const list = this.getUpdateList(resp.data);
                this.setState({ offer: initialState.offer, list});
            })
     }

     getUpdateList(offer, add = true) {
         const list = this.state.list.filter(o => o.id !== offer.id)
         if(add) list.unshift(offer)
         return list
     }

     updateField(event) {
         const offer = { ...this.state.offer }
         offer[event.target.name] = event.target.value
         this.setState({ offer })
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
                                value={this.state.offer.name}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o seu nome" />
                        </div>
                    </div>

                    <div className="col-12 col-md-3">
                        <div className="form-group">
                            <label>Saída</label>
                            <input type="text" className="form-control" required="required" 
                                name="exit"
                                value={this.state.offer.exit}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o seu local de saída" />
                        </div>
                    </div>

                    <div className="col-12 col-md-3">
                        <div className="form-group">
                            <label>Destino</label>
                            <input type="text" className="form-control" required="required" 
                                name="destiny"
                                value={this.state.offer.destiny}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o seu destino" />
                        </div>
                    </div> 

                    <div className="col-12 col-md-3">
                        <div className="form-group">
                            <label>Data</label>
                            <input type="date" className="form-control" required="required" 
                                name="date"
                                value={this.state.offer.date}
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

     load(offer) {
         this.setState({ offer })
     }

     remove(offer) {
         axios.delete(`${baseUrl}/${offer.id}`).then(resp => {
             const list = this.getUpdateList(offer, false)
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
         return this.state.list.map(offer => {
             return (
                 <tr key={offer.id}>
                    <td>{offer.name}</td>
                    <td>{offer.exit}</td>
                    <td>{offer.destiny}</td>
                    <td>{offer.date}</td>
                    <td>
                        <button className="btn btn-warning"
                        onClick={() => this.load(offer)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                        onClick={() => this.remove(offer)}>
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
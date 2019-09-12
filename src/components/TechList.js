import React, { Component } from 'react';
import TechItem from './TechItem';

class TechList extends Component {

    state = {
        newTech: '',
        techs: []
    };

    // executado assim que o componente aparece em tela
    componentDidMount() {
        const techs = localStorage.getItem('techs');

        if (techs) {
            this.setState({ techs: JSON.parse(techs) })
        }
    }

    // executado sempre que houver alterações nas props ou estados
    componentDidUpdate(prevProps, prevState) {
        // acessando as props this.props, acessando estado this.state
        if (prevState.techs !== this.state.techs) {
            localStorage.setItem('techs', JSON.stringify(this.state.techs))
        }
    }

    handleInputChange = e => {
        this.setState({ newTech: e.target.value });
    }

    handleSubmit = e => {
        e.preventDefault();

        this.setState({
            techs: [... this.state.techs, this.state.newTech],
            newTech: ''
        })
    }

    handleDelete = (tech) => {
        this.setState({ techs: this.state.techs.filter(t => t !== tech) })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <ul>
                    {this.state.techs.map(tech => (
                        <TechItem key={tech} tech={tech} onDelete={() => this.handleDelete(tech)} />
                    ))}
                </ul>
                <input type="text" onChange={this.handleInputChange} value={this.state.newTech} />
                <button type="submit">Enviar</button>
            </form>
        )
    }
}

export default TechList;
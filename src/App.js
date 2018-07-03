import React, { Component } from 'react';
import '../node_modules/spectre.css/dist/spectre.min.css';
import './App.css';
import FormContainer from './containers/FormContainer';
import ResultContainer from './containers/ResultContainer';


class App extends Component {

    constructor(){
        super();
        this.state = {result: "result from child"};
        this.setResult = this.setResult.bind(this);
    }
    setResult(dataFromChild) {
        this.setState({ result: dataFromChild });
        console.log("set result in setResult "+dataFromChild);

    }

    render() {
        return (
            <div className="container">
                <div className="rows">
                    <div className="col-6 centered">
                        <h3 className="text-center">Extract Metadata Service</h3>
                        <FormContainer setResult={this.setResult}/>
                    </div>
                </div>
                <div className="rows">
                    <div className="col-6 centered">
                        <h3 className="text-center">Metadata</h3>
                        <ResultContainer result={this.state.result}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
import React, {Component} from 'react';
import CheckboxOrRadioGroup from '../components/CheckboxOrRadioGroup';
import SingleInput from '../components/SingleInput';
import Select from '../components/Select';
import axios from 'axios'

class FormContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bucketName: '',
            keyName: '',
            petSelections: [],
            selectedPets: [],
            proberOptions: [],
            proberSelection: '',
            outputOptions: [],
            outputSelection: [],
            currentPetCount: 0,
            description: ''
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
        this.handleBucketNameChange = this.handleBucketNameChange.bind(this);
        this.handleKeyNameChange = this.handleKeyNameChange.bind(this);
        this.handleCurrentPetCountChange = this.handleCurrentPetCountChange.bind(this);
        this.handleProberSelect = this.handleProberSelect.bind(this);
        this.handlePetSelection = this.handlePetSelection.bind(this);
        this.handleOutputSelection = this.handleOutputSelection.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    }
    componentDidMount() {
        fetch('./fake_db.json')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    bucketName: data.bucketName,
                    keyName: data.keyName,
                    petSelections: data.petSelections,
                    selectedPets: data.selectedPets,
                    proberOptions: data.proberOptions,
                    proberSelection: data.proberSelection,
                    outputOptions: data.outputOptions,
                    outputSelection: data.outputSelection,
                    currentPetCount: data.currentPetCount,
                    description: data.description
                });
            });
    }
    handleBucketNameChange(e) {
        this.setState({ bucketName: e.target.value });
    }
    handleKeyNameChange(e) {
        this.setState({ keyName: e.target.value });
    }
    handleCurrentPetCountChange(e) {
        this.setState({ currentPetCount: e.target.value });
    }
    handleProberSelect(e) {
        this.setState({ proberSelection: e.target.value });
    }
    handlePetSelection(e) {
        const newSelection = e.target.value;
        let newSelectionArray;
        if(this.state.selectedPets.indexOf(newSelection) > -1) {
            newSelectionArray = this.state.selectedPets.filter(s => s !== newSelection)
        } else {
            newSelectionArray = [...this.state.selectedPets, newSelection];
        }
        this.setState({ selectedPets: newSelectionArray }, () => console.log('pet selection', this.state.selectedPets));
    }
    handleOutputSelection(e) {
        this.setState({ outputSelection: [e.target.value] }, () => console.log('output', this.state.outputSelection));
    }
    handleDescriptionChange(e) {
        // const textArray = e.target.value.split('').filter(x => x !== 'e');
        // console.log('string split into array of letters',textArray);
        // const filteredText = textArray.join('');
        // this.setState({ description: filteredText }, () => console.log('description', this.state.description));
        this.setState({ description: e.target.value }, () => console.log('description', this.state.description));
    }
    handleClearForm(e) {
        e.preventDefault();
        this.setState({
            bucketName: '',
            keyName: '',
            selectedPets: [],
            proberSelection: '',
            outputSelection: [],
            currentPetCount: 0,
            description: ''
        });
    }
    handleFormSubmit(e) {
        e.preventDefault();

        const formPayload = {
            bucket: this.state.bucketName,
            key: this.state.keyName,
            format: this.state.outputSelection,
            crossDomain: true
        };
        var url="";

        if (this.state.proberSelection === "mediainfo"){
            url = process.env.REACT_APP_MEDIAINFO_LAMBDA;
        }else{
            url = process.env.REACT_APP_TIKA_LAMBDA;
        }

        console.log('Send this in a POST request:', formPayload);

        axios.get(url, formPayload)
            .then(response =>
            {
                console.log(response);
                if (this.state.proberSelection === "mediainfo"){
                    this.props.setResult(response.data);
                }else {
                    this.props.setResult(response.body.message);
                }

                console.log("set result in handleFormSubmit");
            });


        //this.handleClearForm(e);
    }
    render() {
        return (
            <form className="container" onSubmit={this.handleFormSubmit}>
                <SingleInput
                    inputType={'text'}
                    title={'Bucket Name'}
                    name={'name'}
                    controlFunc={this.handleBucketNameChange}
                    content={this.state.bucketName}
                    placeholder={'Type Bucket name here'} />
                <SingleInput
                    inputType={'text'}
                    title={'Key'}
                    name={'key'}
                    controlFunc={this.handleKeyNameChange}
                    content={this.state.keyName}
                    placeholder={'Type key here'} />
                <h6>Prober selection</h6>
                <Select
                    name={'Prober'}
                    placeholder={'Choose Prober'}
                    controlFunc={this.handleProberSelect}
                    options={this.state.proberOptions}
                    selectedOption={this.state.proberSelection} />
                <CheckboxOrRadioGroup
                    title={'Metadata extract output format'}
                    setName={'output'}
                    controlFunc={this.handleOutputSelection}
                    type={'radio'}
                    options={this.state.outputOptions}
                    selectedOptions={this.state.outputSelection} />
                <input
                    type="submit"
                    className="btn btn-primary float-right"
                    disabled={!this.state.bucketName || !this.state.keyName || !this.state.proberSelection}
                    value="Extract Metadata"/>
                <button
                    className="btn btn-link float-left"
                    onClick={this.handleClearForm}>Clear form</button>
            </form>
        );
    }
}
export default FormContainer;